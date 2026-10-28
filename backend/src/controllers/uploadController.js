const { supabase, bucketName } = require('../config/supabase');
const path = require('path');

/**
 * Upload an image to Supabase Storage Bucket
 * POST /api/upload
 */
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded.' });
    }

    if (!supabase) {
      return res.status(503).json({
        success: false,
        message: 'Supabase storage is not configured yet. Please configure backend/.env.',
      });
    }

    const file = req.file;
    const fileExt = path.extname(file.originalname).toLowerCase() || '.jpg';
    const cleanBase = path.basename(file.originalname, fileExt).replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `events/${Date.now()}_${cleanBase}${fileExt}`;

    // Upload buffer to Supabase bucket
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      console.error('[Upload Error]', error);
      return res.status(500).json({ success: false, message: error.message });
    }

    // Retrieve public CDN URL
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    return res.status(200).json({
      success: true,
      message: 'Photo uploaded successfully.',
      path: data.path,
      url: publicUrlData.publicUrl,
    });
  } catch (err) {
    console.error('[Upload Exception]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  uploadImage,
};
