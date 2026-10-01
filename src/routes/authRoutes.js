const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controLLers/authController.js');

router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);

module.exports = router;
