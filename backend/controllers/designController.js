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
    // Upload optional motion images only if they are provided
    const imageMotionKiriAtasUrl = imageMotionKiriAtasFile
      ? await uploadToS3(imageMotionKiriAtasFile, `MotionKiriAtas${designName}.png`)
      : null;
    const imageMotionKiriTengahUrl = imageMotionKiriTengahFile
      ? await uploadToS3(imageMotionKiriTengahFile, `MotionKiriTengah${designName}.png`)
      : null;
    const imageMotionKiriBawahUrl = imageMotionKiriBawahFile
      ? await uploadToS3(imageMotionKiriBawahFile, `MotionKiriBawah${designName}.png`)
      : null;
    const imageMotionKananAtasUrl = imageMotionKananAtasFile
      ? await uploadToS3(imageMotionKananAtasFile, `MotionKananAtas${designName}.png`)
      : null;
    const imageMotionKananTengahUrl = imageMotionKananTengahFile
      ? await uploadToS3(imageMotionKananTengahFile, `MotionKananTengah${designName}.png`)
      : null;
    const imageMotionKananBawahUrl = imageMotionKananBawahFile
      ? await uploadToS3(imageMotionKananBawahFile, `MotionKananBawah${designName}.png`)
      : null;

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

    // Extract required image keys
    const imageKeysToDelete = [
      design.image?.split(".com/")[1],
      design.imagepreview?.split(".com/")[1],
      design.imagebg?.split(".com/")[1],
    ];

    // Check if the design is of category "Motion" before adding animated values
    if (design.category === "Motion") {
      imageKeysToDelete.push(
        design.animatedKiriAtas?.split(".com/")[1],
        design.animatedKiriTengah?.split(".com/")[1],
        design.animatedKiriBawah?.split(".com/")[1],
        design.animatedKananAtas?.split(".com/")[1],
        design.animatedKananTengah?.split(".com/")[1],
        design.animatedKananBawah?.split(".com/")[1]
      );
    }

    // Filter out undefined values
    const validKeys = imageKeysToDelete.filter(Boolean);

    console.log("Keys to delete:", validKeys);

    // Delete images from S3 only if they exist
    for (const key of validKeys) {
      await deleteFromS3(key);
    }

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
  try {
    const { category, page = 1 } = req.query;
    const limit = 12;
    const skip = (page - 1) * limit;

    // Build the query dynamically
    let query = {};
    if (category) {
      query.category = category; // Filter by category if provided
    }

    const totalCount = await CardDesign.countDocuments(query);
    const designs = await CardDesign.find(query).skip(skip).limit(limit);

    res.json({
      designs: designs || [],
      currentPage: Number(page),
      totalPages: Math.ceil(totalCount / limit) || 1,
      totalItems: totalCount,
    });
  } catch (error) {
    console.error("Error fetching wedding cards:", error);
    res.status(500).json({ designs: [], message: "Error fetching wedding cards", error });
  }
};




// Get the first 3 designs of each category
const getTopDesignsByCategory = async (req, res) => {
  try {
    const designs = await CardDesign.aggregate([
      { $match: { status: 'public' } }, // Filter only public designs
      { $sort: { category: 1, createdAt: 1 } }, // Sort by category and then by creation date (newest first)
      {
        $group: {
          _id: '$category', // Group by category
          topDesigns: { $push: '$$ROOT' }, // Push all designs into an array
        },
      },
      {
        $project: {
          _id: 0, // Remove the grouping key
          topDesigns: { $slice: ['$topDesigns', 1] }, // Take only the first 3 designs per category
        },
      },
      { $unwind: '$topDesigns' }, // Flatten the array of top designs
      { $replaceRoot: { newRoot: '$topDesigns' } }, // Replace the root with the design objects
    ]);

    res.status(200).json(designs);
  } catch (error) {
    console.error('Error fetching top designs:', error);
    res.status(500).json({ message: 'Failed to fetch designs', error });
  }
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
  getTopDesignsByCategory
};
