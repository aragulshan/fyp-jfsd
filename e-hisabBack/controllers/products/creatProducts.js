const Product = require("../../models/products");

const createProducts = async (req, res) => {
  try {
    const { productDescription, brand, price, category, imageUrl,stock } =
      req.body;
    const product = new Product({
      brand,
      productDescription,
      price,
      category,
      imageUrl,
      stock
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message || "Something went wrong" });
  }
};

module.exports = createProducts;
