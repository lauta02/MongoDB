const express = require('express');
const router = express.Router();
const ProductManager = require('../dao/models/ProductManager');

const productManager = new ProductManager();

router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const products = await productManager.getProducts(limit, page, sort, query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    const product = await productManager.getProductById(productId);
    res.json({ product });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put('/:pid', async (req, res) => {
  const productId = req.params.pid;
  const updatedFields = req.body;
  try {
    await productManager.updateProduct(productId, updatedFields);
    res.json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete('/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    await productManager.deleteProduct(productId);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const newProduct = req.body;
  try {
    const product = await productManager.addProduct(newProduct);
    res.json({ product, message: 'Producto agregado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;