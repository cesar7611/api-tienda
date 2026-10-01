const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // ¡Asegúrate de tener esta línea arriba!

const registrarUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }
  try {
    const [existingUser] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, hashedPassword]
    );
    res.status(201).json({ mensaje: 'Usuario registrado con éxito.', usuarioId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno al registrar.' });
  }
};

// 🔑 ESTA ES LA FUNCIÓN QUE FALTA O SE MALA IMPORTÓ:
const loginUsuario = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'El correo y la contraseña son obligatorios.' });
  }
  try {
    const [usuarios] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (usuarios.length === 0) {
      return res.status(400).json({ error: 'Credenciales incorrectas.' });
    }
    const usuario = usuarios[0]; // Extraemos el primer usuario encontrado

    const passwordCorrecto = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecto) {
      return res.status(400).json({ error: 'Credenciales incorrectas.' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      mensaje: '¡Inicio de sesión exitoso!',
      token,
      usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno al iniciar sesión.' });
  }
};

// ¡MUY IMPORTANTE EXPORTAR AMBAS!
module.exports = { registrarUsuario, loginUsuario };
