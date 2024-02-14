const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : undefined;
    const products = await Product.find().limit(limit);
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Producto no encontrado');
    res.json({ product });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put('/:pid', async (req, res) => {
  const productId = req.params.pid;
  const updatedFields = req.body;
  try {
    const product = await Product.findByIdAndUpdate(productId, updatedFields, { new: true });
    if (!product) throw new Error('Producto no encontrado');
    res.json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete('/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) throw new Error('Producto no encontrado');
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const newProduct = req.body;
  try {
    const product = await Product.create(newProduct);
    res.json({ product, message: 'Producto agregado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;