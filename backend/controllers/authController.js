const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");

// Set these directly (assumes .env is already loaded in server.js)
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = parseInt(process.env.BCRYPT_SALT) || 10;
const googleClientId = process.env.CLIENT_ID;

const client = new OAuth2Client(googleClientId);

// ===== REGISTER =====
const register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const user = await User.create({ name, email, phone, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(422).json({ message: "Error creating user", error });
  }
};

// ===== LOGIN =====
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not registered." });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(422).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // ✅ Force HTTPS only, good for production and mobile
      sameSite: "None", // ✅ Required for cross-site cookies (mobile-friendly)
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.json({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      _id: user._id,
      token // <--- Add this!
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

// ===== GOOGLE LOGIN =====
const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: googleClientId,
    });

    const payload = ticket.getPayload();
    const { name, email, sub: googleId } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        password: null,
      });
    }

    const jwtToken = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1h" });

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 60 * 60 * 1000,
    });

    res.json({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      _id: user._id,
      // token, // <-- JWT
      token: jwtToken, 
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(401).json({ message: "Google login failed", error });
  }
};

// ===== PROFILE =====
const getProfile = (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { name, email, _id, isAdmin } = user;
      res.json({ name, email, _id, isAdmin });
    } catch (error) {
      res.status(500).json({ message: "Error fetching profile", error });
    }
  });
};

// ===== LOGOUT =====
const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  }).json({ success: true });
};

module.exports = {
  register,
  login,
  googleLogin,
  getProfile,
  logout,
};
