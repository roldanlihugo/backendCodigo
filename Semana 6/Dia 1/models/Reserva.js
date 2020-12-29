const Sequelize = require('sequelize');
const reserva_model = (conexion)=>{
    let reserva = conexion.define('reservas',{
        resId: {
            field:'res_id',
            primaryKey:true,
            autoIncrement: true,
            allowNull: false,
            type: Sequelize.INTEGER
        },
        resFechin:{
            field: 'res_fechin',
            type: Sequelize.DATE
        },
        resFechfin: {
            field: 'res_fechfin',
            type: Sequelize.DATE
        }
    },{
        tableName:'t_reserva',
        timestamps:true
    });
    return reserva;
}

module.exports = reserva_model;