const mongoose = require('mongoose');

const CardDesignSchema = new mongoose.Schema({
  designName: { type: String, required: true },      // eg: Floral 002
  category: { type: String, required: true },        // eg: Floral design
  image: { type: String, required: true },           // Image file path or URL
  description: { type: String },                     // Optional description of the design
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('cardDesign', CardDesignSchema);
