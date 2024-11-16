const mongoose = require("mongoose");

// Schema for individual wishlist items
const WishlistItemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productUrl: { type: String },
  bookingName: { type: String, default: null }, // Name of the person who booked
  bookingPhoneNumber: { type: String, default: null }, // Phone number of the person who booked
  bookingStatus: {
    type: String,
    enum: ["Booked", "Available"],
    default: "Available", // Default status
  },
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
  wishlist: [WishlistItemSchema],
});

module.exports = mongoose.model("Wishlist", WishlistMainSchema);
