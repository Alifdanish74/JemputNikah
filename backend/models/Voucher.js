const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true }, // Discount percentage or amount
  expires: { type: Date, required: true }, // Expiry date
  quantity: { type: Number, required: true, default: 1 }, // Total number of uses available
});

module.exports = mongoose.model('Voucher', voucherSchema);
