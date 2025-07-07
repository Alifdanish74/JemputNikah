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

const Order = require("./models/Order");

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
// app.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
//   res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
//   res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });

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
app.use("/weddingcard", orderRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/rsvp", rsvpRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/vouchers", voucherRoutes);
app.use("/api/promos", promoRoutes);

app.get("/test", (req, res) => {
  res.send("API is working");
});

const FRONTEND_URL = "https://www.jemputkahwin.com.my";

// ✅ Serve Open Graph metadata for WhatsApp previews **before React serves index.html**
app.get("/weddingcard/:hashtag/:orderNumber", async (req, res) => {
  try {
    const { orderNumber } = req.params;

    // Fetch order details from database
    const order = await Order.findOne({ orderNumber }).populate("weddingCardId");

    if (!order) {
      return res.status(404).send("Order not found");
    }

    // Construct Open Graph metadata dynamically
    const metadata = {
      title: `${order.weddingCardId.tajukMajlis} | ${order.weddingCardId.hashtag}`,
      description: "Klik pautan untuk lihat jemputan",
      image: order.weddingCardId?.designImageUrl || `${FRONTEND_URL}/assets/phone-mockup-removebg-CFus9G_1.png`,
      url: `${FRONTEND_URL}/weddingcard/${order.weddingCardId.hashtag}/${orderNumber}`,
    };

    // Serve Open Graph metadata as an HTML response
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${metadata.title}</title>
        
        <!-- Open Graph Meta Tags -->
        <meta property="og:title" content="${metadata.title}" />
        <meta property="og:description" content="${metadata.description}" />
        <meta property="og:image" content="${metadata.image}" />
        <meta property="og:url" content="${metadata.url}" />
        <meta property="og:type" content="website" />

        <!-- Twitter Cards -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${metadata.title}" />
        <meta name="twitter:description" content="${metadata.description}" />
        <meta name="twitter:image" content="${metadata.image}" />

        <!-- Other meta -->
        <meta name="robots" content="index, follow">
    </head>
    <body>
        <h1>${metadata.title}</h1>
        <p>${metadata.description}</p>
        <script>
            window.location.href = "${metadata.url}"; // ✅ Redirect to Frontend
        </script>
    </body>
    </html>
    `;

    res.send(htmlContent);
  } catch (error) {
    console.error("Error fetching order metadata:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ Serve React frontend for all other routes **only if Open Graph metadata was not needed**
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
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
