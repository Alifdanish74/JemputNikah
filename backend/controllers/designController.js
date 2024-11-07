// controllers/adminDesignController.js
const CardDesign = require('../models/CardDesign');
const sharp = require('sharp');
const fs = require('fs');
const multer = require('multer');
const AWS = require('aws-sdk');
const path = require('path');

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
    Key: `weddingcard/${key}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    // Remove ACL: 'public-read',
  };
  const data = await s3.upload(params).promise();
  return data.Location;
};


// Controller for uploading a new wedding card design
const uploadDesign = async (req, res) => {
  const { category } = req.body;
  const imageFile = req.files.image[0];
  const imagePreviewFile = req.files.imagepreview[0];

  try {
    // Find the current count of designs in the provided category
    const count = await CardDesign.countDocuments({ category });
    const designNumber = String(count + 1).padStart(3, '0');
    const designName = `${category}${designNumber}`;

    // Upload images to S3
    const imageUrl = await uploadToS3(imageFile, `${designName}.png`);
    const imagePreviewUrl = await uploadToS3(imagePreviewFile, `Preview${designName}.png`);

    // Save the design with the S3 URLs
    const newDesign = new CardDesign({
      designName,
      category,
      image: imageUrl,
      imagepreview: imagePreviewUrl,
    });

    await newDesign.save();
    res.status(201).json(newDesign);
  } catch (error) {
    res.status(400).json({ message: 'Error uploading design', error });
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
    res.status(500).json({ message: 'Error fetching design count', error });
  }
};

// Get All Design
const getAllDesigns = async (req, res) => {
    res.json(await CardDesign.find());
}

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
    res.status(500).json({ message: 'Error fetching design by name', error });
  }
};



module.exports = { upload, uploadDesign, getDesignCountByCategory, getAllDesigns, getDesignByName };
