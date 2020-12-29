const Schema = require('mongoose').Schema;

var productoSchema = new Schema({
    productoPrecio: {
        type: Number,
        min: 0,
        required: true
    },
    productoTitulo:{
        type: String,
        unique: true,
        required: true
    },
    productoCantidad: {
        type: Number,
        required: true
    },
    productoMoneda: {
        type: String,
        maxlength: 3,
        required: true
    },
    productoImagen : {
        type: String
    },
    productoDescripcion: {
        type: String,
        maxlength: 100,
        minlength: 30,
        required: true
    }
}, { timestamps: true });

module.exports = {
    productoSchema
}