const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { uploadImage } = require('../controllers/uploadController');

// POST /api/upload - single photo upload
router.post('/', upload.single('photo'), uploadImage);

module.exports = router;
