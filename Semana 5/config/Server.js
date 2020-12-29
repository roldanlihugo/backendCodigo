// npm i express
// npm i body-parser
const express = require('express');
const bodyParser = require('body-parser');
const {tareas_router} = require('../routes/Tareas');
class Server {
    constructor(){
        this.app = express();
        this.puerto = process.env.PORT || 8000;
        this.configurarBodyParser();
        this.cargarRutas();
    }     
    configurarBodyParser(){
        this.app.use(bodyParser.json());
    }
    iniciarServidor(){
        this.app.listen(this.puerto, ()=>{
            console.log(`El servidor se ha levantado exitosamente en el puerto ${this.puerto}`);
        })
    }
    cargarRutas(){
        // Asignar todas las rutas que van a poder ser accedidas a mi servidor
        this.app.get('/',(req, res)=>{
            res.status(200).send('La api funciona correctamente!')
        });
        this.app.use('/apiV1', tareas_router);
    }
}
module.exports = Server