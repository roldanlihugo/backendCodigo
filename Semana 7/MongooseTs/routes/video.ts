import {Router} from 'express';
import {subirImagen, crearVideo, devolverImagenPorNombre, eliminarVideoConImagen, agregarComentarioPorIdVideo} from '../controllers/video';
export var video_router = Router();
// import multiparty from 'connect-multiparty';
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({uploadDir:'./multimedia'})

video_router.post('/subirImg/:id', multipartyMiddleware, subirImagen);

video_router.post('/video', crearVideo);

video_router.get('/devolverImagen/:nombre', devolverImagenPorNombre);

video_router.delete('/video/:id', eliminarVideoConImagen);

video_router.post('/video/:id', agregarComentarioPorIdVideo);