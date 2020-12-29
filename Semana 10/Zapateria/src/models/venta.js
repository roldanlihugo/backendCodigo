const Schema = require('mongoose').Schema;

const productosSchema = new Schema({
    ventaProductoId: {
        type: String,
        required: true
    },
    ventaProductoCantidad: {
        type: Number,
        required:true
    }
})

const ventaSchema = new Schema({
    ventaFecha: {
        type: Date,
        required: true
    },
    ventaImporteTotal: {
        type: Number,
        required: true
    },
    ventaProductos: [
        productosSchema
    ],
    ventaClienteId: {
        type: String,
        required: true
    },
    ventaImpuesto: {
        type: Number,
        required: true
    },
    ventaDataId: {
        type: String,
        required: true
    },
    ventaTipo: {
        type: String,
        required: true
    }
},{timestamps:true});

module.exports= {ventaSchema}