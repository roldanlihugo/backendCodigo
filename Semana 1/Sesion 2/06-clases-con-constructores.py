class Persona:
    # Se usa el self para instanciar todos los atributos de la clase, se crean
    # con el constructor y se pueden usar en todos los metodos
    def __init__(self, nombre, ocupacion):
        self.nombre = nombre
        self.profesion = ocupacion
        self.preferencias = []

    def saludar(self):
        print('Bienvenido {}'.format(self.nombre))

objPersona = Persona('Eduardo','Informatico')
print(objPersona.preferencias)
objPersona.saludar()
