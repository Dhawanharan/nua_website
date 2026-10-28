const { supabase } = require('../config/supabase');

/**
 * GET /api/events
 * Fetch all events (can filter by category query param: ?category=past or ?category=upcoming)
 */
const getEvents = async (req, res) => {
  try {
    const { category } = req.query;

    if (!supabase) {
      return res.status(200).json({
        success: true,
        message: 'Supabase credentials not configured yet. Returning empty list.',
        data: [],
      });
    }

    let query = supabase.from('events').select('*').order('id', { ascending: false });

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
 * POST /api/events
 * Create a new event
 */
const createEvent = async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({
        success: false,
        message: 'Supabase is not configured yet. Please configure backend/.env.',
      });
    }

    const { title, desc, date, location, image_url, category = 'past' } = req.body;

    if (!title || !desc || !date) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and date are required fields.',
      });
    }

    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          title,
          description: desc,
          date,
          location: location || '',
          image_url: image_url || '',
          category,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(201).json({
      success: true,
      message: 'Event created successfully.',
      data,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PUT /api/events/:id
 * Update an existing event
 */
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!supabase) {
      return res.status(503).json({ success: false, message: 'Supabase not configured.' });
    }

    const updates = req.body;
    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({
      success: true,
      message: 'Event updated successfully.',
      data,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * DELETE /api/events/:id
 * Delete an event
 */
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!supabase) {
      return res.status(503).json({ success: false, message: 'Supabase not configured.' });
    }

    const { error } = await supabase.from('events').delete().eq('id', id);

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({
      success: true,
      message: `Event #${id} deleted successfully.`,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
