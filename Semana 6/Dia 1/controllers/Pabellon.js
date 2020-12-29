const { Pabellon } = require('../config/Sequelize');
const { Op } = require("sequelize");
const crearPabellon = (req, res) => {
    // console.log(req.body);
    let cuerpo = req.body;
    // pabellonNom
    // Forma 1, Creando primero la instancia de un Pabellon para guardarlo en la bd posteriormente (sirve para hacer una validacion manual previa)
    let objPabellon = Pabellon.build(cuerpo);
    // OJO todavia acá no se ha insertado en la BD
    objPabellon.save().then((pabellonCreado) => {
        return res.status(201).json({
            ok: true,
            content: pabellonCreado,
            message: 'Se creo exitosamente el pabellon'
        })
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al crear el pabellon'
        });
    })
}
const devolverPabellones = async (req, res) => {
    try {
        let resultado = await Pabellon.findAll();
        // si no indico que estado quiero devolver, por defecto devolvera el estado 200
        return res.json({
            ok: true,
            content: resultado,
            message: null
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al devolver los pabellones'
        });
    }
}

// Crear un controlador y su ruta para buscar un pabellon segun su PK (use el metodo findByPk(ID))
// https://sequelize.org/master/manual/model-querying-finders.html
// si es que no hubiese el pabellon con ese ID que lo indique, puede usar .then o async-await
const encontrarPabellonPorId = (req, res) => {
    let { id } = req.params;
    Pabellon.findByPk(id).then((pabellon) => {
        // console.log(pabellon);
        // console.log(pabellon.dataValues);
        if (pabellon) {
            return res.json({
                ok: true,
                content: pabellon,
                message: null
            })
        } else {
            return res.status(404).json({
                ok: false,
                content: null,
                message: 'No se encontro el pabellon'
            });
        }
    }).catch(error =>
        res.json({
            ok: false,
            content: error
        }))
}

const actualizarPabellon = (req, res) => {
    // anidamiento de promesas
    Pabellon.findByPk(req.params.id).then((pabellon)=>{
        if (pabellon){
            // significa que el pabellon existe
            // update(pasar la data a actualizar, una clausula indicando que pabellon se va a actualizar)
            return Pabellon.update(req.body, {
                where:{
                    pabellonId: req.params.id
                }
            })
        }else{
            return res.status(404).json({
                ok: false,
                content: null,
                message: 'No se encontro el pabellon'
            });
        }
    }).then((pabellonActualizado)=>{
        // todo este comportamiento se va a ejecutar gracias al update del pabellon de la linea 76 y es gracias al return
        // como hacer para que dependiendo del resultado del pabellonActualizado me diga si se actualizo o no!!
        console.log(pabellonActualizado.length);
        // en JAVASCRIPT cuando ponemos el valor de 0 en una condicional IF esta sera tomada como FALSE
        if (pabellonActualizado[0]){
            return res.status(400).json({
                ok:true,
                content: null,
                message:'Se actualizo exitosamente el pabellon'
            })
        }else{
            return res.json({
                ok: false,
                content:null,
                message: 'No se actualizo ningun pabellon, verifica el body'
            })
        }
    }).catch((error)=>{
        res.status(500).json({
            ok:false,
            content:error,
            message:'Hubo un error'
        })
    });
}

const eliminarPabellon =(req,res)=>{
    Pabellon.findByPk(req.params.id).then((pabellon)=>{
        if (pabellon){
            return Pabellon.update({estado:false}, {
                where:{
                    pabellonId: req.params.id
                }
            })
        }else{
            return res.status(404).json({
                ok: false,
                content: null,
                message: 'No se encontro el pabellon'
            });
        }
    }).then((pabellonActualizado)=>{
        return res.json({
            ok:true,
            content: null,
            message:'Se elimino exitosamente el pabellon'
        })
        
    }).catch((error)=>{
        res.status(500).json({
            ok:false,
            content:error,
            message:'Hubo un error'
        })
    });
}
// una ruta que mandando "Pab" me tiene que retornar todas las coincidencias en la cual el nombre del pabellon contengan esos 3 caracteres
// SELECT * FROM T_PABELLON WHERE PAB_NOM LIKE '%Pab%'
const devolverPabellonPorNombre = (req,res)=>{
    // devuelve los query en forma de un json
    let {palabra}=req.query;
    // https://sequelize.org/master/manual/model-querying-basics.html#operators
    Pabellon.findAll({
        where:{
            //pabellonNomb: palabra // where pab_nom = palabra
            pabellonNomb:{
                [Op.like]:'%'+palabra
            }
        }
    }).then(pabellones=>{
        res.json({
            ok:true,
            content:pabellones,
            message:null
        })
    });
}



module.exports = {
    crearPabellon,
    devolverPabellones,
    encontrarPabellonPorId,
    actualizarPabellon,
    eliminarPabellon,
    devolverPabellonPorNombre
}