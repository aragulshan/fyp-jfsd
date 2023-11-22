const { Schema, model } = require("mongoose");
const productSchema = new Schema({
  brand: { type: String },
  price: { type: Number },
  productDescription: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "category" },
  imageUrl: { type: String },
  stock:{type: Number}
});
module.exports = model("product", productSchema);
