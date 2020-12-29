const Sequelize = require('sequelize');

const aula_model = (conexion)=>{
    let aula = conexion.define('aulas',{
        aulaId: {
            primaryKey:true,
            field:'aula_id',
            autoIncrement:true,
            type: Sequelize.INTEGER,
            allowNull: false
        },
        aulaPiso: {
            type: Sequelize.STRING(45),
            field:'aula_piso'
        },
        aulaCapacidad:{
            type: Sequelize.INTEGER,
            field:'aula_capacidad'
        }
    }, {
        tableName: 't_aula',
        timestamps: true
    });
    return aula;
}
module.exports = aula_model;