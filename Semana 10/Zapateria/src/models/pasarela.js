const {Schema} = require('mongoose');

const pasarelaSchema = new Schema({
    idPago: String,
    idCollector: String,
    clienteId: String
});
module.exports = pasarelaSchema