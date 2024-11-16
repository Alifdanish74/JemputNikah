const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

// Submit Wishlist
router.post("/submit", wishlistController.submitWishlist);

// Get Wishlist by weddingCardId
router.get("/list/:weddingCardId", wishlistController.getWishlists);

// Get Wishlist by orderNumber
router.get("/order/:orderNumber", wishlistController.getWishlistsByOrderNumber);

// Delete a Wishlist item
router.delete("/delete/:wishlistId/:itemId", wishlistController.deleteWishlistItem);

router.post("/book-item/:orderNumber", wishlistController.bookWishlistItem);

module.exports = router;
