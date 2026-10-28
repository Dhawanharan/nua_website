const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { supabase } = require('../config/supabase');

/**
 * Helper to find user photo from committee_members table if avatar_url is not set
 */
const findUserPhoto = async (name, committeeRole, defaultAvatar) => {
  if (defaultAvatar) return defaultAvatar;
  if (!supabase) return null;

  try {
    // Try matching committee_members by name or role
    const { data: member } = await supabase
      .from('committee_members')
      .select('image_url')
      .or(`name.ilike.%${name}%,role.ilike.%${committeeRole}%`)
      .limit(1)
      .maybeSingle();

    if (member && member.image_url) {
      return member.image_url;
    }
  } catch (err) {
    console.warn('[Photo Lookup Warning]', err.message);
  }
  return null;
};

/**
 * POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    if (!supabase) {
      return res.status(503).json({
        success: false,
        message: 'Database is not configured yet. Check backend/.env.',
      });
    }

    // Find admin user by email (case-insensitive)
    const { data: user, error } = await supabase
      .from('admin_users')
      .select('*')
      .ilike('email', email.trim())
      .maybeSingle();

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Please contact a Super Admin.',
      });
    }

    // Verify password with bcrypt
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Look for member photo in committee table if not present
    const photo = await findUserPhoto(user.name, user.committee_role, user.avatar_url);

    // Update last_login timestamp
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    // Generate JWT token
    const secret = process.env.JWT_SECRET || 'nua_super_secret_jwt_key_2026_version2';
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      privilege: user.privilege,
      committee_role: user.committee_role,
      avatar_url: photo,
    };

    const token = jwt.sign(payload, secret, { expiresIn: '7d' });

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        privilege: user.privilege,
        committee_role: user.committee_role,
        avatar_url: photo,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error('[Login Error]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/auth/me
 * Returns authenticated user profile
 */
const getMe = async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({ success: false, message: 'Database not configured.' });
    }

    const { data: user, error } = await supabase
      .from('admin_users')
      .select('id, name, email, privilege, committee_role, phone, avatar_url, is_active, last_login, created_at')
      .eq('id', req.user.id)
      .maybeSingle();

    if (error || !user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const photo = await findUserPhoto(user.name, user.committee_role, user.avatar_url);
    user.avatar_url = photo;

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  login,
  getMe,
};
