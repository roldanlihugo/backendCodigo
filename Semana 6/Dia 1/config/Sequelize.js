// npm i sequelize
const Sequelize = require('sequelize');
const pabellon_model = require('../models/Pabellon');
const aula_model = require('../models/Aula');
const reserva_model = require('../models/Reserva');
const docente_model = require('../models/Docente');
// https://sequelize.org/master/manual/getting-started.html
const conexion = new Sequelize(
    // base_datos, usuario, password
    "reservasExpress","root", "root",{
        host:"127.0.0.1",
        dialect: "mysql",
        timezone: "-05:00",
        logging: false, // para no mostrar los scripts en consola
        // opciones extras
        dialectOptions : {
            dateStrings: true,
        } 
    }
);
// Aca se crean las tablas en la base de datos segun sus modelos
const Pabellon = pabellon_model(conexion);
const Aula = aula_model(conexion);
const Reserva = reserva_model(conexion);
const Docente = docente_model(conexion);
// Una vez definido los modelos, se procede a crear las relaciones
// Pabellon tiene muchos Aula 
Pabellon.hasMany(Aula, {foreignKey: 'pabellon_id'});
// Aula pertenece a Pabellon
Aula.belongsTo(Pabellon, {foreignKey:'pabellon_id'});
Docente.hasMany(Reserva,{foreignKey: "doc_id"});
Reserva.belongsTo(Docente, {foreignKey: "doc_id"});
Aula.hasMany(Reserva,{foreignKey: "aula_id"});
Reserva.belongsTo(Aula, {foreignKey: "aula_id"});

module.exports = {
    conexion: conexion,
    Pabellon: Pabellon,
    Aula: Aula,
    Docente: Docente,
    Reserva
}