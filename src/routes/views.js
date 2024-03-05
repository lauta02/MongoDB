const express = require('express');
const router = express.Router();
const ProductManager = require('../dao/models/ProductManager');

const productManager = new ProductManager();

router.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : undefined;
    const page = req.query.page ? parseInt(req.query.page, 10) : undefined;
    const sort = req.query.sort || undefined;
    const query = req.query.query || undefined;

    const products = await productManager.getProducts(limit, page, sort, query);
    res.render('products', { products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

