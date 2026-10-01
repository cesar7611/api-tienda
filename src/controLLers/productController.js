const pool = require('../config/db');

// 1. Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const [productos] = await pool.query('SELECT * FROM productos');
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos.' });
  }
};

// 2. Obtener un solo producto por su ID
const obtenerProductoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const [productos] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    if (productos.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    res.json(productos[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto.' });
  }
};

// 3. Crear un nuevo producto
const crearProducto = async (req, res) => {
  const { nombre, descripcion, precio, stock, imagen_url } = req.body;

  // Validación básica
  if (!nombre || !precio) {
    return res.status(400).json({ error: 'El nombre y el precio son obligatorios.' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, stock, imagen_url) VALUES (?, ?, ?, ?, ?)',
      [nombre, descripcion, precio, stock || 0, imagen_url]
    );

    res.status(201).json({
      mensaje: 'Producto creado con éxito.',
      productoId: result.insertId
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor al crear el producto.' });
  }
};

// 4. Actualizar producto
const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, imagen_url } = req.body;
    try {
        await pool.query(
            'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen_url = ? WHERE id = ?',
            [nombre, descripcion, precio, stock, imagen_url, id]
        );
        res.json({ mensaje: 'Producto actualizado con éxito.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto.' });
    }
};

// 5. Eliminar un producto
const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'El producto no existe.' });
        }
        
        res.json({ mensaje: 'Producto eliminado con éxito.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el producto.' });
    }
};

// EXPORTACIÓN DE TODAS LAS FUNCIONES (Reemplaza si tenías un module.exports anterior)
module.exports = { obtenerProductos, obtenerProductoPorId, crearProducto, actualizarProducto, eliminarProducto };

