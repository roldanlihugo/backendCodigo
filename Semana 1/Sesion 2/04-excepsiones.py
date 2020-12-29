# Excepciones => try ... except ... finally
try:
    numero = int(input("Ingrese un numero"))
    # numero/0
except ValueError :
    print('Tiene que ser un numero')
# except ZeroDivisionError:
#     print('No se puede hacer la division entre cero')
except:
    print('Hubo un error')
# else => solamente va a funcionar si no entro a ningun except
else:
    print('Todo fue bien')
# el finally siempre va despues del except y se va a ejecutar si hubo un error o no hubo error
finally:
    print('Yo siempre me ejecuto')
print('Yo soy otra linea de codigo')