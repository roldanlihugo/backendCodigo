# pip install flask
from flask import Flask, request
# pip install flask-cors
from flask_cors import CORS
# Crear una instancia de la clase
app = Flask(__name__)
# HABILITA LOS ACCESOS (CORS) PARA TODOS LOS DOMINIOS Y TODOS LOS VERBOS
CORS(app)
tiendas = []
# Es un ENDPOINT
# 127.0.0.1:8000/
@app.route("/")
def inicio():
    return "Servidor corriendo exitosamente"
# Los verbos HTTP mas comunes para trabajar son:
# GET => se usa para solicitar informacion sin mandar nada por el BODY
# POST => se usa para crear y se mandar informacion por el BODY
# PUT => se usa para actualizar algun registro y la informacion se manda por el BODY
# DELETE => se usa para eliminar algun registro y su identificador se manda por la URL
@app.route("/tienda/<int:id>", methods=['GET','PUT', 'DELETE'])
def tienda(id):
    if len(tiendas) > id:
        if request.method == "GET":
            return{
                "ok": True,
                "content": tiendas[id],
                "message": None
            }
        elif request.method == "PUT":
            data = request.get_json()
            tiendas[id] = data
            return {
                "ok": True,
                "content":tiendas[id],
                "message":"Se actualizo la tienda correctamente"
            }, 201
        elif request.method == "DELETE":
            # existen 3 metodos pop(id) - remove("se manda todo lo que lo contiene") -  del tiendas[id]
            # 1 forma
            tienda = tiendas.pop(id)
            return {
                "ok": True,
                "content": tienda,
                "message": "Se elimino la tienda correctamente"
            }, 200

            # 2 forma
            del tiendas[id]
            return {
                "ok": True,
                "content": None,
                "message": "Se elimino la tienda correctamente"
            }, 200
    else:
        return {
            "ok":False,
            "content":None,
            "message":"La tienda no existe"
        }
    # agregar el comportamiento para eliminar una tienda segun su ID

@app.route("/tienda/buscar/<string:palabra>")
def buscador(palabra):
    resultado = []
    for tienda in tiendas:
        # print(palabra.lower())
        if palabra.lower() in tienda['nombre'].lower():
            resultado.append(tienda)
    if resultado:
            
        return {
            "ok": True,
            "content": resultado,
            "message": None
        }
    else:
        return {
            "ok":False,
            "message":"No hay resultados",
            "content": None
        }, 404
@app.route("/tiendas", methods=["GET","POST"])
def manejo_tiendas():
    # print(request.method)
    if request.method == "GET":
        if tiendas:
            return {
                "ok":True,
                "content": tiendas,
                "message": None
            }, 200
        else:
            return {
                "ok":False,
                "content":None,
                "message":"No hay tiendas"
            }, 404
    elif request.method == "POST":
        # el metodo get_json AUTOMATICAMENTE transforma el JSON enviado por el FRONT a un DICCIONARIO
        data = request.get_json()
        tiendas.append(data)
        return {
            "ok":True,
            "content": None,
            "message":"La tienda se agrego exitosamente"
        }, 201

app.run(debug=True, port=8000)