const { supabase } = require('../config/supabase');

/**
 * GET /api/committee
 * Fetch all committee members (optional filter: ?category=exco or ?category=rep)
 */
const getCommittee = async (req, res) => {
  try {
    const { category } = req.query;

    if (!supabase) {
      return res.status(200).json({ success: true, count: 0, data: [] });
    }

    let query = supabase
      .from('committee_members')
      .select('*')
      .order('display_order', { ascending: true })
      .order('id', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({ success: true, count: data.length, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/committee
 * Add a new committee member or area rep (Admin / Super Admin)
 */
const createMember = async (req, res) => {
  try {
    const { name, role, category = 'exco', area, university, image_url, display_order = 0 } = req.body;

    if (!name || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name and role are required.',
      });
    }

    if (!supabase) {
      return res.status(503).json({ success: false, message: 'Database not configured.' });
    }

    const { data, error } = await supabase
      .from('committee_members')
      .insert([
        {
          name: name.trim(),
          role: role.trim(),
          category,
          area: area || null,
          university: university || null,
          image_url: image_url || null,
          display_order: parseInt(display_order, 10) || 0,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(201).json({
      success: true,
      message: 'Member added successfully.',
      data,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PUT /api/committee/:id
 * Update a committee member or area rep (Admin / Super Admin)
 */
const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!supabase) {
      return res.status(503).json({ success: false, message: 'Database not configured.' });
    }

    const { data, error } = await supabase
      .from('committee_members')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({
      success: true,
      message: 'Member updated successfully.',
      data,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * DELETE /api/committee/:id
 * Remove a committee member or area rep (Admin / Super Admin)
 */
const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    if (!supabase) {
      return res.status(503).json({ success: false, message: 'Database not configured.' });
    }

    const { error } = await supabase.from('committee_members').delete().eq('id', id);

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({
      success: true,
      message: 'Member removed successfully.',
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getCommittee,
  createMember,
  updateMember,
  deleteMember,
};
