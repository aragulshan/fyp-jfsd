const mongoose = require("mongoose");

const userOrderedData = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    contact: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    state: { type: String },
    streetAddress: { type: String },
  },
  { timestamps: true }
);

const OrderedProducts = mongoose.model("OrderedProducts", userOrderedData);

module.exports = OrderedProducts;
