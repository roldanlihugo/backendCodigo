from django.shortcuts import render
from rest_framework import generics
from .models import ClienteModel
from . import serializers
# Create your views here.
# al no declarar un metodo get y un post automaticamente se conectara con el serializador para realizar los metodos internos y en el caso del get devolvera una lista con todas las instancia y en el caso del post simplemente lo creara y devolverá su objecto creado correctamente serializado
class ClientesView(generics.ListCreateAPIView):
    queryset = ClienteModel.objects.all() # SELECT * from T_cliente
    serializer_class = serializers.ClienteSerializer

