const mongoose=require('mongoose');

const otpSchema = new mongoose.Schema(
  {
    email:String,
    otp: String,
    createdAt: Date,
    expiresAt: Date,
    used: Boolean,
  }
  );
  
  module.exports = mongoose.model("Otp", otpSchema);