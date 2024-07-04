const express = require('express');
const productController = require('../controllers/products.controller');
const cartController = require('../controllers/carts.controller');
const { authToken, authTokenResetPassword } = require('../utils/jwt');
const RouterClass = require('./RouterClass');

class ViewRouter extends RouterClass {
    init() {
        const router = express.Router();

        router.get('/realtime-products', authToken, async (req, res) => {
            res.render('realtime-products', {});
        });

        router.get('/chat', authToken, async (req, res) => {
            res.render('chat-room', {});
        });

        router.get('/products', authToken, async (req, res) => {
            try {
                const result = await productController.getAllProducts(req, res);
                const { products, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink, session } = result;
                res.render('product-list', {
                    status: 'success',
                    payload: products,
                    totalPages,
                    prevPage,
                    nextPage,
                    page,
                    hasPrevPage,
                    hasNextPage,
                    prevLink,
                    nextLink,
                    session
                });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.get('/cart/:cid', authToken, async (req, res) => {
            try {
                const cartDetails = await cartController.getCartById(req.params.cid);
                res.render('cart-details', { status: 'success', payload: cartDetails });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.get('/login', async (req, res) => {
            res.render('login-form', {});
        });

        router.get('/recover-password', async (req, res) => {
            res.render('recover-password-form', {});
        });

        router.get('/update-password/:token', authTokenResetPassword, async (req, res) => {
            res.render('update-password-form', { token: req.params.token });
        });

        router.get('/register', async (req, res) => {
            res.render('register-form', {});
        });

        router.get('/multer', authToken, async (req, res) => {
            res.render('multer-page', { user: req.user.user });
        });

        this.router = router;
    }
}

module.exports = ViewRouter;