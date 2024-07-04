const express = require('express');
const ProductController = require('../controllers/products.controller');
const AuthMiddleware = require('../middlewares/auth');
const ErrorHandlerMiddleware = require('../middlewares/errors');

const productController = new ProductController();
const router = express.Router();

router.get('/', AuthMiddleware(['PUBLIC']), async (req, res) => {
    try {
        const products = await productController.getAllProducts(req, res);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:pid', AuthMiddleware(['PUBLIC']), async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productController.getProductById(productId, req, res);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', AuthMiddleware(['ADMIN', 'PREMIUM']), async (req, res) => {
    try {
        const newProduct = req.body;
        const createdProduct = await productController.createProduct(newProduct, req, res);
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:pid', AuthMiddleware(['ADMIN', 'PREMIUM']), async (req, res) => {
    try {
        const productId = req.params.pid;
        const updatedProduct = await productController.updateProduct(productId, req.body, req, res);
        if (!updatedProduct) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.status(200).json(updatedProduct);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:pid', AuthMiddleware(['ADMIN', 'PREMIUM']), async (req, res) => {
    try {
        const productId = req.params.pid;
        const deletedProduct = await productController.deleteProduct(productId, req, res);
        if (!deletedProduct) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.use(ErrorHandlerMiddleware);

module.exports = router;