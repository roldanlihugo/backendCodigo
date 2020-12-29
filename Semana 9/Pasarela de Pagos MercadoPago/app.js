var express = require('express');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 3000
const mercadopago = require("mercadopago");

var app = express();
// access_token: esta token se genera por cada estableciemiento que use una pasarela de pagos y se crea en la misma plataforma de mercado pago 
// integrator_id: es el identificador de cada desarrollador certificado por mercadopago
mercadopago.configure({
    access_token: "APP_USR-8208253118659647-112521-dd670f3fd6aa9147df51117701a2082e-677408439" ,
    integrator_id: "dev_2e4ad5dd362f11eb809d0242ac130004"
})
// me deberia ahora el usuario (front) mandar toda la informacion del cliente ya registrado (nombres, correo, email, dni, direccion)
let comprador = {
    name: "Lalo",
    surname: "Landa",
    email: "test_user_46542185@testuser.com",
    phone: {
        area_code:"52",
        number: 5549737300
    },
    identification:{
        type:"DNI",
        number:"22334445"
    },
    address:{
        zip_code:"03940",
        street_name:"Insurgentes Sur",
        street_number:1602
    }
}
let metodos_pago = {
    installments: 6,
    exclude_payment_methods: [
        {
            id: "diner"
        }
    ],
    exclude_payment_types: [
        {
            id: "atm"
        }
    ]
}
let back_urls = {}
let preference = {
    items: [],
    back_urls: back_urls,
    payment_methods: metodos_pago,
    payer: comprador,
    auto_return: "approved",
    external_reference: "ederiveroman@gmail.com",
    notification_url: ""
}
// Habilitar los CORS
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, Content-Type');
    res.header('Access-Control-Allow-Methods','GET');
    next();
});
// Definir el Body Parser
app.use(bodyParser.json());


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', async (req, res) => {
    console.log(req.query)
    console.log(req.get("host"));
    let item = {
        id: "1234",
        title: req.query.title,
        description: "Dispositivo móvil de Tienda e-commerce",
        picture_url: req.get("host")+req.query.img.substring(1),//localhost:3000
        quantity: +req.query.unit,
        currency_id: "PEN",
        unit_price: +req.query.price
        // https://es.wikipedia.org/wiki/ISO_4217
    };
    preference.back_urls = {
        success: `${req.get("host")}/success`,
        pending: `${req.get("host")}/pending`,
        failure: `${req.get("host")}/failure`
    }
    preference.items = [];
    preference.items.push(item);
    preference.notification_url = `${req.get("host")}/notificaciones`;
    let respuesta = await mercadopago.preferences.create(preference);
    console.log(respuesta.body.init_point);
    req.query.init_point = respuesta.body.init_point;
    req.query.id = respuesta.body.id;
    res.render('detail', req.query);
});
// Va a ingresar cuando el pago sea exitoso -- linea 81
app.get("/success", function(req,res){
    res.render("success", req.query)
});
// Va a ingresar cuando el pago sea pendiente (eligio el metodo pago contraentrega) -- linea 82
app.get("/pending", function(req,res){
    res.render("pending", req.query)
});
// Va a ingresar cuando el hubo un error al realizar el pago -- linea 83
app.get("/failure", function(req,res){
    res.render("failure", req.query)
});
app.post("/notificaciones", function(req, res){
    // todo lo que manda el mercado pago lo recibo mediante el req.query y esto lo definimos en la linea 87
    console.log(req.query);
    // mercado pago tambien manda informacion por el BODY
    console.log(req.body);
    res.status(200).send("ok")
});


app.listen(port);