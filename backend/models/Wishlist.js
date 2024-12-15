const mongoose = require("mongoose");

// Schema for individual wishlist product
const WishlistProductSchema = new mongoose.Schema({
  // uniqueId: {
  //   type: String,
  // },
  productName: { type: String}, // Name of the product
  productUrl: { type: String }, // URL of the product
  productImage: { type: String }, // Image URL of the product
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
  address: { type: String }, // Address associated with the wishlist
  phone: { type: String }, // Phone number associated with the wishlist

  // Separate fields for three wishlist products
  wishlistProduct1: { type: WishlistProductSchema },
  wishlistProduct2: { type: WishlistProductSchema },
  wishlistProduct3: { type: WishlistProductSchema },
  wishlistProduct4: { type: WishlistProductSchema },
  wishlistProduct5: { type: WishlistProductSchema },
  wishlistProduct6: { type: WishlistProductSchema },
  wishlistProduct7: { type: WishlistProductSchema },
  wishlistProduct8: { type: WishlistProductSchema },
  wishlistProduct9: { type: WishlistProductSchema },
  wishlistProduct10: { type: WishlistProductSchema },
});

module.exports = mongoose.model("Wishlist", WishlistMainSchema);
