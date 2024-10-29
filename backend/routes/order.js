const express = require('express');
const { getAllOrders, getOrderById, deleteOrder, getOrdersByUserId } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware'); // Use authMiddleware for protected routes
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

// GET: Get all orders (optional: add admin protection via authMiddleware)
router.get('/orders', getAllOrders);

// GET: Get a single order by ID
router.get('/orders/:id', authMiddleware, getOrderById);

// GET: Get a single order by user ID
router.get('/user/:userId', authMiddleware, getOrdersByUserId);


// DELETE: Delete an order by ID
router.delete('/orders/:id', authMiddleware, deleteOrder);

module.exports = router;
