const express = require("express");
const { createPayment, handleCallback } = require("../controllers/paymentController");

const router = express.Router();

// Endpoint to create a payment
router.post("/create-payment", createPayment);

// Callback URL to handle payment status updates
router.post("/payment-callback", handleCallback);

module.exports = router;
