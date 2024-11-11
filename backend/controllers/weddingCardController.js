const WeddingCard = require("../models/WeddingCard");
const Order = require("../models/Order");
const multer = require("multer");
const AWS = require("aws-sdk");

// Configure multer for memory storage (no local files)
const upload = multer({ storage: multer.memoryStorage() });

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Function to upload to S3 and return the file URL
const uploadToS3 = async (file, filename) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filename,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  const data = await s3.upload(params).promise();
  return data.Location;
};

// Create a new wedding card
exports.createWeddingCard = async (req, res) => {
  try {
    const { tarikhMajlis, maxDate, majlisStart } = req.body;
    const qrCodeFile = req.file; // Ensure middleware is configured to handle this

    // Parse dates
    const tarikhMajlisLocal = new Date(tarikhMajlis);
    tarikhMajlisLocal.setHours(0, 0, 0, 0);
    const maxDateLocal = new Date(maxDate);
    maxDateLocal.setHours(0, 0, 0, 0);

    if (majlisStart) {
      const [hours, minutes] = majlisStart.split(":").map(Number);
      tarikhMajlisLocal.setHours(hours, minutes, 0, 0);
      maxDateLocal.setHours(hours, minutes, 0, 0);
    }

    // Generate custom order number
    const orderCount = await Order.countDocuments();
    const nextOrderNumber = `JK${String(orderCount + 1).padStart(5, "0")}`;

    // Upload QR code to S3 if provided
    let qrCodeUrl = "";
    if (qrCodeFile) {
      qrCodeUrl = await uploadToS3(qrCodeFile, `${nextOrderNumber}/qrCode.png`);
    }

    // Create new wedding card
    const newWeddingCard = new WeddingCard({
      ...req.body,
      tarikhMajlis: tarikhMajlisLocal,
      maxDate: maxDateLocal,
      userId: req.user._id,
      userPhone: req.user.phone,
      userName: req.user.name,
      qrCode: qrCodeUrl, // Include uploaded QR code URL
    });

    // Save the wedding card
    await newWeddingCard.save();

    // Set order price based on the newWeddingCard price
    const { price } = newWeddingCard;

    // Create order with custom order number
    const newOrder = new Order({
      userId: req.user._id,
      weddingCardId: newWeddingCard._id,
      orderNumber: nextOrderNumber,
      paymentStatus: "pending",
      price,
    });

    await newOrder.save();

    // Respond with created data
    res.status(201).json({ weddingCard: newWeddingCard, order: newOrder });
  } catch (error) {
    console.error("Error creating wedding card:", error);
    res.status(500).json({ message: "Error creating wedding card", error });
  }
};

// Generate a presigned URL for downloading the QR code image
exports.getPresignedQRCodeUrl = async (req, res) => {
  try {
    const { weddingCardId } = req.params;

    // Fetch the wedding card to get the QR code key
    const weddingCard = await WeddingCard.findById(weddingCardId);
    if (!weddingCard || !weddingCard.qrCode) {
      return res.status(404).json({ message: "Wedding card or QR code not found" });
    }

    const qrCodeKey = weddingCard.qrCode.split(".com/")[1]; // Extract the key from the URL

    // Set up S3 parameters for the presigned URL
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: qrCodeKey,
      Expires: 6000 // URL expires in 60 seconds
    };

    // Generate the presigned URL
    const presignedUrl = s3.getSignedUrl("getObject", params);
    res.json({ url: presignedUrl });
  } catch (error) {
    console.error("Error generating presigned QR code URL:", error);
    res.status(500).json({ message: "Error generating QR code download link", error });
  }
};

// Get a wedding card by ID
exports.getWeddingCardById = async (req, res) => {
  try {
    const weddingCard = await WeddingCard.findById(req.params.id);
    if (!weddingCard) {
      return res.status(404).json({ message: "Wedding card not found" });
    }
    res.json(weddingCard);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wedding card", error });
  }
};

// Update a wedding card
// Controller for updating a wedding card
exports.updateWeddingCard = async (req, res) => {
  try {
    const { id } = req.params;
    let { tarikhMajlis, majlisStart } = req.body;

    // Parse date and time similar to createWeddingCard
    const localDate = new Date(tarikhMajlis);
    localDate.setHours(0, 0, 0, 0);

    if (majlisStart) {
      const [hours, minutes] = majlisStart.split(":").map(Number);
      localDate.setHours(hours, minutes, 0, 0);
    }

    // Prepare the update object
    const updateData = {
      ...req.body,
      tarikhMajlis: localDate,
    };

    // If a new QR code is provided, replace the old image in S3
    if (req.file) {
      const filename = `QR_${id}.png`; // Generate filename based on ID
      updateData.qrCode = await uploadToS3(req.file, filename); // Upload new QR code to S3
    }

    // Update wedding card in DB
    const updatedWeddingCard = await WeddingCard.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedWeddingCard) {
      return res.status(404).json({ message: "Wedding card not found" });
    }

    res.json(updatedWeddingCard);
  } catch (error) {
    console.error("Error updating wedding card:", error);
    res.status(500).json({ message: "Error updating wedding card", error });
  }
};

// Delete a wedding card
exports.deleteWeddingCard = async (req, res) => {
  try {
    const deletedWeddingCard = await WeddingCard.findByIdAndDelete(
      req.params.id
    );
    if (!deletedWeddingCard) {
      return res.status(404).json({ message: "Wedding card not found" });
    }
    res.json({ message: "Wedding card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting wedding card", error });
  }
};

// Get designName and tajukMajlis by weddingCardId
exports.getWeddingCardInfo = async (req, res) => {
  const { weddingCardId } = req.params;
  try {
    const weddingCard = await WeddingCard.findById(weddingCardId); // Select only needed fields
    if (!weddingCard) {
      return res.status(404).json({ message: "Wedding card not found" });
    }
    res.json({
      designName: weddingCard.designName,
      tajukMajlis: weddingCard.tajukMajlis,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching wedding card info", error });
  }
};
