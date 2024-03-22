const express = require('express');
const router = express.Router();
const passport = require('passport');

// Ruta para obtener el usuario actual
router.get('/current', (req, res) => {
    // Aquí puedes acceder al usuario actual a través de req.user si se ha autenticado correctamente
    // Devuelve el usuario o un mensaje de error según corresponda
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ error: 'Usuario no autenticado' });
    }
});

module.exports = router;