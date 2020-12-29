# Operadores Aritmeticos
# Suma, resta, multiplicacion, division, modulo, exponente, cociente
valor1 = 10
valor2 = 20
resultado = valor1 + valor2
print("El resultado es:",resultado)
resultado = valor1 - valor2
# print('La resta es: {}{}{}'.format(valor1,valor2,resultado))
print('La resta es: {}'.format(resultado))
resultado = valor1 * valor2
print('La multiplicacion es: {}'.format(resultado))
# La division es
resultado = valor1 / valor2
# El modulo
resultado = valor1 % valor2
print(resultado)
# El exponente
resultado = valor1 ** valor2
# El cociente
resultado = valor1 // valor2
print(resultado)

# OPERADORES DE ASIGNACION
# Igual =
# Incremento +=
# Decremento -=
# Multiplicacion *=
# Division /= 
# Potencia **=
# valor1 /= 3 seria lo mismo que poner valor1 = valor1 / 3
# valor **= 3 seria lo mismo que poner valor1 = valor1 ** 3

# OPERADORES DE COMPARACION
# == para saber si el valor de la izq es igual que el de la der
# != para saber si el valor de la izq es diferente que el de la der
# <, > es menor, es mayor que
# <=, >=, es menor igual, es mayor igual que

num1, num2 = 23, 31
print(num1 <= num2)

# OPERADORES LOGICOS
# and = si las dos condiciones son verdaderas entonces todo es verdadero
# or = si alguna de las dos son verdaderas entonces todo es verdadero
# not = si es falso es verdadero y si es verdadero es falso
# En javascript el and = &&, el or = || 
print(not ((10<20) or (20<15)))

# OPERADORES DE IDENTIDAD
# is => es
# is not => no es
# sirve para ver si estan apuntando a la misma direccion de memoria
verduras=['coliflor','alcachofa']
verduras2 = verduras
verdura = 'albhaca'
print(verduras2 is not verduras)
print(verdura == 'albhacas')

# OPERADOR DE PERTENECIA
# in => si esta
# not int => si no esta
print('tomate' not in verduras)