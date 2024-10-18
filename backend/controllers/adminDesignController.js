// controllers/adminDesignController.js
const CardDesign = require('../models/CardDesign');
const sharp = require('sharp');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

// Multer configuration to store uploaded files in 'uploads/' directory
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// Controller for uploading a new wedding card design
const uploadDesign = async (req, res) => {
  const { category, description } = req.body;
  const imagePath = req.file.path; // Multer stores the image in 'uploads/' folder
  const jpgImagePath = path.join(path.dirname(imagePath), `${req.file.filename}.jpg`);

  try {
    // Find the current count of designs in the provided category
    const count = await CardDesign.countDocuments({ category });

    // Generate the next designName based on the count of existing designs
    const designNumber = String(count + 1).padStart(3, '0');
    const designName = `${category}${designNumber}`;

       // Set the new file path (replace original filename with designName and .jpg extension)
       const newImagePath = path.join(path.dirname(imagePath), `${designName}.jpg`);

    // Convert the uploaded image to .jpg using sharp
    await sharp(imagePath)
      .jpeg({ quality: 80 }) // Convert to JPG
      .toFile(newImagePath);

    // Delete the original uploaded file
    fs.unlinkSync(imagePath);

    // Save the design with the new .jpg image path
    const newDesign = new CardDesign({
      designName,
      category,
      description,
      image: newImagePath, // Store the .jpg image path
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

module.exports = { upload, uploadDesign, getDesignCountByCategory };
