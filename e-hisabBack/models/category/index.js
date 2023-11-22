const { Schema, model } = require("mongoose");
const categorySchema = new Schema({
  categoryName: { type: String },
});

module.exports = model("category", categorySchema);
