const {Producto, Venta, Cliente, Pasarela} = require('../config/Mongoose');
const mercadopago = require('../config/MercadoPago');
// crear la preferencia de mercado pago
let preferencia = {
    payment_methods : {
        installments: 6,
        // https://api.mercadopago.com/v1/payment_methods => tengo que mandar como header la token en Authorization
        excluded_payment_methods: [
            {
                id:"diners"
            }
        ],
        excluded_payment_types: [
            {
                id: "atm"
            }
        ]
    },
    // sirve para indicar que si el pago se realizó correctamente o hubo un error o esta pendiente de pago (hará una redirección automatica)
    back_urls:{
        success: 'http://ederivero-mp-ecommerce-nodejs.herokuapp.com/success',
        failure: 'http://ederivero-mp-ecommerce-nodejs.herokuapp.com/failure',
        pending: 'http://ederivero-mp-ecommerce-nodejs.herokuapp.com/pending'
    },
    // sirve para que mercado pago nos mande actualizaciones de nuestro pago online, solamente funciona con dominios publicos (no funciona con localhost o 127.0.0.1)
    notification_url: 'https://pagos-mongoose-eduardo.herokuapp.com/notificaciones',
    // sirve para mandarnos informacion del pago a nuestro correo
    external_reference: 'ederiveroman@gmail.com',
    // si lo declaramos hara que, una vez realizada la compra, nos redireccionará al endpoint declarado en las back_urls.sucess
    auto_return:'approved'
}

const preferenciaMercadoPago = async(req, res)=>{
    // tengo que ver los productos id's y buscarlos en la colecion de producto
    let {productos, clienteId} = req.body;
    let items = [];
    // buscar el cliente y rellenar con los datos de ese cliente el payer y si no existe el cliente indicar que no existe
    // si quiero esperar una promesa con el await lo mas recomanble es trabajar con un try-catch puesto que al no recibir el catch y si hay algun error, no sabremos como tratarlo
    try {
        let cliente = await Cliente.findById(clienteId);
        if(!cliente){
            return res.status(404).json({
                ok:false,
                content:null,
                message:'Cliente no encontrado'
            })
        }
        var payer = {
            name: cliente.cliNom,
            surname: cliente.cliApe,
            email: "test_user_46542185@testuser.com", // necesitamos este correo porque es el unico que funciona con la token de prueba, una vez que tengamos otra token habilitada normal podremos usar el correo que quisieramos
            phone: {
                number: +cliente.cliFono[0].fono_numero,
                area_code: cliente.cliFono[0].fono_area
            },
            identification:{
                type:"dni",
                number:cliente.cliDni
            },
            address:{
                zip_code:cliente.cliAddress.zip_code,
                street_name : cliente.cliAddress.street_name,
                street_number: cliente.cliAddress.street_number
            }
        }
        // si el cliente existe

    } catch (error) {
        console.log(error)
    }
    for (const key in productos) {
        // console.log(productos[key]);
        try {
            let producto = await Producto.findById(productos[key].productoId);
            let item = {
                id: producto._id,
                title: producto.productoTitulo,
                description: producto.productoDescripcion,
                picture_url: producto.productoImagen,
                quantity: productos[key].cantidad,
                currency_id: producto.productoMoneda,
                unit_price: producto.productoPrecio
            }
            items.push(item);
            // console.log(producto)
        } catch (error) {
            console.log(error)
        }
    }
    preferencia.payer = payer;
    preferencia.items = items;
    let resMercadoPago = await mercadopago.preferences.create(preferencia);

    let idPago = resMercadoPago.body.id;
    let idCollector = resMercadoPago.body.collector_id;
    // ingresar el idPago, idCollector y clienteID en la coleccion (tabla) Pasarela, pasar todo su codigo e importaciones si fuese necesario usando async y await.
    await Pasarela.create({
        idPago: idPago,
        idCollector: idCollector,
        clienteId: clienteId
    });
    return res.json({
        ok: true,
        content: resMercadoPago.body.init_point,
        message: null
    });
}
const recibirNotificaciones= (req,res)=>{
    // https://www.mercadopago.com.ar/developers/es/guides/notifications/ipn
    console.log(req.body);
    console.log(req.query);
    res.status(201).send('Recibido')
}
// crear venta

// mostrar venta segun dni del cliente

// notificaciones de mercado pago de una venta en especifico

module.exports = {
    preferenciaMercadoPago,
    recibirNotificaciones
}