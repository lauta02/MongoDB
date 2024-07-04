const mongoose = require('mongoose');

const CART_COLLECTION = 'carts';

const CartSchema = new mongoose.Schema({
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }]
});

const Cart = mongoose.model(CART_COLLECTION, CartSchema);

module.exports = Cart;