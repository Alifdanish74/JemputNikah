const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Who ordered
  weddingCardId: { type: mongoose.Schema.Types.ObjectId, ref: 'WeddingCard', required: true }, // Reference to the wedding card
  orderNumber: { type: String, required: true }, // Unique order number
  paymentStatus: { type: String, enum: ['pending', 'paid', 'deleted'], default: 'pending' }, // Payment status
  price: { type: Number, required: true }, // Order amount (could include card price, etc.)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
