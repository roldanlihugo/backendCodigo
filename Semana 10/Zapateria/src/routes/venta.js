const {Router} = require('express');
const ventaController = require('../controllers/venta');

var venta_router = Router();
venta_router.post('/crearPreferencia', ventaController.preferenciaMercadoPago);
venta_router.post('/notificaciones', ventaController.recibirNotificaciones);

module.exports = venta_router;