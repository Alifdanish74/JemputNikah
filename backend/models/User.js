const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  }, // Required if not Google-authenticated
  name: { type: String, required: true },
  phone: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },
  isAdmin: { type: Boolean, default: false }, // Admin field
  googleId: { type: String, unique: true, sparse: true }, // Google ID for Google-authenticated users
});

// Pre-save hook to hash password before saving it in the database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    // Skip hashing if password is not modified or is null
    return next();
  }

  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (err) {
    next(err); // Pass error to the next middleware
  }
});

// Method to compare entered password with the stored hashed password
UserSchema.methods.comparePassword = async function (password) {
  if (!this.password) return false; // No password to compare for Google-authenticated users
  return await bcrypt.compare(password, this.password);
};

// Method to compare entered password with the stored hashed password
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
