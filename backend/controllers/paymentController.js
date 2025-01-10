const axios = require("axios");
const Payment = require("../models/Payment");
const Order = require("../models/Order"); // Import the Order model
const dotenv = require("dotenv");
const qs = require("qs");
dotenv.config();

const multer = require("multer");

// Configure multer to parse multipart form data
const upload = multer();

const API_KEY = process.env.TOYYIB_API_KEY;
const CATEGORY_CODE = process.env.CATEGORY_CODE;

exports.createPayment = async (req, res) => {
  const { email, phone, description, amount } = req.body;

  console.log("Received payment request with details:");
  console.log(
    `Email: ${email}, Phone: ${phone}, Description: ${description}, Amount: ${amount}`
  );
  console.log("API KEY: " + process.env.TOYYIB_APIKEY);
  console.log("CATEGORY CODE: " + process.env.CATEGORY_CODE);

  try {
    console.log("Preparing to call ToyyibPay API...");

    const response = await axios.post(
      `${process.env.TOYYIB_URL}/index.php/api/createBill`,
      qs.stringify({
        userSecretKey: process.env.TOYYIB_APIKEY, // Ensure API key is loaded
        categoryCode: process.env.CATEGORY_CODE, // Ensure category code is valid
        billName: "Payment for " + description,
        billDescription: description,
        billAmount: amount * 100, // Convert RM to cents
        billTo: email,
        billEmail: email,
        billPhone: phone,
        billPriceSetting: 1,
        billPayorInfo: 1,
        billReturnUrl: "https://www.jemputkahwin.com.my/payment-success",
        // billCallbackUrl: "https://e17d-2001-d08-c2-b5aa-7182-5be9-d66e-4752.ngrok-free.app/api/payment/payment-callback",
        billCallbackUrl: "https://jemputkahwin-backend.onrender.com/api/payment/payment-callback",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Response from ToyyibPay API:", response.data);

    // Check if the response contains the expected data
    if (!response.data || !response.data[0]) {
      console.error("ToyyibPay API returned an invalid response.");
      return res
        .status(500)
        .json({ message: "Failed to create payment link." });
    }

    const { BillCode } = response.data[0];
    const paymentUrl = `${process.env.TOYYIB_URL}/${BillCode}`;

    console.log(
      `Successfully created payment. BillCode: ${BillCode}, Payment URL: ${paymentUrl}`
    );

    // Save payment details to database
    console.log("Saving payment details to database...");
    await Payment.create({
      email,
      phone,
      description,
      amount,
      status: "Pending",
      paymentId: BillCode,
    });

    console.log("Payment details saved successfully.");
    res.json({ paymentUrl });
  } catch (error) {
    console.error("Error creating payment:", error.message);
    if (error.response) {
      console.error("Response from ToyyibPay API:", error.response.data);
    }
    res.status(500).json({ message: "Failed to create payment." });
  }
};

exports.handleCallback = async (req, res) => {
  upload.none()(req, res, async (err) => {
    if (err) {
      console.error("Error parsing multipart/form-data:", err.message);
      return res.status(500).send("Error parsing callback data.");
    }

    console.log("Headers received:", req.headers);
    console.log("Raw body received:", req.body);

    const {
      refno,
      status,
      reason,
      billcode,
      amount,
      transaction_time,
    } = req.body;

    // Validate required fields
    if (!refno || !status || !billcode || !amount || !transaction_time) {
      console.error("Invalid callback data received:", req.body);
      return res.status(400).send("Invalid callback data.");
    }

    try {
      console.log("Searching for payment with BillCode:", billcode);
      const payment = await Payment.findOne({ paymentId: billcode });

      if (!payment) {
        console.error(`Payment not found for BillCode: ${billcode}`);
        return res.status(404).send("Payment not found.");
      }

      // Avoid processing duplicate callbacks
      if (payment.status === "Successful" || payment.status === "Failed") {
        console.log("Payment already processed. Skipping update.");
        return res.sendStatus(200);
      }

      console.log(`Updating payment with BillCode: ${billcode}`);
      payment.status =
        status === "1"
          ? "Successful"
          : status === "2"
          ? "Pending"
          : "Failed";
      payment.reason = reason || null;
      payment.refno = refno;
      payment.amountReceived = amount;
      payment.transactionTime = transaction_time;

      await payment.save();
      console.log(
        `Payment updated successfully. New status: ${payment.status}`
      );

      // If payment is successful, update the related Order's status
      if (payment.status === "Successful") {
        console.log("Searching for Order associated with this payment...");

        const order = await Order.findOne({ orderNumber: payment.description }); // Assume description contains orderNumber
        if (!order) {
          console.error(`Order not found for OrderNumber: ${payment.description}`);
        } else {
          order.paymentStatus = "paid";
          await order.save();
          console.log(`Order ${order.orderNumber} updated to 'paid'.`);
        }
      }

      res.sendStatus(200); // Acknowledge the callback
    } catch (error) {
      console.error("Error handling callback:", error.message);
      res.status(500).send("Error handling callback.");
    }
  });
};



