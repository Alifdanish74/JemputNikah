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
  const { category } = req.body;
  const imagePath = req.files.image[0].path; // Multer stores the image in 'uploads/' folder
  const imagepreviewPath = req.files.imagepreview[0].path; // Multer stores the image in 'uploads/' folder
//   const pngImagePath = path.join(path.dirname(imagePath), `${req.file.filename}.png`);

  try {
    // Find the current count of designs in the provided category
    const count = await CardDesign.countDocuments({ category });

    // Generate the next designName based on the count of existing designs
    const designNumber = String(count + 1).padStart(3, '0');
    const designName = `${category}${designNumber}`;

       // Set the new file path (replace original filename with designName and .png extension)
       const newImagePath = path.join(path.dirname(imagePath), `${designName}.png`);
       const newImagePreviewPath = path.join(path.dirname(imagepreviewPath), `Preview${designName}.png`);

    // Convert the uploaded image to .png using sharp
    await sharp(imagePath)
      .png() // Convert to png
      .toFile(newImagePath);
    // Convert the uploaded image to .png using sharp
    await sharp(imagepreviewPath)
      .png() // Convert to png
      .toFile(newImagePreviewPath);

    // Delete the original uploaded file
    fs.unlinkSync(imagePath);
    fs.unlinkSync(imagepreviewPath);

    // Save the design with the new .png image path
    const newDesign = new CardDesign({
      designName,
      category,
      image: newImagePath, // Store the .png image path
      imagepreview: newImagePreviewPath, // Store the .png image path
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
