const Promo = require("../models/Promo");
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
      Key: `promo/${filename}`, // File path in the bucket
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

const uploadPromo = async (req, res) => {
  const { promoDescription} = req.body;
  const imageFile = req.files.image?.[0];

  try {
    if (
      !imageFile
    ) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload images to S3
    const imageUrl = await uploadToS3(imageFile, `promo.png`);

    // Save design in the database
    const newPromo = new Promo({
      promoDescription,
      image: imageUrl,
    });

    await newPromo.save();
    res.status(201).json(newPromo);
  } catch (error) {
    console.error("Error in promoUpload:", error);
    res.status(500).json({ message: "Error uploading promo", error });
  }
};

const updatePromo = async (req, res) => {
    const { id } = req.params;
  
    try {
      const promo = await Promo.findById(id);
      if (!promo) {
        return res.status(404).json({ message: "Promo not found" });
      }
  
      // Log before updating
      console.log("Original Promo:", promo);
  
      // Update promo description if provided
      if (req.body.promoDescription) {
        console.log("Updating promoDescription:", req.body.promoDescription);
        promo.promoDescription = req.body.promoDescription;
      }
  
      // Update image if a new file is uploaded
      const imageFile = req.file;
      if (imageFile) {
        console.log("Uploading new image to S3...");
        const imageUrl = await uploadToS3(imageFile, `promo-${id}.png`);
        promo.image = imageUrl;
      }
  
      await promo.save();
  
      // Log after saving
      console.log("Promo Updated Successfully:", promo);
  
      res.status(200).json(promo);
    } catch (error) {
      console.error("Error updating promo:", error);
      res.status(500).json({ message: "Error updating promo", error });
    }
  };
  
  
  

// Get All Design
const getAllPromo = async (req, res) => {
  res.json(await Promo.find());
};

module.exports = {
    upload,
    uploadPromo,
    getAllPromo,
    updatePromo
  };