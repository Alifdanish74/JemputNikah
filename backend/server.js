const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/auth");
const weddingCardRoutes = require("./routes/weddingCard");
const rsvpRoutes = require("./routes/rsvp");
const adminRoutes = require("./routes/design");
const orderRoutes = require("./routes/order");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

//   Connect to MongoDB by mongoose
mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/wedding-cards", weddingCardRoutes);
app.use("/api/rsvp", rsvpRoutes);
// Use the admin design routes
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const User = require("./models/User");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// dotenv.config();

// const app = express(); //THIS SHOULD BE FIRST CALLED
// const bcryptSalt = bcrypt.genSaltSync(10);
// const jwtSecret = "eyJhbGci";

// app.use(express.json()); //to able to pass json
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Frontend URL
//     credentials: true, // Allow cookies
//   })
// );

// //   Connect to MongoDB by mongoose
// mongoose
//   .connect(process.env.MONGODB_URL, {})
//   .then(() => {
//     console.log("MongoDB connected");
//   })
//   .catch((err) => console.log(err));

// const PORT = process.env.PORT;

// app.get("/test", (req, res) => {
//   res.json("test okey");
// });

// // Create a new user
// app.post("/register", async (req, res) => {
//   const { name, phone, email, password } = req.body;

//   try {
//     const userData = await User.create({
//       name,
//       phone,
//       email,
//       password: bcrypt.hashSync(password, bcryptSalt),
//     });
//     res.json(userData);
//   } catch (error) {
//     res.status(422).json(error);
//   }
// });

// // Login a user
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user) {
//       const validPassword = bcrypt.compareSync(password, user.password);

//       if (!validPassword) {
//         return res.status(401).json({ message: "Invalid password" });
//       }
//       if (validPassword) {
//         // jwt.sign(
//         //   { email: user.email, id: user._id },
//         //   jwtSecret,
//         //   { expiresIn: "1h" },
//         //   (err, token) => {
//         //     if (err) {
//         //       return res
//         //         .status(500)
//         //         .json({ message: "Error generating token" });
//         //     }
//         //     res.cookies("token", token).json(user);
//         //   }
//         // );
//         jwt.sign(
//           { email: user.email, id: user._id },
//           jwtSecret,
//           {},
//           (err, token) => {
//             if (err) throw err;
//             res.cookie("token", token).json(user);
//           }
//         );
//       }
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// --------------------------------------------------------
// if (userDoc) {
//   const passwordOk = bcrypt.compareSync(password, userDoc.password);
//   if (passwordOk) {
//     jwt.sign(
//       { email: userDoc.email, id: userDoc._id },
//       jwtSecret,
//       {},
//       (err, token) => {
//         if (err) throw err;
//         res.cookie("token", token).json(userDoc);
//       }
//     );
//   } else {
//     res.status(422).json("password INCORRECT");
//   }
// } else {
//   res.json("user not found");
// }
// --------------------------------------------------------

// // getUserInfo
// // app.get("/profile", (req, res) => {
// //   const { token } = req.cookies;

// //   if (token) {
// //     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
// //       if (err) throw err;
// //       const { name, email, _id } = await User.findById(userData.id);
// //       res.json({ name, email, _id });
// //     });
// //   } else {
// //     res.json(null);
// //   }
// // });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
