class Persona:
    def __init__(self, nombre, fecha_nacimiento, nacionalidad, dni):
        self.nombre = nombre
        self.fec_nacimiento = fecha_nacimiento
        self.nacionalidad = nacionalidad
        self.dni = dni
    def descripcion(self):
        return 'Nombre: {}, Fecha Nacimiento: {}, Nacionalidad: {}, DNI: {}'.format(self.nombre, self.fec_nacimiento, self.nacionalidad, self.dni)
    def metodoPadre(self, atributo=None):
        print('Soy el metodoPadre con atributo ',atributo)

class Empleado(Persona):
    def __init__(self, nombre, fec_nacimiento, nacionalidad, dni, salario, cargo, fech_inicio, profesion, seguro):
        super().__init__(nombre, fec_nacimiento, nacionalidad, dni)
        self.salario = salario
        self.cargo = cargo
        self.fecha_inicio = fech_inicio
        self.profesion = profesion
        self.seguro = seguro
    
    def descripcion(self):
        resultado =  super().descripcion()
        print(resultado, "Salario: {}, Cargo: {}, Fecha de Contratación: {}, Profesion: {}, Seguro:{}".format(self.salario, self.cargo, self.fecha_inicio, self.profesion, self.seguro))
        super().metodoPadre('holaaa')

objPersona = Persona('Jose','1994/07/20','Brasileña','73526487')
print(objPersona.descripcion())

objEmpleado = Empleado('Julieta','2000/01/14','Peruana','46523765',1250.00,'Jefa de Ventas','2020/01/10','Ing Industrial','00052147')
objEmpleado.descripcion()

