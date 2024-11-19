const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const authRoutes = require("./routes/auth");
const weddingCardRoutes = require("./routes/weddingCard");
const adminRoutes = require("./routes/design");
const orderRoutes = require("./routes/order");
const rsvpRoutes = require("./routes/rsvp");
const songRoutes = require("./routes/song");
const wishlistRoutes = require("./routes/wishlist");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
// Dynamic CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://jemput-kahwin.vercel.app/" // Deployed frontend on Vercel
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

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
