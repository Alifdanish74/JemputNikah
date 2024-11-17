const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const register = async (req, res) => {
  const { email, password, phone, name, isAdmin } = req.body;

  // Basic input validation
  if (!email || !password || !phone || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  try {
    const existingUser = await User.findOne({ email });
    const existingPhone = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Hash the password and create a new user
    
    const user = new User({ email, password, phone, name, isAdmin });
    await user.save();

    // Generate a token for the user
    const token = jwt.sign(
      { email: user.email, id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send user data and token back to the client, excluding password
    res.status(201).json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        isAdmin: user.isAdmin,
      },
      token,
    });

  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Error creating user account", error });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const passwordOk = bcrypt.compareSync(password, user.password);
      if (passwordOk) {
        jwt.sign(
          { email: user.email, id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "1hr" },
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production", // Secure only in production
              sameSite: "None", // Cross-origin cookie sharing
              maxAge: 24 * 60 * 60 * 1000, // 1 day
            }).json(user);
            // res.cookie("token", token).json(user);
          }
        );
      } else {
        return res.status(422).json({ message: "Password Incorrect" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to login" });
    console.log(error);
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json(null);
  }

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.json(null);
    }

    try {
      const user = await User.findById(userData.id).select("-password"); // Exclude password at the query level
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        phone: user.phone,
      });
    } catch (error) {
      return res.status(500).json({ message: "Error fetching profile", error });
    }
  });
};

// Controller to get user profile
// const getProfile = async (req, res) => {
//   try {
//     // req.user is set by authMiddleware
//     const user = req.user;

//     if (!user) {
//       // return res.status(404).json({ message: 'User not found' });
//       res.json(null);
//     }

//     // Respond with the user's profile
//     res.json({
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       phone: user.phone// If you have user roles
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching profile', error });
//   }
// };

// LOGOUT
const logout = (req, res) => {
  res.cookie("token", "").json(true);
};

module.exports = { register, login, getProfile, logout };
