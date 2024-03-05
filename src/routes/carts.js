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
    // Implementar la eliminación de un producto del carrito
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  const { products } = req.body;
  try {
    // Implementar la actualización de los productos del carrito
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:cid/products/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;
  try {
    // Implementar la actualización de la cantidad de un producto en el carrito
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    // Implementar la eliminación de todos los productos del carrito
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
