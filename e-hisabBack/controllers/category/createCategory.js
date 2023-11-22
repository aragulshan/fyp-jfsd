const Category = require("../../models/category");

const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const category = new Category({
      categoryName,
    });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message || "Something went wrong" });
  }
};

module.exports = createCategory;
