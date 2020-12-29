const Sequelize = require('sequelize');
const {DataTypes} = require('sequelize');

const pabellon_model = (conexion)=>{
    let pabellon = conexion.define('pabellones',{
        pabellonId : {
            primaryKey: true, // define si es pk o no
            autoIncrement: true, //indica que va a ser autoincrementable
            type: Sequelize.INTEGER, // define el tipo de la columna
            allowNull: false, // indica si va a admintir valores nulos o no
            unique:true, // indica si el valor no se puede repetir
            field : 'pabellon_id' // para manejar otro nombre diferente como columna en la bd
        },
        pabellonNomb: {
            type: Sequelize.STRING(45),
            allowNull: false,
            field:'pabellon_nomb'
        },
        estado: {
            type: DataTypes.BOOLEAN,
            default: true
        },
    },{
        tableName : 't_pabellon',
        timestamps: true
    });
    return pabellon;
}
module.exports = pabellon_model;