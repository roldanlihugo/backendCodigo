const Sequelize = require('sequelize');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const docente_model = (conexion) => {
    let docente = conexion.define('docentes', {
        docId: {
            field: 'doc_id',
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        docNomb: {
            field: 'doc_nomb',
            type: Sequelize.STRING(45)
        },
        docApe: {
            field: 'doc_ape',
            type: Sequelize.STRING(45)
        },
        docEmail: {
            field: 'doc_email',
            type: Sequelize.STRING(40),
            unique: true
        },
        docHash: {
            field: 'doc_hash',
            type: Sequelize.TEXT
        },
        docSalt: {
            field: 'doc_salt',
            type: Sequelize.TEXT
        },
    }, {
        tableName: 't_docente',
        timestamps: true
    });
    docente.prototype.setSaltAndHash = function (password) {
        // uso su metodo randomBytes el cual va a generar una cadena aleatoria de bytes con una longitud de 16 y luego eso lo convierto a formato string para que pueda ser almacenado en la base de datos a formato hexadecimal
        // https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
        this.docSalt = crypto.randomBytes(16).toString('hex');
        // agarra el salt generado anteriormente y lo combina con la contraseña mediante un cierto numero de ciclos pasados como 3er parametro y al final le decimos en que longitud queremos esa encriptacion y que algoritmo deseamos que se use para la encriptacion y luego eso lo convierto a formato string para que pueda ser almacenado en la base de datos a formato hexadecimal
        // https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2sync_password_salt_iterations_keylen_digest
        this.docHash = crypto.pbkdf2Sync(password, this.docSalt, 1000, 64, 'sha512').toString('hex');
    }
    docente.prototype.validarPassword = function (password) {
        let hashTemporal = crypto.pbkdf2Sync(password, this.docSalt, 1000, 64, 'sha512').toString('hex');
        // si la hash temporal es exactamente igual que la hash almacenada en la bd significa que las contraseñas concuerdan y por ende retorno True
        if (hashTemporal === this.docHash) {
            return true;
        } else {
            return false;
        }
    }
    docente.prototype.generarJWT = function () {
        // generar el payload
        // el payload es la parte intermedia del JWT y sirve para guardar informacion de timpo de vida e informacion adicional como el nombre del docente u otros.
        let payload = {
            docId: this.docId,
            docNomb: this.docNomb + ' ' + this.docApe
        }
        // esta es la forma de generar la token, se manda el payload, la contraseña de la token y algunas opciones extras como la duracion y el algoritmo para su encriptacion
        let token = jwt.sign(payload, 'codigo', { expiresIn: 60 }, { algorithm: 'RS256' });
        console.log(token);
        return token;
    }


    return docente;
}
module.exports = docente_model;