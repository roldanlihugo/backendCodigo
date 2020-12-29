import { Request, Response } from 'express';
import { Video } from '../config/mongoose';
// ambas librerias son internas(nativas) de NodeJS y vienen instaladas por defecto en NodeJs
// fs => libreria para el manejo de archivos dentro del proyecto, sirve para insertar, editar o eliminar archivos de mi proyecto
import fs from 'fs';
// path => otra libreria para manejar las rutas de los archivos
import path from 'path';
import { CallbackError } from 'mongoose';

export var crearVideo = (req: Request, res: Response) => {
    // si no deseo trabajar como una funcion de respuesta con error, se puede usar las promesas, pero si usas el function ya no usas la promesa y viceversa
    Video.create(req.body, function (error: any, videoCreado: any) {
        if (error) {
            res.status(500).json({
                ok: false,
                content: error,
                message: 'Hubo un error al guardar el video'
            })
        } else {
            res.status(201).json({
                ok: true,
                content: videoCreado,
                message: 'Video creado exitosamente, falta la miniatura'
            })
        }
    })
}

export var subirImagen = (req: any, res: Response) => {
    console.log(req.files.imagen);// {} | req.files['imagen']
    let { id } = req.params;
    // valido si en mi objeto de files esta la llave imagen(que es la que yo le mando desde el front-postman)
    if (req.files.imagen) {
        // si hay archivos multimedia
        let ruta = req.files.imagen.path;
        console.log(ruta);
        // separar la ruta y quitar la palabra multimedia\ y solamente quedase con el nombre del archivo.
        let nombreServidor = ruta.split("\\")[1]
        // let otraForma = ruta.substring(11,ruta.length);
        Video.findByIdAndUpdate(id, { vid_img: nombreServidor }, { new: true }, (error, videoActualizado) => {
            if (!error) {
                res.status(201).json({
                    ok: true,
                    content: videoActualizado,
                    message: 'Se modifico la miniatura del video'
                })
            } else {
                res.status(500).json({
                    ok: false,
                    content: error,
                    message: 'Hubo un error al actualizar la miniatura del video'
                })
            }
        })
    } else {
        // no hay archivos multimedia
        res.status(402).json({
            ok: false,
            message: 'Falta la miniatura del video'
        })
    }
}

export var devolverImagenPorNombre = (req: Request, res: Response) => {
    let { nombre } = req.params;
    let ruta = `multimedia/${nombre}`
    let rutaDefault = 'multimedia/image.jpg'
    // verifica si existe ese archivo en mi proyecto, entonces retornará un True si existe o un False si no existe
    if (fs.existsSync(ruta)) {
        // resolve sirve para mostrar un archivo
        // sendFile => sirve para mandar al front un archivo y nada mas que un archivo, no se puede mandar texto adicional
        return res.sendFile(path.resolve(ruta));
    } else {
        return res.sendFile(path.resolve(rutaDefault));
    }
}

export var eliminarVideoConImagen = (req: Request, res: Response) => {
    // BUSCAR EL VIDEO SEGUN SU ID
    // 1. eliminar el video de la base de datos
    // 2. buscar la imagen en el servidor
    // 3. si la encuentro la voy a eliminar del servidor para evitar archivos basuras
    let { id } = req.params;
    Video.findByIdAndDelete(id, {}, (error, objVideo: any) => {
        // si no hay error pero si hay un objeto del video significa que ese video con el id existe en la bd y ya se eliminó
        if (!error && objVideo) {
            // eliminar la imagen del servidor 
            fs.unlink(`multimedia/${objVideo.vid_img}`, (errorEliminacion) => {
                if (errorEliminacion) {
                    res.status(500).json({
                        ok: false,
                        content: errorEliminacion,
                        message: 'Se elimino exitosamente de la bd, pero hubo un problema al eliminar el archivo del servidor'
                    });
                } else {
                    res.json({
                        ok: true,
                        content: objVideo,
                        message: 'Se elimino exitosamente el video de la bd'
                    })
                }
            })
        } else {
            res.status(500).json({
                ok: false,
                content: error,
                message: 'Hubo un error al eliminar el video de la Bd'
            })
        }
    })
}

// agregar un comentario
// HINT: devolver la lista de comentarios y agregar al final....
export var agregarComentarioPorIdVideo = (req: Request, res: Response) => { 
    let {id}= req.params;
    Video.findById(id,(error:CallbackError,resultado:any)=>{
        if(!error){
            resultado.vid_coments.push(req.body);
            resultado.save();
            res.status(201).json({
                ok:true,
                content:resultado,
                message:'Se agrego exitosamente el comentario'
            })
        }
        else{
            res.status(500).json({
                ok:false,
                content:error,
                message:'Hubo un error al registrar el comentario'
            })
        }
    })
}

// hacer un controlador para que se registre el like, solamente puede registrarlo una persona que ya este registrada en la coleccion de usuarios
