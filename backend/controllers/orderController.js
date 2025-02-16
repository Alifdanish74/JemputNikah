const Order = require("../models/Order");
const WeddingCard = require("../models/WeddingCard");

// GET: Fetch all orders
// GET: Fetch all orders with pagination and search
exports.getAllOrders = async (req, res) => {
  try {
    const { page = 1, search = "" } = req.query;
    const itemsPerPage = 20;

    const query = search
      ? { orderNumber: { $regex: search, $options: "i" } }
      : {};

    const totalOrders = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .populate("userId", "name email phone") // Only populate user name
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    res.status(200).json({
      orders,
      totalPages: Math.ceil(totalOrders / itemsPerPage),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// GET: Fetch a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "weddingCardId userId"
    ); // Fetch order by ID and populate data
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching the order", error });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate(
      "weddingCardId"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders for user", error });
  }
};

exports.getOrdersByOrderNumber = async (req, res) => {
  try {
    const orders = await Order.findOne({
      orderNumber: req.params.orderNumber,
    }).populate("weddingCardId");
    if (!order) {
      return res.status(404).send("<h1>Order not found</h1>");
    }

    // Extract metadata information
    const { weddingCardId } = order;
    const title = `${weddingCardId.title} | ${weddingCardId.hashtag}`;
    const hashtag = `${weddingCardId.hashtag}`
    const description = "Tekan pautan untuk lihat jemputan";
    // const image = weddingCardId.imageUrl || "https://jemputkahwin.com.my/default-preview.jpg"; // Fallback image

    // Return HTML with metadata
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        
        <!-- Open Graph Meta Tags for WhatsApp & Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:url" content="https://jemputkahwin.com.my/weddingcard/${hashtag}/${order.orderNumber}">
        
        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${title}">
        <meta name="twitter:description" content="${description}">

        <meta http-equiv="refresh" content="0;url=https://jemputkahwin.com.my/weddingcard/${hashtag}/${order.orderNumber}">
      </head>
      <body>
        <p>Redirecting...</p>
      </body>
      </html>
    `);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders for user", error });
  }
};

// DELETE: Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id); // Delete order by ID
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting the order", error });
  }
};

// PATCH: Update an order by ID
// PUT: Update an order by ID
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params; // Get the order ID from the request params
    const { paymentStatus } = req.body; // Get updated paymentStatus from the request body

    // Validate required fields
    if (!paymentStatus) {
      return res.status(400).json({ message: "Payment status is required" });
    }

    // Find and update the order
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { paymentStatus }, // Replace the entire paymentStatus field
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order updated successfully",
      updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating the order", error });
  }
};



exports.deleteOrderAndWeddingCard = async (req, res) => {
  try {
    // Find the order by ID
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Delete the associated wedding card
    const weddingCard = await WeddingCard.findByIdAndDelete(order.weddingCardId);
    if (!weddingCard) {
      return res
        .status(404)
        .json({ message: "Associated Wedding Card not found" });
    }

    // Update the paymentStatus of the order to "deleted"
    order.paymentStatus = "deleted";
    await order.save();

    res.status(200).json({
      message: "Wedding Card deleted and Order marked as deleted successfully",
    });
  } catch (error) {
    console.error("Error updating Order and deleting Wedding Card:", error);
    res.status(500).json({
      message: "Error updating Order and deleting Wedding Card",
      error,
    });
  }
};

