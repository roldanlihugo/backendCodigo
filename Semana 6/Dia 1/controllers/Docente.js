const { Docente } = require('../config/Sequelize');
const RegistrarUsuario = (req, res) => {
    // Que campo tengo que validar antes de hacer toda la gestion
    Docente.findOne({ where: { docEmail: req.body.docEmail } }).then((docenteEncontrado) => {
        if (docenteEncontrado) {
            // todo lo que suceda aca es porque ya hay un docente con ese correo
            res.status(400).json({
                ok: false,
                message: 'Ya existe un docente con ese correo',
                content: null
            })
        } else {
            // aqui significa que ese correo esta disponible
            let nuevoDocente = Docente.build(req.body);
            nuevoDocente.setSaltAndHash(req.body.password);
            nuevoDocente.save().then(docenteCreado => {
                return res.status(201).json({
                    ok: true,
                    message: 'Docente creado exitosamente',
                    content: docenteCreado
                });
            }).catch(error => {
                return res.status(500).json({
                    ok: false,
                    message: 'Hubo un error al guardar el docente',
                    content: error
                })
            })
        }
    })
}
const Login = (req, res) => {
    Docente.findOne({
        where: {
            docEmail: req.body.email
        }
    }).then((docenteEncontrado) => {
        if (docenteEncontrado) {
            // si existe ese docente con ese correo
            let resultado = docenteEncontrado.validarPassword(req.body.password);
            console.log(resultado);
            // ver si es true o false el resultado
            if (resultado){
                // la pwd es correcta
                //generar el JWT
                let token = docenteEncontrado.generarJWT();
                console.log(token);
                return res.json({
                    ok:true,
                    content: null,
                    token: token
                })

            }else{
                // la pwd es incorrecta
                return res.json({
                    ok: true,
                    message: 'el usuario o la contraseña es incorrecta'
                });
            }
            
            
        } else {
            // el docente con ese correo no existe
            return res.status(404).json({
                ok: false,
                message: 'No hay ningun docente registrado con ese correo',
                content: null
            });
        }
    }).catch(error => {
        console.log(error);
        res.status(500).json({
        ok: false,
        content: error
    })})
}
module.exports = {
    RegistrarUsuario,
    Login
}