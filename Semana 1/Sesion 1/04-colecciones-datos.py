# Listas
meses = ['Enero', 'Febrero', 'Marzo']
# print(meses[1])

# Si usamos posiciones negativas contará de atras hacia adelante
# print(meses[-1])

# Para traer elementos con limites, el primero indica desde donde 
# y el segundo hasta que sea menor que
# print(meses[0:2])

# Para agregar elementos a la Lista
meses.append(['Abril','Diciembre'])
# print(meses[-1][1])

# Para quitar un elemento de la lista
meses.remove('Febrero')
# print(meses)

# Para limpiar toda la lista
meses.clear()
# print(meses)

# Tuplas
# colecciones de datos ORDENADAS NO SE PUEDEN MODIFICAR
datos_sensibles = (123456, 'Eduardo', 1.87)
# print(datos_sensibles[0])

# Para ver cuantos valores repetidos tenemos en la tupla
# print(datos_sensibles.count(123456))

# Conjuntos
# Coleccion de elementos DESORDENADA, no hay orden para acceder a sus datos
colores = {'rojo', 'verde', 'azul', 'morado'}
colores.add('blanco')
# print(colores)
# for color in colores:
#     print(color)

# Diccionarios
# coleccion de elementos que estan INDEXADOS, no estan ordenados y se pueden modificar 
# sus valores. Estan conformados por una CLAVE y un VALOR
persona = {
    'id':100,
    'nomb_per':'Fabian',
    'fec_nac':'1992/08/01',
    'sex_per': 'M',
    'tipo_per':{
        'tiper_id':1,
        'tiper_desc':'Employee'
    }
}
# Para ver el valor de la clave en especifico
print(persona['tipo_per']['tiper_desc'])

# Para ver todas sus llaves
print(persona.keys())

# Para ver todos sus valores
print(persona.values())

# Agregar un item al diccionario
persona['per_ubigeo']='04001'
# persona['nomb_per']='Julian'
print(persona)
