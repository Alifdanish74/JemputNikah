// controllers/adminDesignController.js
const CardDesign = require("../models/CardDesign");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const multer = require("multer");
// const AWS = require("aws-sdk");
const path = require("path");

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

// Function to upload to S3 and return the file URL
const uploadToS3 = async (file, filename) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME, // S3 Bucket Name
      Key: `weddingcard/${filename}`, // File path in the bucket
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

//////////////////////////////////////////////////
const uploadDesign = async (req, res) => {
  const { category, particleColor, fontColor } = req.body;
  const imageFile = req.files.image?.[0];
  const imagePreviewFile = req.files.imagepreview?.[0];
  const imageBgFile = req.files.imagebg?.[0];
  const imageMotionKiriAtasFile = req.files.animatedKiriAtas?.[0];
  const imageMotionKiriTengahFile = req.files.animatedKiriTengah?.[0];
  const imageMotionKiriBawahFile = req.files.animatedKiriBawah?.[0];
  const imageMotionKananAtasFile = req.files.animatedKananAtas?.[0];
  const imageMotionKananTengahFile = req.files.animatedKananTengah?.[0];
  const imageMotionKananBawahFile = req.files.animatedKananBawah?.[0];

  try {
    if (
      !imageFile ||
      !imagePreviewFile ||
      !imageBgFile
    ) {
      return res.status(400).json({ message: "All images files are required" });
    }

    // Get current count of designs in the provided category
    const count = await CardDesign.countDocuments({ category });
    const designNumber = String(count + 1).padStart(3, "0");
    const designName = `${category}${designNumber}`;

    // Upload images to S3
    const imageUrl = await uploadToS3(imageFile, `${designName}.png`);
    const imageBgUrl = await uploadToS3(
      imageBgFile,
      `Background${designName}.png`
    );
    const imagePreviewUrl = await uploadToS3(
      imagePreviewFile,
      `Preview${designName}.png`
    );
    const imageMotionKiriAtasUrl = await uploadToS3(
      imageMotionKiriAtasFile,
      `MotionKiriAtas${designName}.png`
    );
    const imageMotionKiriTengahUrl = await uploadToS3(
      imageMotionKiriTengahFile,
      `MotionKiriTengah${designName}.png`
    );
    const imageMotionKiriBawahUrl = await uploadToS3(
      imageMotionKiriBawahFile,
      `MotionKiriBawah${designName}.png`
    );
    const imageMotionKananAtasUrl = await uploadToS3(
      imageMotionKananAtasFile,
      `MotionKananAtas${designName}.png`
    );
    const imageMotionKananTengahUrl = await uploadToS3(
      imageMotionKananTengahFile,
      `MotionKananTengah${designName}.png`
    );
    const imageMotionKananBawahUrl = await uploadToS3(
      imageMotionKananBawahFile,
      `MotionKananBawah${designName}.png`
    );

    // Save design in the database
    const newDesign = new CardDesign({
      designName,
      category,
      image: imageUrl,
      imagepreview: imagePreviewUrl,
      imagebg: imageBgUrl,
      particleColor: particleColor,
      fontColor: fontColor,
      animatedKiriAtas: imageMotionKiriAtasUrl,
      animatedKiriTengah: imageMotionKiriTengahUrl,
      animatedKiriBawah: imageMotionKiriBawahUrl,
      animatedKananAtas: imageMotionKananAtasUrl,
      animatedKananTengah: imageMotionKananTengahUrl,
      animatedKananBawah: imageMotionKananBawahUrl,
    });

    await newDesign.save();
    res.status(201).json(newDesign);
  } catch (error) {
    console.error("Error in uploadDesign:", error);
    res.status(500).json({ message: "Error uploading design", error });
  }
};

// Function to delete an object from S3
const deleteFromS3 = async (fileKey) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME, // S3 Bucket Name
      Key: fileKey, // File path in the bucket
    };

    // Execute the delete command
    await s3Client.send(new DeleteObjectCommand(params));
  } catch (error) {
    console.error("Error deleting from S3:", error);
    throw error;
  }
};

// Delete Design and S3 Images
const deleteDesign = async (req, res) => {
  const { designName } = req.params;

  try {
    // Find the design by name
    const design = await CardDesign.findOne({ designName });

    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }

    // Extract the S3 file keys from the URLs
    const imageKey = design.image.split(".com/")[1];
    const imagePreviewKey = design.imagepreview.split(".com/")[1];
    const imageBgKey = design.imagebg.split(".com/")[1];
    const animatedKiriAtaskey = design.animatedKiriAtas.split(".com/")[1];
    const animatedKiriTengahkey = design.animatedKiriTengah.split(".com/")[1];
    const animatedKiriBawahkey = design.animatedKiriBawah.split(".com/")[1];
    const animatedKananAtaskey = design.animatedKananAtas.split(".com/")[1];
    const animatedKananTengahkey = design.animatedKananTengah.split(".com/")[1];
    const animatedKananBawahkey = design.animatedKananBawah.split(".com/")[1];

    console.log(
      "Keys to delete:",
      imageKey,
      imagePreviewKey,
      imageBgKey,
      animatedKiriAtaskey,
      animatedKiriTengahkey,
      animatedKiriBawahkey,
      animatedKananAtaskey,
      animatedKananTengahkey,
      animatedKananBawahkey
    );

    // Delete images from S3
    await deleteFromS3(imageKey);
    await deleteFromS3(imagePreviewKey);
    await deleteFromS3(imageBgKey);
    await deleteFromS3(animatedKiriAtaskey);
    await deleteFromS3(animatedKiriTengahkey);
    await deleteFromS3(animatedKiriBawahkey);
    await deleteFromS3(animatedKananAtaskey);
    await deleteFromS3(animatedKananTengahkey);
    await deleteFromS3(animatedKananBawahkey);

    // Delete the design from the database
    await CardDesign.deleteOne({ designName });

    res.status(200).json({ message: "Design and images deleted successfully" });
  } catch (error) {
    console.error("Error in deleteDesign:", error);
    res.status(500).json({ message: "Error deleting design", error });
  }
};

// Controller for getting the count of designs in a category
const getDesignCountByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    // Count the number of designs in the given category
    const count = await CardDesign.countDocuments({ category });

    // Return the count
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching design count", error });
  }
};

// Get All Design
const getAllDesigns = async (req, res) => {
  res.json(await CardDesign.find());
};

// Controller to get design by name
const getDesignByName = async (req, res) => {
  const { designName } = req.params;

  try {
    // Find the design with the given designName
    const design = await CardDesign.findOne({ designName: designName });

    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }

    res.json(design);
  } catch (error) {
    res.status(500).json({ message: "Error fetching design by name", error });
  }
};

module.exports = {
  upload,
  uploadDesign,
  getDesignCountByCategory,
  getAllDesigns,
  getDesignByName,
  deleteDesign,
};
