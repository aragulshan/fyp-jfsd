const Product = require("../../models/products");

const getProductDetails = async (req, res) => {
    const productId = req.params.productId;
    console.log(productId);

    try {
      const product = await Product.findById(productId);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  module.exports = getProductDetails;