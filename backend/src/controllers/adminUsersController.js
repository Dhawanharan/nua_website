const bcrypt = require('bcryptjs');
const { supabase } = require('../config/supabase');

/**
 * GET /api/admins
 * List all admins (Super Admin only)
 */
const getAdmins = async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({ success: false, message: 'Database not configured.' });
    }

    const { data: admins, error } = await supabase
      .from('admin_users')
      .select('id, name, email, privilege, committee_role, phone, avatar_url, is_active, last_login, created_at')
      .order('id', { ascending: true });

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({ success: true, count: admins.length, data: admins });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/admins
 * Create a new admin or super admin (Super Admin only)
 */
const createAdmin = async (req, res) => {
  try {
    const { name, email, password, privilege = 'admin', committee_role, phone, avatar_url } = req.body;

    if (!name || !email || !password || !committee_role) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, password, and committee role are required fields.',
      });
    }

    if (!['admin', 'super_admin'].includes(privilege)) {
      return res.status(400).json({
        success: false,
        message: 'Privilege must be either "admin" or "super_admin".',
      });
    }

    if (!supabase) {
      return res.status(503).json({ success: false, message: 'Database not configured.' });
    }

    // Check if email already registered
    const { data: existing } = await supabase
      .from('admin_users')
      .select('id')
      .ilike('email', email.trim())
      .maybeSingle();

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An administrator with this email already exists.',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const { data: newAdmin, error } = await supabase
      .from('admin_users')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password_hash,
          privilege,
          committee_role: committee_role.trim(),
          phone: phone || null,
          avatar_url: avatar_url || null,
          is_active: true,
        },
      ])
      .select('id, name, email, privilege, committee_role, phone, avatar_url, is_active, created_at')
      .single();

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(201).json({
      success: true,
      message: `Admin ${newAdmin.name} created successfully as ${newAdmin.privilege}.`,
      data: newAdmin,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PUT /api/admins/:id
 * Update an existing admin (Super Admin only)
 */
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, privilege, committee_role, phone, avatar_url, is_active } = req.body;

    if (!supabase) {
      return res.status(503).json({ success: false, message: 'Database not configured.' });
    }

    const updates = {
      updated_at: new Date().toISOString(),
    };

    if (name !== undefined) updates.name = name.trim();
    if (email !== undefined) updates.email = email.trim().toLowerCase();
    if (committee_role !== undefined) updates.committee_role = committee_role.trim();
    if (privilege !== undefined && ['admin', 'super_admin'].includes(privilege)) {
      updates.privilege = privilege;
    }
    if (phone !== undefined) updates.phone = phone;
    if (avatar_url !== undefined) updates.avatar_url = avatar_url;
    if (is_active !== undefined) updates.is_active = Boolean(is_active);

    // If new password provided, re-hash it
    if (password && password.trim().length > 0) {
      const salt = await bcrypt.genSalt(10);
      updates.password_hash = await bcrypt.hash(password.trim(), salt);
    }

    const { data: updatedAdmin, error } = await supabase
      .from('admin_users')
      .update(updates)
      .eq('id', id)
      .select('id, name, email, privilege, committee_role, phone, avatar_url, is_active, updated_at')
      .single();

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({
      success: true,
      message: 'Admin updated successfully.',
      data: updatedAdmin,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * DELETE /api/admins/:id
 * Remove an admin (Super Admin only)
 */
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting oneself
    if (parseInt(id, 10) === parseInt(req.user.id, 10)) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own active account.',
      });
    }

    if (!supabase) {
      return res.status(503).json({ success: false, message: 'Database not configured.' });
    }

    const { error } = await supabase.from('admin_users').delete().eq('id', id);

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({
      success: true,
      message: 'Admin removed successfully.',
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
