const Category = require('../../models/category');

const getCategoryByName = async (req, res) => {
  try {
    const categoryName = req.query.q;
    
    const categories = await Category.findOne({ categoryName  });

    if (!categories) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getCategoryByName };
