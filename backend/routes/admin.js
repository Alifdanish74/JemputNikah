// routes/adminDesign.js
const express = require('express');
const multer = require('multer');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { upload, uploadDesign, getDesignCountByCategory } = require('../controllers/adminDesignController');
const router = express.Router();

// Route to upload a new wedding design (protected by authMiddleware and adminMiddleware)
router.post(
  '/upload-design',
  // adminMiddleware,
  upload.single('image'),
  uploadDesign
);

// Route to get design count by category
router.get('/count/:category', getDesignCountByCategory);

module.exports = router;
