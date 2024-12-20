const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");

dotenv.config();

// Environment variables
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = parseInt(process.env.BCRYPT_SALT) || 10;
const googleClientId = process.env.CLIENT_ID;

const client = new OAuth2Client(googleClientId);

// Register user
const register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      phone,
      password,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(422).json({ message: "Error creating user", error });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not registered." });
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1hr" });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Use HTTPS in production
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
        })
        .json({
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          _id: user._id,
        });
    } else {
      res.status(422).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

// Google Login
const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: googleClientId, // Your Google Client ID
    });

    const payload = ticket.getPayload();
    // console.log("Google Token Payload:", payload); // Log the payload for debugging

    const { name, email, sub: googleId } = payload;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Register a new user if not found
      user = await User.create({
        name,
        email,
        googleId,
        password: null, // No password for Google-authenticated users
      });
    }

    // Generate JWT token
    const jwtToken = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: "1hr",
    });

    res
      .cookie("token", jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .json({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id,
      });
  } catch (error) {
    console.error("Google sign-in error:", error);
    res.status(401).json({ message: "Google sign-in failed", error });
  }
};

// Get profile
const getProfile = (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    try {
      const { name, email, _id, isAdmin } = await User.findById(userData.id);
      res.json({ name, email, _id, isAdmin });
    } catch (error) {
      res.status(500).json({ message: "Error fetching profile", error });
    }
  });
};

// Logout user
const logout = (req, res) => {
  res.cookie("token", "", { httpOnly: true }).json({ success: true });
};

module.exports = {
  register,
  login,
  googleLogin,
  getProfile,
  logout,
  googleLogin,
};
