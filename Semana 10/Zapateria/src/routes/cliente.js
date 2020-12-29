const {Router} = require('express');
const clienteController = require('../controllers/cliente');

var cliente_router = Router();
cliente_router.post('/cliente', clienteController.crearCliente);
cliente_router.get('/cliente/:dni', clienteController.buscarClientePorDni);

module.exports = cliente_router