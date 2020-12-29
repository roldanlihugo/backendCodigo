from camelcase import CamelCase
camello = CamelCase('texto')
texto = "este texto necesita ser CamelCaseado"
print(camello.hump(texto))
