const mongoose = require('mongoose');
const productSchema = require('../models/Product');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  code: String,
  stock: Number
});

module.exports = mongoose.model('Product', productSchema);