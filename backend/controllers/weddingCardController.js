const WeddingCard = require("../models/WeddingCard");
const Order = require("../models/Order");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const multer = require("multer");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
// const AWS = require("aws-sdk");

// Configure multer for memory storage (no local files)
const upload = multer({ storage: multer.memoryStorage() });

// Configure AWS S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to upload to S3 and return the file URL
// const uploadToS3 = async (file, filename) => {
//   const params = {
//     Bucket: process.env.S3_BUCKET_NAME,
//     Key: filename,
//     Body: file.buffer,
//     ContentType: file.mimetype,
//   };
//   const data = await s3.upload(params).promise();
//   return data.Location;
// };
const uploadToS3 = async (file, filename) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME, // S3 Bucket Name
      Key: filename, // File path in the bucket
      Body: file.buffer, // File buffer
      ContentType: file.mimetype, // File MIME type
    };

    // Execute the upload command
    await s3Client.send(new PutObjectCommand(params));

    // Construct the permanent file URL
    const fileUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;

    return fileUrl; // Return the permanent file URL
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};

// Create a new wedding card
// weddingCardController.js
exports.createWeddingCard = [
  upload.single("qrCodeFile"), // Ensure "qrCodeFile" matches MoneyGiftSection
  async (req, res) => {
    try {
      const { tarikhMajlis, majlisStart, hashtag } = req.body;
      const qrCodeFile = req.file;

      console.log("Request body:", req.body); // Log incoming data

      const maxInvitations =
        req.body.maxInvitations === "null"
          ? null
          : Number(req.body.maxInvitations);

      const maxInvitationsDewasa =
        req.body.maxInvitationsDewasa === "null"
          ? null
          : Number(req.body.maxInvitationsDewasa);
      const maxInvitationsKids =
        req.body.maxInvitationsKids === "null"
          ? null
          : Number(req.body.maxInvitationsKids);

      const maxDate =
        req.body.maxDate === "null" ? null : new Date(req.body.maxDate);

      // Parse and set `maxDateLocal` only if `maxDate` is provided
      let maxDateLocal = null;
      if (maxDate) {
        maxDateLocal = new Date(maxDate);
        maxDateLocal.setHours(0, 0, 0, 0);
      }

      // Generate custom order number
      const orderCount = await Order.countDocuments();
      const nextOrderNumber = `JK${String(orderCount + 1).padStart(5, "0")}`;

      // Upload QR code to S3 if provided
      let qrCodeUrl = "";
      if (qrCodeFile) {
        qrCodeUrl = await uploadToS3(
          qrCodeFile,
          `${nextOrderNumber}/${hashtag}/qrCode.png`
        );
      }

      const newWeddingCard = new WeddingCard({
        ...req.body,
        tarikhMajlis: tarikhMajlis,

        maxInvitations: maxInvitations,
        maxInvitationsDewasa: maxInvitationsDewasa,
        maxInvitationsKids: maxInvitationsKids,
        userId: req.user._id,
        userPhone: req.user.phone,
        userName: req.user.name,
        qrCode: qrCodeUrl, // Store S3 URL
      });

      // Save the wedding card
      await newWeddingCard.save();
      console.log("Created wedding card:", newWeddingCard); // Log updated data

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
  },
];

// Generate a presigned URL for downloading the QR code image
exports.getPresignedQRCodeUrl = async (req, res) => {
  try {
    const { weddingCardId } = req.params;

    // Fetch the wedding card to get the QR code key
    const weddingCard = await WeddingCard.findById(weddingCardId);
    if (!weddingCard || !weddingCard.qrCode) {
      return res
        .status(404)
        .json({ message: "Wedding card or QR code not found" });
    }

    const qrCodeKey = weddingCard.qrCode.split(".com/")[1]; // Extract the key from the URL

    // Prepare S3 parameters for the presigned URL
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: qrCodeKey,
    };

    // Generate the presigned URL
    const command = new GetObjectCommand(params);
    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 600,
    }); // Expires in 600 seconds (10 minutes)

    res.json({ url: presignedUrl });
  } catch (error) {
    console.error("Error generating presigned QR code URL:", error);
    res
      .status(500)
      .json({ message: "Error generating QR code download link", error });
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
// Apply multer as middleware to handle multipart/form-data
// Update wedding card
exports.updateWeddingCard = [
  upload.single("qrCodeFile"),
  async (req, res) => {
    try {
      const { id } = req.params;
      let updateData = { ...req.body };

      if (req.file) {
        updateData.qrCode = await uploadToS3(
          req.file,
          `qr_codes/${id}_qrCode.png`
        );
      }

      const updatedWeddingCard = await WeddingCard.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
      res.json(updatedWeddingCard);
    } catch (error) {
      console.error("Error updating wedding card:", error);
      res.status(500).json({ message: "Error updating wedding card", error });
    }
  },
];

// Get All wedding cards
exports.getAllWeddingCards = async (req, res) => {
  res.json(await WeddingCard.find());
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
