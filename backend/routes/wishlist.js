const express = require("express");
const router = express.Router();
const {
  upload,
  uploadWishlist,
  getWishlists,
  getWishlistsByOrderNumber,
  deleteWishlistItem,
  bookWishlistItem,
} = require("../controllers/wishlistController");

// Route to upload Wishlist with images
router.post(
  "/upload-wishlist",
  upload.fields([
    { name: "wishlistImage1", maxCount: 1 }, // First wishlist product image
    { name: "wishlistImage2", maxCount: 1 }, // Second wishlist product image
    { name: "wishlistImage3", maxCount: 1 }, // Third wishlist product image
  ]),
  uploadWishlist
);

// Route to fetch Wishlist by weddingCardId
// router.get("/list/:weddingCardId", getWishlists);

// Route to fetch Wishlist by orderNumber
router.get("/order/:orderNumber", getWishlistsByOrderNumber);

// Route to delete a specific Wishlist item by orderNumber and index
router.delete("/delete/:orderNumber/:productIndex", deleteWishlistItem);


// Route to book a Wishlist item
router.post("/book-item/:orderNumber", bookWishlistItem);

module.exports = router;
