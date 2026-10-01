const express = require('express');
require('dotenv').config();
require('./config/db');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');


const app = express();
app.use(express.json()); // Middleware para entender formato JSON

// Vincular rutas a la API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Ruta raíz base
app.get('/', (req, res) => {
  res.json({ mensaje: '¡Bienvenido a la API de la Tienda!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
