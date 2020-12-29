const {Router} = require('express');
const ProductoController = require('../controllers/producto');

// Otra forma de importar, mas detalladamente
// const {crearProducto} = require('../controllers/producto')
var producto_router = Router();

producto_router.post('/producto',ProductoController.crearProducto);
producto_router.get('/producto', ProductoController.listarProducto);
// producto_router.post('/producto',crearProducto);

module.exports = producto_router;