from rest_framework import serializers
from .models import ClienteModel
class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClienteModel
        fields = '__all__'