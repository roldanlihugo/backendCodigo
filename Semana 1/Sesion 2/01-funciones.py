def saludar():
    """Funcion que sirve para decir buenas
    y algo mas
    """
    print('Hola buenas tardes')

saludar()

def saludar_con_nombre(nombre, departamento):
    """Funcion que recibe un nombre y un departamento para hacer un saludo mas personalizado
    """
    print("Hola {} saludos a {}".format(nombre, departamento))

saludar_con_nombre("Eduardo","Arequipa")


def calcularIGV(monto):
    monto = monto * 0.18
    if monto > 100:
        return 'Es mayor a 100', monto
    else:
        return 'Es menor a 100', monto
    # return monto

texto, igvCompra = calcularIGV(100)

print(texto, igvCompra)

# La variable *args es una lista dinamica que recibirá un numero indeterminado de elementos
def indeterminada(*args):
    print(args)
    # for elemento in args:
    #     print(elemento)

indeterminada('Eduardo',18,'Soltero','Peruana')
# indeterminada('Mocha',7,'Salchicha')
# indeterminada()

# **kwargs es una variable para recibir un numero indeterminado de parametros pero usando diccionarios
def indeterminada_diccionario(**kwargs):
    print(kwargs)

indeterminada_diccionario(nombres='Eduardo', nacionalidad='Peruana')

def combinada(*args, **kwargs):
    print(args)
    print(kwargs)

combinada('Juan','Ecuatoriano','Quito',estatura=1.76 )