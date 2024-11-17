const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
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
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
// app.use(cors({ credentials: true, origin: "https://jemput-nikah-av8w.vercel.app" }));

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


app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
