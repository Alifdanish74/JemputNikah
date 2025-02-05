const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/auth");
const weddingCardRoutes = require("./routes/weddingCard");
const adminRoutes = require("./routes/design");
const orderRoutes = require("./routes/order");
const rsvpRoutes = require("./routes/rsvp");
const songRoutes = require("./routes/song");
const wishlistRoutes = require("./routes/wishlist");
const paymentRoutes = require("./routes/payment");
const voucherRoutes = require("./routes/voucher");
const promoRoutes = require("./routes/promo");

const app = express();
// Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data

app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
// Dynamic CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://jemput-kahwin.vercel.app",
  "https://www.jemputkahwin.com.my",
  "https://toyyibpay.com", // Production
  "https://dev.toyyibpay.com", // Sandbox // Deployed frontend on Vercel
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware to set Cross-Origin headers
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

//   Connect to MongoDB by mongoose
mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/wedding-cards", weddingCardRoutes);
// Use the admin design routes
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/rsvp", rsvpRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/vouchers", voucherRoutes);
app.use("/api/promos", promoRoutes);

app.get("/test", (req, res) => {
  res.send("API is working");
});

// Serve React Frontend
// const buildPath = path.join(__dirname, "../frontend/dist");

// app.use(express.static(buildPath));
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(buildPath, "index.html"));
// });

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
