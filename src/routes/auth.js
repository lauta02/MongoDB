const express = require('express');
const passport = require('../config/passport');
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
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        await userManager.createUser({ name, email, password: hashedPassword });
        res.redirect('/login');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;

