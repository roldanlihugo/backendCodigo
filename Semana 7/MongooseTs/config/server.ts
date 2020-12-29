// npm i @types/express --save-dev
import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { usuario_router } from '../routes/usuario';
import { video_router } from '../routes/video';

export default class Server {
    public app: express.Application;
    public puerto: any;

    constructor() {
        this.app = express();
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Header', 'Content-Type, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            next();
        });
        this.puerto = process.env.PORT || 5000;
        this.configurarBodyParser();
        this.rutas();
        this.conectarMongo();
    }
    configurarBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }
    rutas() {
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Bienvenido a mi API');
        });
        this.app.use('', usuario_router);
        this.app.use('', video_router);

    }
    iniciarServidor() {
        this.app.listen(this.puerto, () => {
            console.log('Servidor corriendo exitosamente en el puerto', this.puerto);
        })
    }
    conectarMongo() {
        mongoose.connect('mongodb://localhost:27017/videosVirtual', {
            useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true,
            useCreateIndex: true
        })
    }
}
