const mongoose = require("mongoose");
// Define User Schema
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  secret: {
    type: String,
    required: true,
  },
  secret32: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  login_info: {
    type: Array,
    default: [],
  },
});

// Create User model
const User = mongoose.model("User", userSchema);

module.exports = User;
