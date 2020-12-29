import uuid
from firebaseconfig import firebase_categoria
class CategoriaCollection:
    def __init__(self,descripcion, abreviatura, imagen):
        self.descripcion = descripcion
        self.abreviatura = abreviatura
        self.imagen = imagen
    def save(self):
        # con el metodo uuid1 genero una clave unica para que pueda ser usada de key para mi documento
        # un UUID es un identificador unico universal
        id = str(uuid.uuid1())
        # el metodo child sirve para ingresar a todos sus registros de esa colleccion
        # el metodo set sirve para registrar un nuevo documento en mi base de datos y tambien para sobreescribir un registro ya creado
        registro={
            "descripcion":self.descripcion,
            "abreviatura": self.abreviatura,
            "imagen":self.imagen
        }
        firebase_categoria.child(id).set(registro)
        return True

