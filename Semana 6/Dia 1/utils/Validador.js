const jwt = require('jsonwebtoken');

let verificarToken = (token)=>{
    try {
        // verificar si la token recibida cumple ciertas condiciones como: ver si aun tiene tiempo de vida, si la contraseña es la correcta y si esta en un formato correcto
        // la contraseña tiene que ser exactamente igual a la que usamos para generar la TOKEN
        let resultado = jwt.verify(token, 'codigo',{algorithm:'RS256'} );
        // si todo esta correcto el verify nos devolvera el payload completo
        console.log(resultado);
        return resultado;
    } catch (error) {
        console.log(error);
        return null;
    }
}
// watchmen
// middleware 
let wachiman = (req, res, next)=>{
    console.log(req.headers);
    if(req.headers.authorization){
        let token = req.headers.authorization.split(' ')[1];
        console.log(token);
        let verificacion = verificarToken(token);
        if (verificacion){
            next();
        }else{
            res.status(401).json({
                ok:false,
                message:'No estas autorizado para realizar esta solicitud'
            })
        }
    }else{
        res.status(401).json({
            ok:false,
            message:'Necesitas estar autenticado para realizar esta peticion'
        })
    }
}

module.exports= {
    wachiman
}