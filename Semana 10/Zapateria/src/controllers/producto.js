const {Producto} = require('../config/Mongoose');

const crearProducto = (req, res)=>{
    // la primera forma era crear una instancia de la clase
    /*
    let objProducto = new Producto(req.body);
    objProducto.save({},(error,productoCreado)=>{
        // iba la logica de la creacion del producto
    })
    */

    // la segunda forma es mas directa, la primera forma se usa por si tenemos funciones dentro del mismo modelo para ser usadas
    Producto.create(req.body,(error,productoCreado)=>{
        if(!error){
            return res.status(201).json({
                ok: true,
                content: productoCreado,
                message: 'Se creo el producto exitosamente'
            });
        }else{
            return res.status(500).json({
                ok: false,
                content: error,
                message: 'Hubo un error al crear el producto'
            });
        }
    })
}

const listarProducto = (req, res)=>{
    Producto.find((error, productos)=> {
        if(!error){
            return res.json({
                ok: true,
                content: productos,
                // este es un operador ternario si la condicion es verdadera ingresara a la primera respuesta y si es falsa, ingresara a lo siguiente de los :                
                message: productos.length === 0 ? 'No hay productos' : null ,
                // este operador trabaja igual que el ternario pero solo retornara un valor si la condicion es verdadera
                /*
                otro_message: productos.length === 0 && 'No hay productos'
                */
            });
        }else{
            return res.status(500).json({
                ok : false,
                content: error,
                message: 'Hubo un error al devolver los productos'
            });
        }
    })
}
module.exports = {
    crearProducto: crearProducto,
    listarProducto: listarProducto,
}