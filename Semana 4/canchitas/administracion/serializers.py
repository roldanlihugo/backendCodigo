from rest_framework import serializers
from .models import TipoCanchaModel, CanchaModel, LocalModel, Usuario
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed

class LocalSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocalModel
        fields = '__all__'


class CanchaSerializer(serializers.ModelSerializer):
    local = LocalSerializer(source='localId', read_only=True)
    class Meta:
        model = CanchaModel
        fields = '__all__'
        # exclude=['localId']

class TipoCanchaSerializer(serializers.ModelSerializer):
    # la forma correcta de hacer una relacion inversa
    canchas = CanchaSerializer(source='canchasTipoCancha',many=True, read_only=True)
    class Meta:
        model = TipoCanchaModel
        # se usa o el atributo fields o el atributo exclude
        # los campos detallados (ya sea para el fields o el exclude) se usa el nombre de los atributos del modelo mas no el nombre de la columna en la bd (db_column)
        fields = '__all__'
        # exclude = ['createdAt']
    def update(self):
        # print(self.instance.tipoCanchaDesc)
        # print(self.validated_data)
        self.instance.tipoCanchaDesc = self.validated_data.get('tipoCanchaDesc', self.instance.tipoCanchaDesc)
        self.instance.save()
        return self.instance
    def delete(self):
        # hacer el comportamiento para que al llamar al metodo delete su estado de la instancia cambie a false
        self.instance.estado = False
        self.instance.save()
        return self.instance

class UsuarioRegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = Usuario
        exclude = ['last_login']
    def save(self):
        password = self.validated_data.get('password')
        is_superuser = self.validated_data.get('is_superuser')
        usuCorreo = self.validated_data.get('usuCorreo')
        usuNombre = self.validated_data.get('usuNombre')
        usuFono = self.validated_data.get('usuFono')
        usuCumple = self.validated_data.get('usuCumple')
        is_staff = self.validated_data.get('is_staff')
        
        nuevoUsuario = Usuario(is_superuser=is_superuser, usuCorreo=usuCorreo, usuNombre=usuNombre, usuFono=usuFono, usuCumple=usuCumple,is_staff=is_staff)
        nuevoUsuario.set_password(password)
        nuevoUsuario.save()
        return nuevoUsuario

class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=50, min_length=5)
    password = serializers.CharField(max_length=50, min_length=6, write_only=True)
    class Meta:
        model = Usuario
        fields = ['email','password', 'tokens']
    # esta funcion no le podemos poner otro nombre, puesto que va relacionada con el is_valid() del serializador
    def validate(self, attrs):
        email = attrs.get('email','')
        password = attrs.get('password','')
        usuario = auth.authenticate(usuCorreo=email, password=password)
        if not usuario:
            raise AuthenticationFailed('Credenciales invalidas, intentelo de nuevo')
        return {
            'email': usuario.usuCorreo,
            'tokens': usuario.tokens()
        }