const mongoose = require('mongoose');

const fonoClienteSchema = new mongoose.Schema({
    fono_area: String,
    fono_numero: {
        type: String,
        maxlength: 15,
        minlength: 6
    }
});
const direccionSchema = new mongoose.Schema({
    zip_code: String,
    street_name: String,
    street_number: Number
},{_id:false});
// para ver todas las opciones que puedo configurar en mi Schema - Collection => https://mongoosejs.com/docs/guide.html#options

const clienteSchema = new mongoose.Schema({
    cliNom: String,
    cliApe: {
        type: String,
    },
    cliEmail: {
        type: String,
        unique: true
    },
    cliFono: [
        fonoClienteSchema
    ],
    cliDni: {
        type : String,
        maxlength: 10,
        minlength: 8,
        unique: true
    },
    cliAddress: direccionSchema
},{
    timestamps: true, // esto va a crear los timestamps por defecto osea el createdAt y el updatedAt pero si quisiese modificar esos nombres seria asi
    /*timestamps: {
        createdAt:'fecha_creacion',
        updatedAt:'fecha_actualizacion'
    }*/
});

module.exports = {
    clienteSchema: clienteSchema
}