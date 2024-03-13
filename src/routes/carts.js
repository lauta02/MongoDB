const express = require('express');
const router = express.Router();
const CartManager = require('../dao/models/CartManager');
const ProductManager = require('../dao/models/ProductManager');

const cartManager = new CartManager();
const productManager = new ProductManager();

router.post('/', async (req, res) => {
  try {
    await cartManager.addCart();
    res.json({ message: 'Carrito creado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await cartManager.getCartById(cartId);
    res.json({ products: cart.products });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;
  try {
    await cartManager.addProductToCart(cartId, productId, quantity);
    res.json({ message: 'Producto agregado al carrito correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:cid/products/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  const { products } = req.body;
  try {
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:cid/products/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;
  try {
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
