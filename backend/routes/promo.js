const express = require('express');
const multer = require('multer');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { upload, uploadPromo, getAllPromo, updatePromo } = require('../controllers/promoController');
const router = express.Router();

// Route to upload a new wedding design (protected by authMiddleware and adminMiddleware)
router.post(
  '/upload-promo',
  // adminMiddleware,
  upload.fields([
    { name: 'image', maxCount: 1 }, // Main image
  ]),
  uploadPromo
);

router.put(
    '/update-promo/:id',
    upload.single('image'), // Handle single file upload
    updatePromo
  );
  

router.get('/get-promo', getAllPromo);

module.exports = router;