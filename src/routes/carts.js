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
const Cart = require('../dao/models/models/Carts');
const Product = require('../dao/models/models/Products');

router.post('/', async (req, res) => {
  try {
    const newCart = await Cart.create({ products: [] }); 
    const newCart = await Cart.create({}); 
    res.json({ message: 'Carrito creado correctamente', cart: newCart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await cartManager.getCartById(cartId);
    const cart = await Cart.findById(cartId).populate({
      path: 'products',
      model: 'Product'
    });
    if (!cart) throw new Error('Carrito no encontrado');
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
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');

    const product = await Product.findById(productId);
    if (!product) throw new Error('Producto no encontrado');

    cart.products.push(productId);
    await cart.save();
    res.json({ message: 'Producto agregado al carrito correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:cid/products/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');
    cart.products.pull(productId);
    await cart.save();
    res.json({ message: 'Producto eliminado del carrito correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  const { products } = req.body;
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');
    cart.products = products;
    await cart.save();
    res.json({ message: 'Carrito actualizado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:cid/products/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');
    const productIndex = cart.products.findIndex(prod => prod._id == productId);
    if (productIndex === -1) throw new Error('Producto no encontrado en el carrito');
    cart.products[productIndex].quantity = quantity;
    await cart.save();
    res.json({ message: 'Cantidad del producto actualizada correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');
    cart.products = [];
    await cart.save();
    res.json({ message: 'Productos eliminados del carrito correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
module.exports = router;
