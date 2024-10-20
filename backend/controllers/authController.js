const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password, phone, name, isAdmin } = req.body;
  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = new User({ email, password, phone, name, isAdmin });
  await user.save();
  res.json(user);
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
          {expiresIn: '1hr'},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(user);
          }
        );
      } else {
        res.status(422).json("password INCORRECT");
      }
    } else {
      res.json("user not found");
    }
  } catch (error) {
    res.status(500).json("unable to login");
    console.log(error);
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  // console.log("Token received:", token);  // Log the token for debugging

  if (token) {
    jwt.verify(token,  process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) {
        console.error("Token verification failed:", err);
        return res.json(null);  // Handle token verification failure
      }
      const { name, email, _id, isAdmin } = await User.findById(userData.id);
      res.json({ name, email, _id, isAdmin });
    });
  } else {
    res.json(null);  // No token case
  }
};

// LOGOUT
const logout = (req, res) => {
  res.cookie("token", "").json(true);
};


module.exports = { register, login, getProfile, logout };
