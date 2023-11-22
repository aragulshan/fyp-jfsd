const Product = require("../../models/products");
const Category = require("../../models/category");

const getAllproducts = async (req, res) => {
  try {
    const brand = req.query.q;
    const categoryName = req.query.category;

    console.log('Received query parameters:', { brand, categoryName });

    let match = {};

    if (brand) {
      match.brand = new RegExp(brand, "i");
    }

    if (categoryName) {
      const category = await Category.findOne({ categoryName: new RegExp(categoryName, "i") });
      if (category) {
        match.category = category._id;
      } else {
        // No category found with the specified name
        match.category = null;
      }
    }

    console.log('Generated match object:', match);

    const allproducts = await Product.find(match).populate("category");
    res.status(200).send({ allproducts });
  } catch (err) {
    res.status(404).json({ message: err.message || "Products not found" });
  }
};

module.exports = getAllproducts;

