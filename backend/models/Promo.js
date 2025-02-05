const mongoose = require("mongoose");

const PromoSchema = new mongoose.Schema({
  image: { type: String, required: true }, // URL of the promo image stored in S3
  promoDescription: { type: String, required: true }, // Promo description
  createdAt: { type: Date, default: Date.now }, // Timestamp of creation
});

module.exports = mongoose.model("Promo", PromoSchema);
