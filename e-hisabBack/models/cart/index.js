const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity can not be less than 1'],
      default: 1
    }
   
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Cart = mongoose.model('Cart', cartSchema);


module.exports =Cart