// routes/adminDesign.js
const express = require('express');
const multer = require('multer');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { upload, uploadDesign, getDesignCountByCategory, getAllDesigns, getDesignByName, deleteDesign } = require('../controllers/designController');
const router = express.Router();

// Route to upload a new wedding design (protected by authMiddleware and adminMiddleware)
router.post(
  '/upload-design',
  // adminMiddleware,
  upload.fields([
    { name: 'image', maxCount: 1 }, // Main image
    { name: 'imagepreview', maxCount: 1 }, // Secondary image
    { name: 'imagebg', maxCount: 1 }, // third image
    { name: "animatedKiriAtas", maxCount: 1 },
    { name: "animatedKiriTengah", maxCount: 1 },
    { name: "animatedKiriBawah", maxCount: 1 },
    { name: "animatedKananAtas", maxCount: 1 },
    { name: "animatedKananTengah", maxCount: 1 },
    { name: "animatedKananBawah", maxCount: 1 },
  ]),
  uploadDesign
);

// Route to get design count by category
router.get('/count/:category', getDesignCountByCategory);

router.get('/get-all-design', getAllDesigns);

router.get('/get-design-byname/:designName', getDesignByName);

router.delete('/delete-design/:designName', deleteDesign);

module.exports = router;
