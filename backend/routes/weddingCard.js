// const express = require('express');
// const { createWeddingCard, getWeddingCard, updateWeddingCard, deleteWeddingCard } = require('../controllers/weddingCardController');
// const authMiddleware = require('../middleware/authMiddleware');
// const router = express.Router();

// router.post('/', authMiddleware, createWeddingCard);
// router.get('/:id', authMiddleware, getWeddingCard);
// router.put('/:id', authMiddleware, updateWeddingCard);
// router.delete('/:id', authMiddleware, deleteWeddingCard);

// module.exports = router;
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createWeddingCard,
  getWeddingCardById,
  updateWeddingCard,
  deleteWeddingCard,
  getWeddingCardInfo,
  getPresignedQRCodeUrl, // Import the new presigned URL funct
  // uploadQRCode,
} = require("../controllers/weddingCardController");
const multer = require("multer");
const router = express.Router();
const axios = require("axios");

const upload = multer({ storage: multer.memoryStorage() });

// Create a new wedding card
router.post("/", authMiddleware, createWeddingCard);

// Get a wedding card by ID
router.get("/:id", getWeddingCardById);

// Update a wedding card
router.put("/:id", updateWeddingCard);

// Delete a wedding card
router.delete("/:id", authMiddleware, deleteWeddingCard);

router.get("/info/:weddingCardId", getWeddingCardInfo);

// Get presigned URL for QR code download
router.get("/:weddingCardId/presigned-url", getPresignedQRCodeUrl);

// Endpoint to proxy image download
router.get("/download-image/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Step 1: Fetch the presigned URL from S3
    const presignedUrlResponse = await axios.get(
      `http://localhost:4000/api/wedding-cards/${id}/presigned-url`
    );
    const { url } = presignedUrlResponse.data;

    // Step 2: Fetch the image data using the presigned URL
    const imageResponse = await axios.get(url, { responseType: "stream" });

    // Step 3: Pipe the image data to the client
    res.setHeader("Content-Disposition", `attachment; filename="QR_${id}.png"`);
    imageResponse.data.pipe(res);
  } catch (error) {
    console.error("Error fetching and downloading image:", error);
    res.status(500).send("Error downloading image");
  }
});

module.exports = router;
