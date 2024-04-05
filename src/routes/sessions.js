const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/current', (req, res) => {
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ error: 'Usuario no autenticado' });
    }
});

module.exports = router;