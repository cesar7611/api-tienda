const express = require('express');
const router = express.Router();
const { agregarAlCarrito } = require('../controLLers/cartController');
const verificarToken = require('../middlewares/authMiddleware');

// Ruta protegida con el guardia (token) para añadir productos
router.post('/add', verificarToken, agregarAlCarrito);

module.exports = router;
