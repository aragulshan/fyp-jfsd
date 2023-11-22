const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: String },
    role: { type: String, enum: ["customer", "seller", "admin"], default: "customer" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
