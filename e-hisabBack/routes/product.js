const express = require("express");
const createProducts = require("../controllers/products/creatProducts");
const getAllproducts = require("../controllers/products/getAllProduct");
const getProductDetails=require('../controllers/products/getProductDetails')
const addToCart=require('../controllers/cart/addToCart');
const getProductByBrand = require("../controllers/products/getProductByBrand");
const orderedData = require("../controllers/products/userOrderedProducts");
const productRouter = express.Router();
productRouter.post("/create-product", createProducts);
productRouter.post("/create-ordered-data", orderedData);
productRouter.get("/all-products", getAllproducts);
productRouter.get("/product-brand/search",getProductByBrand ); 


module.exports = productRouter;
