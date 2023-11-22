const express = require("express");
const router = express.Router();

router.use("/product", require("./product"));
router.use("/category", require("./category"));
router.use("/cart", require("./cart"))

module.exports = router;
