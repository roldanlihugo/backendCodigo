# SQL
# tipos de datos
# https://dev.mysql.com/doc/refman/8.0/en/data-types.html
# NUMERICOS (Los mas importantes)
# int: que acepta valores desde -2147483648 a 2147483647
# tinyint: -128 a 127
# smallint: -32768 a 32767
# float(m,d): "m"=> cantidad de numeros vamos a tener y "d"=> la cantidad de decimales

# TIEMPO Y FECHA
# date: su formato es YYYY-MM-DD desde el  1000-01-01 hasta el 9999-12-31
# datetime: su formato es YYYY-MM-DD HH:MM:SS
# timestamp: que no usa guiones ni dos puntos su formato es YYYYMMDDHHMMSS
# time: guarda HH:MM:SS

# STRING
# char(l): atributo que admite caracteres y entre parentesis se pone su longitud, 
# sino se pone, toma el valor por defecto de 1.
# varchar(l): este atributo lo que hace es separa espacio de memoria dinamicamente,
# es decir, si nosotros le pones una longitud de 30 caracteres pero solo ingresamos
# 10, solamente va a usar el espacio de memoria para los 10 caracteres. Entonces su
# longitud sera la longitud MAXIMA.
# text: es un tipo de atributo con un maximo de 65535 caracteres, generalmente se usa
# para las contraseñas encriptadas.