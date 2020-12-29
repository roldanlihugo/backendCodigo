import { Request, Response } from 'express';
import { CallbackError } from 'mongoose';
import { Usuario } from '../config/mongoose';
import { usuarioSchema } from '../models/usuario';

export var crearUsuario = (req: Request, res: Response) => {
    // forma 1
    let objUsuario: any = new Usuario(req.body);
    objUsuario.encriptarPassword(req.body.password);
    objUsuario.save((error: CallbackError, nuevoUsuario: Document) => {
        if (error) {
            res.status(500).json({
                ok: false,
                content: error,
                message: 'Hubo un error al crear el usuario'
            })
        } else {
            res.status(201).json({
                ok: true,
                content: nuevoUsuario,
                message: "Se creo el usuario exitosamente"
            })
        }
    });
    // forma 2
    // Usuario.create(req.body, function (error: any, nuevoUsuario: any) {
    //     if (error) {
    //         res.status(500).json({
    //             ok: false,
    //             content: error,
    //             message: 'Hubo un error al crear el usuario'
    //         })
    //     } else {
    //         res.status(201).json({
    //             ok: true,
    //             content: nuevoUsuario,
    //             message: "Se creo el usuario exitosamente"
    //         })
    //     }
    // });
};

export var devolverUsuario = (req: Request, res: Response) => {
    Usuario.find((error, usuarios) => {
        if (error) {
            res.status(500).json({
                ok: false,
                content: error,
                message: 'hubo un error al solicitar los usuarios'
            })
        } else {
            res.json({
                ok: true,
                content: usuarios,
                message: null
            })
        }
    })
};

export var actualizarUsuarioPorId = (req: Request, res: Response) => {
    let {id}= req.params;
    // la opcion new:true sirve para indicar que el objeto que me retorne sea el actualizado, sino me retornara el objecto antes de actualizarse
    Usuario.findByIdAndUpdate(id,req.body,{new:true},(error,usuarioActualizado:any)=>{
        // verificar si hay password en el body y si hay, llamar al metodo encriptarPassword
        if(req.body.password){
            if(usuarioActualizado){
                usuarioActualizado.encriptarPassword(req.body.password);
                // hace efectivo los cambios despues de actualizar el registro
                usuarioActualizado.save();
            }
            // OPERADOR TERNARIO
            // usuarioActualizado ? usuarioActualizado.encriptarPassword(req.body.password) : ""
        }
        if(error){
            res.status(500).json({
                ok:false,
                content:error,
                message:'Hubo un error al actualizar el usuario'
            })
        }else{
            res.status(201).json({
                ok: true,
                content: usuarioActualizado,
                message:'Se actualizo exitosamente el usuario'
            })
        }
    })
}
export var loginUsuario = (req: Request, res:Response)=>{
    let {correo, password}= req.body;
    Usuario.findOne({usu_mail:correo},(error:any,usuario:any)=>{
        if(usuario){
            let resultado = usuario.verificarPassword(password);
            if(resultado){
                console.log('Las contraseñas concuerdan');
                // GENERAR JWT
                let token = usuario.generarJWT();
                res.json({
                    ok:true,
                    message:'Usuario correcto',
                    content: token,
                })
            }else{
                console.log('Las contraseñas son diferentes');
                res.status(400).json({
                    ok:false,
                    message:'Contraseña incorrecta'
                });
            }
        }else{
            console.log('El usuario no existe');
            res.status(404).json({
                ok:false,
                message:'El usuario no existe'
            })
        }
    });
}