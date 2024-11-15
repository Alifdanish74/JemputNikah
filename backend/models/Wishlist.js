const mongoose = require("mongoose");

// Schema for individual wishlist items
const WishlistItemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productUrl: { type: String }, // No URL validation as per your requirements
});

// Main schema for Wishlist
const WishlistMainSchema = new mongoose.Schema({
  weddingCardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WeddingCard",
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  wishlist: [WishlistItemSchema], // Array of wishlist items
});

module.exports = mongoose.model("Wishlist", WishlistMainSchema);
