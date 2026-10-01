const pool = require('../config/db');

const agregarAlCarrito = async (req, res) => {
  const usuario_id = req.usuario.id; 
  const { producto_id, cantidad } = req.body;

  if (!producto_id || !cantidad) {
    return res.status(400).json({ error: 'El ID del producto y la cantidad son obligatorios.' });
  }

  try {
    let [carrito] = await pool.query('SELECT id FROM carrito WHERE usuario_id = ?', [usuario_id]);
    let carrito_id;

    if (carrito.length === 0) {
      const [nuevoCarrito] = await pool.query('INSERT INTO carrito (usuario_id) VALUES (?)', [usuario_id]);
      carrito_id = nuevoCarrito.insertId;
    } else {
      carrito_id = carrito[0].id; // Ajuste para leer correctamente el objeto de MySQL
    }

    const [existente] = await pool.query(
      'SELECT id, cantidad FROM carrito_productos WHERE carrito_id = ? AND producto_id = ?',
      [carrito_id, producto_id]
    );

    if (existente.length > 0) {
      const nuevaCantidad = existente[0].cantidad + cantidad;
      await pool.query('UPDATE carrito_productos SET cantidad = ? WHERE id = ?', [nuevaCantidad, existente[0].id]);
    } else {
      await pool.query(
        'INSERT INTO carrito_productos (carrito_id, producto_id, cantidad) VALUES (?, ?, ?)',
        [carrito_id, producto_id, cantidad]
      );
    }

    res.status(201).json({ mensaje: '¡Producto añadido al carrito con éxito!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor al gestionar el carrito.' });
  }
};

module.exports = { agregarAlCarrito };
