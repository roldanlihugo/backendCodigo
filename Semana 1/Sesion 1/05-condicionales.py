# Condicional IF ELSE
edad_juan = 70
edad_min = 18
# Si la condicion es Verdadera, entrara al IF, caso contrario entrara al ELSE
# if edad_juan > edad_min:
#     print('Puedes entrar al tono')
# else:
#     print('Anda a jugar play')

# elif sinosi y siempre va antes del else y se usa generalmente en vez del switch case

# Si juan tiene mas de 65 no puede ingresar al tono 
# if edad_juan > edad_min and edad_juan < 65:
#     print('Puedes entrar al tono')
# elif edad_juan >= 65:
#     print('Muy mayor para entrar')
# else:
#     print('Anda a jugar play')

# Ingresar un numero y ver si es mayor a cero, si es cero o si es menor a cero
# numero = input('Ingrese un numero')
# numero = int(numero)
# numero = int(input('Ingrese un numero'))
# if numero > 0:
#     print('El numero es positivo')
# elif numero == 0:
#     print('El numero es cero')
# else:
#     print('El numero es negativo')

# if numero < 0 :
#     print('El numero es NEGATIVO')
# elif numero > 0:
#     print ('El numero es POSITIVO')
# else:
#     print('El numero es CERO')


# ver si un numero ingresado por teclado es PAR O IMPAR
# numero=int(input('ingrese un numero'))
# if (numero%2==0):
#     print('Numero PAR')
# else:
#     print('Numero IMPAR')

# for 
# es usado para iterar sobre una secuencia de elementos
# nombre = 'Eduardo Ramiro'
# for letra in nombre:
#     print(letra, end='')

# for iteracion in range(0,10,1):
#     print(iteracion)
# en el for personalizado se puede utilizar de 1 a 3 parametros en el range, si usamos solo uno; ese era el tope y partira de 0 y con un incremento de 1.
# si usamos dos parametros, el primero sera el inicio o el piso, el segundo el tope y con un incremento de 1
# si usamos tres parametros,el primero sera el inicio o el piso, el segundo el tope y el tercero el incremento

# dentro del for se puede usar el break para cerrar el bucle
# for i in range(10):
#     print(i)
#     if i == 6:
#         break

# parar la iteraccion actual CONTINUE
# for i in range(20):
#     if i== 10:
#         continue
#     print(i)


# while => es un bucle que se va a realizar de manera infinita mientras que la condicion sea verdadera
# numero = 10
# tope = 30
# while(numero< tope):
#     print(numero)
    # numero += 1

# pass => pasa la iteracion y no hace nada pero el beneficio es que no emite un error de bloque de identacion
# numeros = [1,2,3,4,5]
# for numero in numeros:
#     pass
# print('adios')


# Ingresar su nombre y que diga cuantas vocales hay 
# Silvia
# cad=input('Ingrese una Cadena de Texo: ')
# voc = 0
# for c in cad:
#     if c in "aeiouAEIOU":
#         voc = voc + 1
# print('El número de vocales en la Cadena de Texto es: ', voc)

# cad=str(input('Ingrese una Cadena de Texto: '))
# voc=0
# for i in range(0, len(cad)):
#     if cad[i] =='a' or cad[i] =='A' or cad[i] =='e' or cad[i] =='E' or cad[i] =='i' or cad[i] =='I' or cad[i] =='o' or cad[i] =='O' or cad[i] =='u' or cad[i] =='U':
#         voc=voc+1           
# print('El número de vocales en la Cadena de Texto es: ', voc)

# Moises
# elegidas = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']
# nombre = input('Ingrese su nombre: ')
# contador = 0
# for letra in elegidas:
#     vocals = nombre.count(letra)
#     contador = contador + vocals
# print(contador)

# Fernando
# nombre=input("ingrese nombre")
# vocales="aeiouAEIOU"
# cantidad=0
# for letra in nombre:
#     for vocal in vocales:
#         if letra==vocal:
#             cantidad=cantidad+1
# if cantidad==1:
#     print("el nombre ",nombre," tiene ",cantidad," vocal")
# elif cantidad==0: 
#     print("el nombre ",nombre," no tiene vocales")
# else:
#     print("el nombre ",nombre," tiene ",cantidad," vocales")

# Eduardo
# nombre = input("Ingrese un nombre")
# vocales=['a','e','i','o','u','A','E','I','O','U']
# contador = 0
# for letra in nombre:
#     for vocal in vocales:
#         if letra == vocal:
#             contador += 1
#             break
# print('El nombre ingresado tiene {} vocales'.format(contador))