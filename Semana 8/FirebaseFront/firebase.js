var firebaseConfig = {
    apiKey: "AIzaSyAjsyaZwkZ2vbCooCmdO7sdPqql1WVIIII",
    authDomain: "backend-flask-eduardo.firebaseapp.com",
    databaseURL: "https://backend-flask-eduardo-default-rtdb.firebaseio.com",
    projectId: "backend-flask-eduardo",
    storageBucket: "backend-flask-eduardo.appspot.com",
    messagingSenderId: "631279860067",
    appId: "1:631279860067:web:b5761a0a2d8a97295efb56",
    measurementId: "G-HSVH671VWW"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var nombreCategoria = document.getElementById("nomCat");
var descripcionCategoria = document.getElementById("descCat");
var enviarCategoria = document.getElementById("enviar");
var tabla = document.getElementById("categorias");
enviarCategoria.addEventListener("click", (event) => {
    event.preventDefault();
    var nombre = nombreCategoria.value;
    var descripcion = descripcionCategoria.value;
    // genera una nueva llave para tener como ID
    var llave = database.ref().child("categoriaHTML").push().key;
    console.log(llave);
    var postCategoria = {
        nombre,
        abreviatura: descripcion
    }
    database.ref().child("categoriaHTML").child(llave).set(postCategoria, (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("se almaceno la data correctamente");
        }
    });
})
function visualizarCategoria() {
    // la diferencia entre on y once es que once devuelve una sola vez (cuando se llama a la funcion) y on se queda conectado con la bd y al haber un cambio (actualizacion, eliminacion, agregacion) devuelve todos los valores de nuevo
    database.ref("categoriaHTML").on("value", (snapshot) => {
        // UX/UI User Experience & User Interface
        // el snapshot es todo lo que esta en esa referencia, sus configuraciones, sus hijos y complementos adicionales
        // si no hay aun data en esa referencia retornará False si tu usas el metodo snapshot.exists() y retonara null si no hay data
        // https://firebase.google.com/docs/database/web/read-and-write
        /*
        console.log(snapshot.exists());
        console.log(snapshot.val().nombre);
        */
        tabla.innerHTML="";
        Object.keys(snapshot.val()).forEach(function (key) {
            /*console.log(key);
            console.log(snapshot.val()[key].nombre)
            console.log(snapshot.val()[key].abreviatura)*/
            let fila = `<tr>
                <td>${key}</td>
                <td>${snapshot.val()[key].nombre}</td>
                <td>${snapshot.val()[key].abreviatura}</td>
                </tr>`
            tabla.innerHTML += fila;

        });
        // dibujar todas las categorias en una tabla y cada vez que se agregue una nueva redibujar la tabla.
    })
}
visualizarCategoria();