const Wishlist = require("../models/Wishlist");
const WeddingCard = require("../models/WeddingCard");
const Order = require("../models/Order");

// Submit Wishlist form
exports.submitWishlist = async (req, res) => {
  const { orderNumber, address, phone, wishlist } = req.body;

  try {
    // Find the order by orderNumber
    const order = await Order.findOne({ orderNumber }).populate("weddingCardId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const weddingCardId = order.weddingCardId?._id;

    if (!weddingCardId) {
      return res.status(404).json({ message: "WeddingCard not associated with the order" });
    }

    // Find existing Wishlist or create a new one
    let wishlistEntry = await Wishlist.findOne({ weddingCardId, orderId: order._id });

    if (!wishlistEntry) {
      wishlistEntry = new Wishlist({
        weddingCardId,
        orderId: order._id,
        address,
        phone,
        wishlist: [],
      });
    }

    // Update address and phone
    wishlistEntry.address = address;
    wishlistEntry.phone = phone;

    // Replace the wishlist items with the new ones
    wishlistEntry.wishlist = wishlist;

    // Save the wishlist
    await wishlistEntry.save();

    res.status(200).json({ message: "Wishlist submitted successfully", wishlistEntry });
  } catch (error) {
    console.error("Error submitting Wishlist:", error);
    res.status(500).json({ message: "Error submitting Wishlist", error });
  }
};

// Get Wishlist data for a specific weddingCardId
exports.getWishlists = async (req, res) => {
  const { weddingCardId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ weddingCardId })
      .populate("weddingCardId")
      .populate("orderId");

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    console.error("Error fetching Wishlist data:", error);
    res.status(500).json({ message: "Error fetching Wishlist data", error });
  }
};

// Get Wishlist data by orderNumber
exports.getWishlistsByOrderNumber = async (req, res) => {
  const { orderNumber } = req.params;

  try {
    // Find the order by orderNumber
    const order = await Order.findOne({ orderNumber }).populate("weddingCardId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const wishlist = await Wishlist.findOne({ weddingCardId: order.weddingCardId, orderId: order._id })
      .populate("weddingCardId")
      .populate("orderId");

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    console.error("Error fetching Wishlist by orderNumber:", error);
    res.status(500).json({ message: "Error fetching Wishlist", error });
  }
};

// Delete a Wishlist submission
exports.deleteWishlistItem = async (req, res) => {
  const { wishlistId, itemId } = req.params;

  try {
    const wishlist = await Wishlist.findById(wishlistId);

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // Filter out the item to delete
    wishlist.wishlist = wishlist.wishlist.filter(
      (item) => item._id.toString() !== itemId
    );

    // Save updated Wishlist
    await wishlist.save();

    res.status(200).json({ message: "Wishlist item deleted successfully" });
  } catch (error) {
    console.error("Error deleting Wishlist item:", error);
    res.status(500).json({ message: "Error deleting Wishlist item", error });
  }
};

// Book a Wishlist item
exports.bookWishlistItem = async (req, res) => {
    const { orderNumber } = req.params; // Retrieve orderNumber from route params
    const { productName, bookingName, bookingPhoneNumber } = req.body; // Get booking details
  
    try {
      // Find the order by orderNumber
      const order = await Order.findOne({ orderNumber }).populate("weddingCardId");
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      const wishlistEntry = await Wishlist.findOne({
        weddingCardId: order.weddingCardId,
        orderId: order._id,
      });
  
      if (!wishlistEntry) {
        return res.status(404).json({ message: "Wishlist not found" });
      }
  
      // Find the wishlist item to book
      const wishlistItem = wishlistEntry.wishlist.find(
        (item) => item.productName === productName
      );
  
      if (!wishlistItem) {
        return res.status(404).json({ message: "Wishlist item not found" });
      }
  
      if (wishlistItem.bookingStatus === "Booked") {
        return res.status(400).json({ message: "This item is already booked." });
      }
  
      // Update booking details for the wishlist item
      wishlistItem.bookingName = bookingName;
      wishlistItem.bookingPhoneNumber = bookingPhoneNumber;
      wishlistItem.bookingStatus = "Booked";
  
      // Save the updated wishlist
      await wishlistEntry.save();
  
      res.status(200).json({
        message: "Wishlist item booked successfully",
        bookedItem: wishlistItem,
      });
    } catch (error) {
      console.error("Error booking Wishlist item:", error);
      res.status(500).json({ message: "Error booking Wishlist item", error });
    }
  };
  
