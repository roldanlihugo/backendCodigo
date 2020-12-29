from flask import Flask, request
from models.categoria import CategoriaCollection
from firebaseconfig import firebase_categoria, firebaseAlmacenamiento
from datetime import datetime
import os
from werkzeug.utils import secure_filename
app = Flask(__name__)
@app.route("/")
def inicio():
    return 'Servidor levantado exitosamente'

@app.route("/categoria", methods=['GET','POST','PUT','DELETE'])
def categoriaController():
    if request.method =="GET":
        resultado = firebase_categoria.get()
        categorias = []
        for llave in resultado.keys():
            categoria = {
                "id": llave,
                "abreviatura":resultado[llave]["abreviatura"],
                "descripcion":resultado[llave]["descripcion"],
                "imagen":resultado[llave]["imagen"]
            }
            categorias.append(categoria)
        return {
            "ok":True,
            "content": categorias,
            "message":None
        }

    elif request.method=="POST":
        informacion = request.get_json()
        nuevaCategoria = CategoriaCollection(informacion["descripcion"], informacion["abreviatura"], informacion["imagen"])
        nuevaCategoria.save()
        return {
            "ok":True,
            "message":"Se guardo exitosamente la categoria en la bd",
            "content":None
        },201
        
    elif request.method=="PUT":
        pass
    else:
        pass

@app.route("/categoria/<string:id>", methods=['DELETE'])
def removeCategoria(id):
    # VALIDAR SI EL ID EXISTE Y SI NO INDICAR QUE NO EXISTE, Y QUE AL ELIMINAR LA IMAGEN SI NO EXISTIESE LA IMAGEN ELIMINAR IGUAL LA CATEGORIA PERO INDICAR QUE NO SE PUDO ELIMINAR LA IMAGEN

    # retorna la categoria segun su hijo y si no existe retorna vacio
    categoria = firebase_categoria.child(id).get()
    imagen = categoria['imagen'].split("appspot.com/")[1]
    # con este comando se elimina el archivo del storage
    try:
        firebaseAlmacenamiento.delete_blob(imagen)
    except:
        pass
    firebase_categoria.child(id).delete()

    # en base a la url de la imagen solamente yo quiero el nombre de la imagen, la ultima parte de la url 
    print(imagen)
    return 'ok'

@app.route("/subirImagen/<coleccion>/<string:id>", methods=['POST'])
def subirImagen(coleccion, id):
    # 1. VALIDAR QUE EN LOS FILES PASADOS POR EL USUARIO ESTE LA LLAVE imagen (dict key)
    # 2. VALIDAR QUE EL FILE imagen CONTENGA UN ARCHIVO (longitud)
    # 3. SOLAMENTE PERMITIR EL INGRESO DE ARCHIVOS DE TIPO IMAGEN (https://tedboy.github.io/flask/generated/generated/werkzeug.FileStorage.html)
    # SI ALGUNA DE LAS ANTERIORES NO SE CUMPLE, MOSTRAR UN MENSAJE QUE NO SE PUEDE REALIZAR LA PETICION CON UN STATUS 400
    if ("imagen" in request.files) and (request.files["imagen"].filename) and ("image" in request.files["imagen"].content_type) :
        imagen = request.files["imagen"]
        # COMO EVITAR QUE SI EL USUARIO ME MANDE EL MISMO NOMBRE DE ARCHIVO QUE YO YA TENGO GUARDADO EN EL SERVIDOR NO SE SOBREESCRIBA
        # el formato timestamp convierte la fecha actual con su hr, min, seg en un flotante
        # print(datetime.now().timestamp())
        fecha = str(datetime.now().timestamp()).replace(".","")
        nombreFinal = fecha + imagen.filename
        nombre_seguro = secure_filename(nombreFinal)
        imagen.save(nombre_seguro)
        blobFirebase = firebaseAlmacenamiento.blob(nombre_seguro)
        blobFirebase.upload_from_filename(nombre_seguro)
        # antes de que se elimine tenemos que guardar en el storage de firebase
        os.remove(nombre_seguro)
        blobFirebase.make_public()
        url = blobFirebase.public_url
        if coleccion == "categoria":
            firebase_categoria.child(id).update({"imagen":url})

        return {
            "ok":True,
            "message":"se agrego la imagen correctamente"
        }
       
    else:
        return {
            "ok":False,
            "message":"los campos son incorrectos, intente de nuevo mas tarde"
        }










    



if __name__ == '__main__':
    app.run(debug=True)