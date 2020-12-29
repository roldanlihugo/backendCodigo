const {productoSchema} = require('../models/producto');
const {clienteSchema} = require('../models/cliente');
const {ventaSchema} = require('../models/venta'); // destructuracion
const pasarelaSchema = require('../models/pasarela');

const {model} = require('mongoose');

const Producto = model('productoCollection', productoSchema);
const Cliente = model('clienteCollection', clienteSchema);
const Venta = model('ventaCollection', ventaSchema);
const Pasarela = model('pasarelaCollection', pasarelaSchema);

module.exports= {
    Producto,
    Cliente,
    Venta,
    Pasarela
}