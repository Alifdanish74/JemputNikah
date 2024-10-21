// routes/adminDesign.js
const express = require('express');
const multer = require('multer');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { upload, uploadDesign, getDesignCountByCategory, getAllDesigns, getDesignByName } = require('../controllers/designController');
const router = express.Router();

// Route to upload a new wedding design (protected by authMiddleware and adminMiddleware)
router.post(
  '/upload-design',
  // adminMiddleware,
  upload.fields([
    { name: 'image', maxCount: 1 }, // Main image
    { name: 'imagepreview', maxCount: 1 } // Secondary image
  ]),
  uploadDesign
);

// Route to get design count by category
router.get('/count/:category', getDesignCountByCategory);

router.get('/get-all-design', getAllDesigns);

router.get('/getDesignByName', authMiddleware, getDesignByName);

module.exports = router;
