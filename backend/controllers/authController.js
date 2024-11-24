const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Environment variables
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = parseInt(process.env.BCRYPT_SALT) || 10;

// Register user
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
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
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1hr" });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
      }).json({
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
  getProfile,
  logout,
};
