const { supabase } = require('../config/supabase');

/**
 * GET /api/settings
 */
const getSettings = async (req, res) => {
  try {
    if (!supabase) {
      return res.status(200).json({
        success: true,
        data: {
          email: 'nuwaraeliya.undergraduates@gmail.com',
          phone: '+94 77 123 4567',
          address: 'Nuwara Eliya, Sri Lanka',
          facebook_url: 'https://facebook.com',
          instagram_url: 'https://instagram.com',
          linkedin_url: 'https://linkedin.com',
          youtube_url: 'https://youtube.com',
        },
      });
    }

    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .maybeSingle();

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({
      success: true,
      data: data || {
        email: 'nuwaraeliya.undergraduates@gmail.com',
        phone: '+94 77 123 4567',
        address: 'Nuwara Eliya, Sri Lanka',
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PUT /api/settings
 * (Admin / Super Admin)
 */
const updateSettings = async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({ success: false, message: 'Database not configured.' });
    }

    const updates = req.body;
    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('site_settings')
      .upsert({ id: 1, ...updates })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({
      success: true,
      message: 'Site settings updated successfully.',
      data,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
