const express = require('express');
const passport = require('passport'); 
const UserManager = require('../dao/models/UserManager');

const router = express.Router();
const userManager = new UserManager();

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/products',
    failureRedirect: '/login',
    failureFlash: true
}));


router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        const newUser = await userManager.createUser({ first_name, last_name, email, password });
        req.login(newUser, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al iniciar sesión' });
            }
            return res.redirect('/products');
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;

