class Articulo:
    def __init__(self, nombre):
        self.nombre = nombre
    
    def __str__(self):
        return 'Yo soy el objeto con articulo {}'.format(self.nombre)

objArticulo = Articulo('cuchara 5ml')
print(objArticulo)

# Se desea crear tres clases a partir de una padre (Vehiculo): Aeronave, Motocicleta y Motocicleta-Electrica, de acuerdo a su abstraccion ver que atributos entre ellos 4 comparten y cuál sería la clase padre, hija y nieta, tambien utilizar getter, setter y deletter para las clases y al menos un metodo privado.