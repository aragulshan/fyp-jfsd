const express = require('express');
const router = express.Router();
const Cart = require('../../models/cart/index');

const getCartItemsByUserId = async (userId) => {
    try {
      const userCart = await Cart.findOne({ userId }).populate('items.productId');
      return userCart ? userCart.items : [];
    } catch (error) {
      throw error;
    }
  };

const getCartItems = async (req, res) => {
    const userId = req.params.userId;

    try {
        const cartItems = await getCartItemsByUserId(userId);
        res.json({ cartItems });
    } catch (error) {
        console.error('Error while getting cart items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = getCartItems ;