const express = require('express');
const router = express.Router();
const ProductManager = require('../dao/models/ProductManager');
const productManager = new ProductManager();
const Product = require('../dao/models/models/Products');

router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const products = await productManager.getProducts(limit, page, sort, query);
    res.json(products);
    const skip = (page - 1) * limit;
    let filter = {};

    if (query) {
      filter = { $or: [{ category: query }, { availability: query }] };
    }

    let sortOption = {};
    if (sort) {
      sortOption = { price: sort === 'asc' ? 1 : -1 };
    }

    const products = await Product.find(filter)
      .limit(parseInt(limit))
      .skip(skip)
      .sort(sortOption);

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    const prevLink = hasPrevPage ? `/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null;
    const nextLink = hasNextPage ? `/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null;

    res.json({
      status: 'success',
      payload: products,
      totalPages,
      prevPage: hasPrevPage ? page - 1 : null,
      nextPage: hasNextPage ? page + 1 : null,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    const product = await productManager.getProductById(productId);
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
    await productManager.updateProduct(productId, updatedFields);
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
    await productManager.deleteProduct(productId);
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
    const product = await productManager.addProduct(newProduct);
    const product = await Product.create(newProduct);
    res.json({ product, message: 'Producto agregado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;