-- 1. Tabla de usuarios (Para registro y login)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRYMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de productos (CVatalogo de la tienda)
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRYMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    imagen_url VARCHAR(255),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla de carrito (Cabecera asociada a un usuario);
CREATE TABLE IF NOT EXISTS carrito_productos (
    id INT AUTO_INCREMENT PRYMARY KEY,
    usuario_id INT UNIQUE NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- 4. Detalle del carrito (Relación de productos y cantidades dentro del carrito)
CREATE TABLE IF NOT EXISTS carrito_productos (
    id INT AUTO_INCREMENT PRYMARY KEY,
    carrito_id INT NOT NULL,
    productos_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    FOREIGN KEY (carrito_id) REFERENCES carrito(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES producto(id) ON DELETE CASCADE,
)