const Order = require("../models/Order");

// GET: Fetch all orders
// GET: Fetch all orders with pagination and search
exports.getAllOrders = async (req, res) => {
  try {
    const { page = 1, search = "" } = req.query;
    const itemsPerPage = 10;

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
