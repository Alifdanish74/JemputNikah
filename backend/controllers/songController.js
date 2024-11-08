// controllers/songController.js
const Song = require("../models/Song");
const AWS = require("aws-sdk");
const multer = require("multer");

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Function to upload a song to S3
const uploadSongToS3 = async (file, filename) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `/music/${filename}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  const data = await s3.upload(params).promise();
  return data.Location; // Return the S3 URL
};

// Controller to handle song upload
const uploadSong = async (req, res) => {
  const { name } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "Song file is required" });
  }

  try {
    // Upload song file to S3
    const songUrl = await uploadSongToS3(file, `${name}.mp3`);

    // Create a new song document
    const newSong = new Song({ name, url: songUrl });
    await newSong.save();

    res.status(201).json(newSong);
  } catch (error) {
    console.error("Error uploading song:", error);
    res.status(500).json({ message: "Error uploading song", error });
  }
};

// Controller to retrieve all songs
const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
    console.error("Error retrieving songs:", error);
    res.status(500).json({ message: "Error retrieving songs", error });
  }
};

// Controller to delete a song
const deleteSong = async (req, res) => {
  const { id } = req.params;

  try {
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // Delete song file from S3
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: song.url.split(".com/")[1],
    };
    await s3.deleteObject(params).promise();

    // Delete the song document from the database
    await Song.findByIdAndDelete(id); // Replace song.remove() with findByIdAndDelete
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.error("Error deleting song:", error);
    res.status(500).json({ message: "Error deleting song", error });
  }
};

module.exports = { upload, uploadSong, deleteSong, getAllSongs };
