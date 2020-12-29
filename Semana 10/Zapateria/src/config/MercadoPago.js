// npm i mercadopago
const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: "APP_USR-8208253118659647-112521-dd670f3fd6aa9147df51117701a2082e-677408439",
    integrator_id: "dev_2e4ad5dd362f11eb809d0242ac130004"
});

module.exports = mercadopago;