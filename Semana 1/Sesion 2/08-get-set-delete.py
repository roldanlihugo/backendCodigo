class Persona:
    def __init__(self):
        self.__nombre = ''
        self.__direccion = ''
        self.__telefono = ''

    def __setName(self, name):
        self.__nombre = name

    def __getName(self):
        return self.__nombre
    
    def __deleteName(self):
        del self.__nombre
    # El metodo property sirve para definir nuestras funciones get, set, delete
    nombre = property(__getName,__setName, __deleteName)
    # Si usamos correctamente los get, set, delete entonces no se debe de utilizar las funciones del get, set , delete

objPersona = Persona()
objPersona.nombre = "Eduardo"
print(objPersona.nombre)
del objPersona.nombre
# print(objPersona.name)