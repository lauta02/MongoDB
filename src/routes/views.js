const express = require('express');
const router = express.Router();
const ProductManager = require('../../dao/models/ProductManager'); 

const productManager = new ProductManager('productos.json');

router.get('/', (req, res) => {
  res.render('home'); 
});

router.get('/realtimeproducts', (req, res) => {
  const products = productManager.getProducts();
  res.render('realTimeProducts', { products });
});

module.exports = router;