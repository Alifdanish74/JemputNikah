// models/Song.js
const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  name: { type: String, required: true },            // Name of the song
  url: { type: String, required: true },             // URL of the song file on S3
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Song", SongSchema);
