// routes/songRoutes.js
const express = require("express");
const router = express.Router();
const {
  upload,
  uploadSong,
  getAllSongs,
  deleteSong,
} = require("../controllers/songController");

// POST endpoint to upload a song
router.post("/upload", upload.single("file"), uploadSong);
router.get("/", getAllSongs); // Get all songs

// DELETE endpoint to delete a song by ID
router.delete("/:id", deleteSong);

module.exports = router;
