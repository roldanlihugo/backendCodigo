class Vehiculo:
    def __init__(self, marca, modelo):
        self.marca = marca
        self.modelo = modelo
        self.acelerar = False
    
    def acelerar(self):
        self.acelerar = True
    
    def estado(self):
        return "Marca:",self.marca,"\nModelo:",self.modelo,"\nAcelera:",self.acelerar

class Moto(Vehiculo):
    hacer_piruetas = ""
    def __init__(self, marca, modelo, piruetas):
        self.hacer_piruetas = piruetas
        super().__init__(marca,modelo)
    
    def pirueta(self):
        self.hacer_piruetas = "Estoy haciendo piruetas"
        return self.hacer_piruetas

class Camion(Vehiculo):
    def cargar(self, cargar):
        self.cargado = cargar
        if self.cargado:
            return 'El camion esta con carga'
        else:
            return 'El camion tiene espacio para cargar'

objVehiculo = Vehiculo('Volkswagen','Jetta')
objMoto = Moto('Yamaha','N300','Caballito y backflip')
print(objVehiculo.estado())
print(objMoto.pirueta())