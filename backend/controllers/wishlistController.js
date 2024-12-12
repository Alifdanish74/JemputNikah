const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const mongoose = require("mongoose");
const multer = require("multer");
const Wishlist = require("../models/Wishlist");
const Order = require("../models/Order");

// Configure multer for memory storage (no local files)
const upload = multer({ storage: multer.memoryStorage() });

// Configure AWS S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to upload a file to S3 and return the URL
const uploadToS3 = async (file, filename) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `wishlist/${filename}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    await s3Client.send(new PutObjectCommand(params));
    return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};

// Submit Wishlist form
const uploadWishlist = async (req, res) => {
  const { orderNumber, address, phone } = req.body;
  const files = req.files || {};

  try {
    const order = await Order.findOne({ orderNumber }).populate(
      "weddingCardId"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const weddingCardId = order.weddingCardId?._id;
    if (!weddingCardId) {
      return res
        .status(404)
        .json({ message: "WeddingCard not associated with the order" });
    }

    let wishlistEntry = await Wishlist.findOne({
      weddingCardId,
      orderId: order._id,
    });

    if (!wishlistEntry) {
      wishlistEntry = new Wishlist({
        weddingCardId,
        orderId: order._id,
        address,
        phone,
      });
    }

    // Clear all existing wishlist keys to avoid stale data
    for (let i = 1; i <= 10; i++) {
      delete wishlistEntry[`wishlistProduct${i}`];
    }

    // Handle each wishlist product from the frontend
    for (let i = 1; i <= 10; i++) {
      const productName = req.body[`wishlistproductname${i}`];
      const productUrl = req.body[`wishlistproducturl${i}`];
      const productImageFile = files[`wishlistImage${i}`]?.[0];
      const existingImage = req.body[`existingImage${i}`];

      if (!productName && !productUrl && !productImageFile && !existingImage) {
        continue; // Skip empty items
      }

      const uniqueId = new mongoose.Types.ObjectId().toString();
      let productImage = null;

      if (productImageFile) {
        productImage = await uploadToS3(
          productImageFile,
          `${orderNumber}/wishlist_${uniqueId}.png`
        );
      } else if (existingImage) {
        productImage = existingImage;
      }

      wishlistEntry[`wishlistProduct${i}`] = {
        productName,
        productUrl,
        productImage,
        bookingName: null,
        bookingPhoneNumber: null,
        bookingStatus: "Available",
        uniqueId,
      };
    }

    wishlistEntry.address = address;
    wishlistEntry.phone = phone;

    await wishlistEntry.save();
    res
      .status(201)
      .json({ message: "Wishlist uploaded successfully", wishlistEntry });
  } catch (error) {
    console.error("Error uploading Wishlist:", error);
    res.status(500).json({ message: "Error uploading Wishlist", error });
  }
};


// Update Wishlist Item
const updateWishlist = async (req, res) => {
  const { orderNumber, productIndex } = req.params;
  const { productName, productUrl, bookingStatus } = req.body;
  const productImage = req.files?.productImage?.[0];

  try {
    const order = await Order.findOne({ orderNumber }).populate(
      "weddingCardId"
    );
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

    const wishlistKey = `wishlistProduct${productIndex}`;
    if (!wishlistEntry[wishlistKey]) {
      return res.status(404).json({ message: "Wishlist item not found." });
    }

    wishlistEntry[wishlistKey].productName =
      productName || wishlistEntry[wishlistKey].productName;
    wishlistEntry[wishlistKey].productUrl =
      productUrl || wishlistEntry[wishlistKey].productUrl;
    wishlistEntry[wishlistKey].bookingStatus =
      bookingStatus || wishlistEntry[wishlistKey].bookingStatus;

    if (productImage) {
      const imageUrl = await uploadToS3(
        productImage,
        `wishlist${productIndex}_${orderNumber}.png`
      );
      wishlistEntry[wishlistKey].productImage = imageUrl;
    }

    await wishlistEntry.save();
    res
      .status(200)
      .json({ message: "Wishlist item updated successfully", wishlistEntry });
  } catch (error) {
    console.error("Error updating Wishlist item:", error);
    res.status(500).json({ message: "Error updating Wishlist item", error });
  }
};

// Delete Wishlist Item
const deleteWishlistItem = async (req, res) => {
  const { orderNumber, productIndex } = req.params;

  try {
    const order = await Order.findOne({ orderNumber }).populate(
      "weddingCardId"
    );
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

    const wishlistKey = `wishlistProduct${productIndex}`;
    const productToDelete = wishlistEntry[wishlistKey];

    if (!productToDelete) {
      return res.status(404).json({ message: "Wishlist item not found." });
    }

    if (productToDelete.productImage) {
      const fileKey = productToDelete.productImage.split(".com/")[1];
      await deleteFromS3(fileKey);
    }

    wishlistEntry[wishlistKey] = undefined;

    await wishlistEntry.save();
    res.status(200).json({ message: "Wishlist item deleted successfully" });
  } catch (error) {
    console.error("Error deleting Wishlist item:", error);
    res.status(500).json({ message: "Error deleting Wishlist item", error });
  }
};

// Function to delete an object from S3
const deleteFromS3 = async (fileKey) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
    };
    await s3Client.send(new DeleteObjectCommand(params));
  } catch (error) {
    console.error("Error deleting from S3:", error);
    throw error;
  }
};

// Get Wishlist data for a specific weddingCardId
const getWishlists = async (req, res) => {
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
const getWishlistsByOrderNumber = async (req, res) => {
  const { orderNumber } = req.params;

  try {
    // Find the order by orderNumber
    const order = await Order.findOne({ orderNumber }).populate(
      "weddingCardId"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const wishlist = await Wishlist.findOne({
      weddingCardId: order.weddingCardId,
      orderId: order._id,
    })
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

// Book a Wishlist item
const bookWishlistItem = async (req, res) => {
  const { orderNumber } = req.params; // Retrieve orderNumber from route params
  const { productName, bookingName, bookingPhoneNumber } = req.body; // Get booking details

  try {
    // Find the order by orderNumber
    const order = await Order.findOne({ orderNumber }).populate(
      "weddingCardId"
    );

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

    let updated = false;

    // Check and update the matching wishlist product
    for (let i = 1; i <= 10; i++) {
      const wishlistKey = `wishlistProduct${i}`;
      if (
        wishlistEntry[wishlistKey] &&
        wishlistEntry[wishlistKey].productName === productName
      ) {
        if (wishlistEntry[wishlistKey].bookingStatus === "Booked") {
          return res
            .status(400)
            .json({ message: "This item is already booked." });
        }
        wishlistEntry[wishlistKey].bookingName = bookingName;
        wishlistEntry[wishlistKey].bookingPhoneNumber = bookingPhoneNumber;
        wishlistEntry[wishlistKey].bookingStatus = "Booked";
        updated = true;
        break;
      }
    }

    if (!updated) {
      return res.status(404).json({ message: "Wishlist item not found." });
    }

    // Save the updated wishlist
    await wishlistEntry.save();

    res.status(200).json({
      message: "Wishlist item booked successfully",
      wishlistEntry,
    });
  } catch (error) {
    console.error("Error booking Wishlist item:", error);
    res.status(500).json({ message: "Error booking Wishlist item", error });
  }
};

module.exports = {
  upload,
  uploadWishlist,
  getWishlists,
  getWishlistsByOrderNumber,
  deleteWishlistItem,
  bookWishlistItem,
};
