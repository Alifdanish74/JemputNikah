const express = require("express");
const {
  register,
  login,
  getProfile,
  logout,
  googleLogin,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);

router.get("/profile", authMiddleware, getProfile);
router.post("/logout", logout);

module.exports = router;
