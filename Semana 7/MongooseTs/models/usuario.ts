// npm i mongoose
import mongoose from 'mongoose';
import crypto from 'crypto';
import { sign } from 'jsonwebtoken';
var Schema = mongoose.Schema;
// https://mongoosejs.com/docs/schematypes.html

var telefonoSchema = new Schema({
    fono_numero: {
        type: Number,
        minlength: 6, //si el string ingresado es menor que el valor no va a permitir su registro
        maxlength: 15,
        required: true, // no va a permitir que el valor quede en null
    },
    fono_operador: {
        type: String,
        required: true
    }
});


export var usuarioSchema = new Schema({
    usu_nom: String,
    usu_ape: String,
    usu_mail: {
        type: String,
        index: true,
        unique: true
    },
    usu_fecnac: {
        type: String,
        min: '1970-01-01',
        max: '2002-12-31'
    },
    usu_hash: String,
    usu_salt: String,
    usu_fonos: [
        telefonoSchema
    ]
}, {
    timestamps: {
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_actualizacion'
    }
})
usuarioSchema.methods.encriptarPassword = function (password: string) {
    this.usu_salt = crypto.randomBytes(16).toString('hex');
    this.usu_hash = crypto.pbkdf2Sync(password, this.usu_salt, 1000, 64, 'sha512').toString('hex');
}
usuarioSchema.methods.verificarPassword = function (password: string) {
    let hashTemporal = crypto.pbkdf2Sync(password, this.usu_salt, 1000, 64, 'sha512').toString('hex');
    // verifico que el hashTemporal sea exactamente igual que el hash almacenado en el objeto
    if (hashTemporal === this.usu_hash) {
        return true;
    } else {
        return false
    }
    // hashTemporal === this.usu_hash ? true : false
}
usuarioSchema.methods.generarJWT = function(){
    let payload = {
        usuarioId: this._id,
        usuarioNombre: this.usu_nom,
        usuarioApellidos: this.usu_ape
    }
    let token = sign(payload,'videosVirtual',{expiresIn:60},{algorithm:'RS256'});
    return token;
}