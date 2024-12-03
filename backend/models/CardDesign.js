const mongoose = require('mongoose');

const CardDesignSchema = new mongoose.Schema({
  designName: { type: String, required: true },      // eg: Floral 002
  category: { type: String, required: true },        // eg: Floral design
  image: { type: String, required: true },           // Image file path or URL
  imagebg: { type: String, required: true },           // Image file path or URL
  imagepreview: { type: String, required: true },           // Image file path or URL
  particleColor: { type: String, required: true },           // Image file path or URL
  fontColor: { type: String, required: true },           // Image file path or URL
  animatedKiriAtas: { type: String},           // Animated image
  animatedKiriTengah: { type: String},           // Animated image
  animatedKiriBawah: { type: String},           // Animated image
  animatedKananAtas: { type: String},           // Animated image
  animatedKananTengah: { type: String},           // Animated image
  animatedKananBawah: { type: String},           // Animated image
  
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('cardDesign', CardDesignSchema);
