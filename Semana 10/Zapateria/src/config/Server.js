const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const producto_router = require('../routes/producto');
const rutas_cliente = require('../routes/cliente');
const venta_router = require('../routes/venta');
class Server {
    constructor(){
        this.app = express();
        this.puerto = process.env.PORT || 5000;
        this.habilitarCORS();
        this.configurarBodyParser();
        this.definirRutas();
        this.conectarMongo();
    }
    habilitarCORS(){
        this.app.use((req, res, next)=>{
            res.header('Access-Control-Allow-Origin','*');
            res.header('Access-Control-Allow-Headers','Authorization, Content-Type');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            next();
        });
    }
    configurarBodyParser(){
        this.app.use(bodyParser.json());
    }
    definirRutas(){
        this.app.get('/',(req, res)=>{
            res.status(200).json({
                ok:true,
                message:'La API Funciona! 😊🎃😎🎉'
            });
        });
        this.app.use('',producto_router, rutas_cliente, venta_router);
    }    
    start(){
        this.app.listen(this.puerto,()=>{
            console.log("Servidor corriendo exitosamente");
        })
    }
    conectarMongo(){
        // https://mongoosejs.com/docs/connections.html#options
        mongoose.connect('mongodb://localhost:27017/zapateria',{
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    }
}

module.exports = Server // export default class Server {....}