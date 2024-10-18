const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true},
  isAdmin: { type: Boolean, default: false },   // New admin field
});

// Pre-save hook to hash password before saving it in the database
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password is modified or new
  this.password = await bcrypt.hash(this.password, 12); // Hash the password
  next();
});

// Method to compare entered password with the stored hashed password
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
