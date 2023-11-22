const Product = require("../../models/products");

const getProductByBrand = async (req, res) => {
  // const productId = req.params.productId;
  const  brand  = req.query.q; // for this use this url: http://localhost:8080/api/product/product-brand/Apple
//   const brand = req.query.brand; if use this use this url http://localhost:8080/api/product/product-brand/?brand=Apple

  // console.log(productId);

  try {
    const products = await Product.find({ brand: new RegExp(brand, "i") });

    if (products.length > 0) {
      res.json({ products });
    } else {
      res.status(404).json({ error: "No products found for the given brand" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = getProductByBrand;
