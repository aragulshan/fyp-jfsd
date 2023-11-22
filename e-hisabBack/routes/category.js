const express = require("express");
const createCategory = require("../controllers/category/createCategory");
const { getCategoryByName } = require("../controllers/category/getCategoryByName");

const categoryRouter = express.Router();
categoryRouter.post("/create-category", createCategory);
categoryRouter.get("/get-category/", getCategoryByName);

module.exports = categoryRouter;
