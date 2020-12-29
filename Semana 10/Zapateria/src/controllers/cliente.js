const {Cliente} = require('../config/Mongoose');

// controlador para crear cliente
const crearCliente = (req, res)=>{
    Cliente.create(req.body,(error, clienteCreado)=>{
        if(!error){
            return res.status(201).json({
                ok: true,
                content: clienteCreado,
                message: 'Se creo el cliente exitosamente'
            })
        }else{
            return res.status(500).json({
                ok: false,
                content: error,
                message: 'hubo un error al crear el cliente'
            })
        }
    })
}

const buscarClientePorDni = (req, res)=>{
    Cliente.findOne({cliDni: req.params.dni},(error,clienteEncontrado)=>{
        if(!error){
            return res.json({
                ok: true,
                message: clienteEncontrado ? null : 'No se encontro el cliente a buscar',
                content: clienteEncontrado
            });
        }else{
            return res.status(500).json({
                ok: false,
                message: 'Hubo un error al buscar el cliente',
                content: error
            });
        }
    })
}

module.exports = {
    crearCliente,
    buscarClientePorDni
}