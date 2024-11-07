const WeddingCard = require("../models/WeddingCard");
const Order = require("../models/Order");

// Create a new wedding card
exports.createWeddingCard = async (req, res) => {
  try {
    // Include the authenticated user's ID in the wedding card data
    const newWeddingCard = new WeddingCard({
      ...req.body,
      userId: req.user._id,
      userPhone: req.user.phone,
      userName: req.user.name, // Attach the user ID from the authenticated user
    });

    // Save the new wedding card to the database
    await newWeddingCard.save();

    const { price } = newWeddingCard;

    // Step 2: Count existing orders and generate the custom order number
    const orderCount = await Order.countDocuments(); // Get the total count of orders
    const nextOrderNumber = `JK${String(orderCount + 1).padStart(5, "0")}`; // Example: JK00001, JK00002, etc.

    // Step 3: Create the order with the custom order number
    const newOrder = new Order({
      userId: req.user._id,
      weddingCardId: newWeddingCard._id,
      orderNumber: nextOrderNumber, // Custom order number
      paymentStatus: "pending", // Default payment status
      price, // Set the order amount (replace with actual calculation if needed)
    });

    await newOrder.save();

    // Step 4: Return both the wedding card and the order
    res.status(201).json({ weddingCard: newWeddingCard, order: newOrder });
    console.log({ weddingCard: newWeddingCard, order: newOrder }); // Log without sending another response
  } catch (error) {
    res.status(500).json({ message: "Error creating wedding card", error });
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
exports.updateWeddingCard = async (req, res) => {
  try {
    const updatedWeddingCard = await WeddingCard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedWeddingCard) {
      return res.status(404).json({ message: "Wedding card not found" });
    }
    res.json(updatedWeddingCard);
  } catch (error) {
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
