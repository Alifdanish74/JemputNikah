const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true }, // Original amount requested
  status: { type: String, default: "Pending" }, // "Successful", "Pending", "Failed"
  paymentId: { type: String, required: true, unique: true }, // BillCode
  refno: { type: String }, // Payment reference number from ToyyibPay
  amountReceived: { type: Number }, // Amount received (in RM)
  transactionTime: { type: String }, // Datetime of the transaction
  reason: { type: String }, // Reason for failure (if applicable)
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
