// Aca vamos a definir todos nuestros controladores (comportamiento que van a recibir cuando se ingrese a una ruta en especifica)
// req => Request, res => Response, next => Next function
var tareas = [];
const getTareas = (req, res)=>{
    return res.status(200).json({
        ok: true,
        content: tareas,
        message: null
    });
}
const crearTarea = (req, res)=>{
    // console.log(req.body);
    tareas.push(req.body);
    return res.json({
        ok:true,
        message: 'Se agrego exitosamente la nueva tarea',
        content: tareas
    });
}
const getTareaById = (req, res)=>{// traerTareaPorId
    // EJERCICIO!!!!!
    // de acuerdo al ID en la url me devuelva la tarea y si no hay que me diga que la tarea no existe con un status 404
    // return res.json({
    //     ok:true
    // });
    let {id_tarea} = req.params;
    // console.log(id_tarea);
    // console.log(tareas.length);
    // se le resta en una unidad puesto que al empezar el array en posicion 0 el front puede pensar que va desde la posicion 1 y por ende para que sea el mismo orden se hace el decremento
    if(tareas.length > id_tarea){
        // si la longitud del array de tareas es mayor que uno de sus id (posicion) significa que si hay esa tarea
        return res.json({
            ok:true,
            content:tareas[id_tarea],
            message:null
        })
    }else{
        return res.status(404).json({
            ok:false,
            message:'Tarea no existe',
            content:null
        })
    }
} 
const actualizarTarea = (req, res)=>{
    // /tarea/:id_tarea
    let {id_tarea} = req.params;
    if(tareas.length > id_tarea){
        // si existe la posicion en mi arreglo de tareas
        let data = req.body;
        tareas[id_tarea] = data;
        return res.status(201).json({
            ok:true,
            message:'Se actualizo la tarea con exito',
            content:tareas[id_tarea]
        });
    }else{
        return res.status(404).json({
            ok:false,
            message:'No existe la tarea con ese id'
        });
    }
}
const eliminarTareaById = (req,res)=>{
    let {id_tarea} = req.params;
    if(tareas.length > id_tarea){
        tareas.splice(id_tarea,1);
        return res.json({
            ok:true,
            message:'Se elimino la tarea exitosamente',
            content:tareas
        });
    }else{
        return res.status(404).json({
            ok:false,
            message:'No existe la tarea con ese id'
        });
    }
}


// se necesita exportar todas las variables, funciones, clases y otros que se vayan a necesitar en otro archivo JS
module.exports = {
    // getTareas: getTareas,
    getTareas,
    crearTarea,
    getTareaById,
    actualizarTarea,
    eliminarTareaById
}