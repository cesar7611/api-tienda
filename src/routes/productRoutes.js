const express = require('express');
const router = express.Router();
const { obtenerProductos, obtenerProductoPorId, crearProducto, actualizarProducto, eliminarProducto } = require('../controLLers/productController');

// Rutas de la API para productos
router.get('/', obtenerProductos);      
router.get('/:id', obtenerProductoPorId);
router.post('/', crearProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);


module.exports = router;
