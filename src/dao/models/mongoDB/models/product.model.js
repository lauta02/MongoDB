const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PRODUCT_COLLECTION = 'products';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    details: {
        type: String,
        default: ''
    },
    images: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        set: value => parseFloat(value).toFixed(2)
    },
    quantity: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    productCode: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    owner: {
        type: String,
        ref: 'users',
        default: 'admin'
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

ProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model(PRODUCT_COLLECTION, ProductSchema);

module.exports = Product;