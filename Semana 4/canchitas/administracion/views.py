from .models import TipoCanchaModel, CanchaModel, Usuario
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import TipoCanchaSerializer, CanchaSerializer , UsuarioRegistroSerializer, LoginSerializer
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class TipoCanchasView(ListCreateAPIView):
    queryset = TipoCanchaModel.objects.all() # SELECT * FROM T_TIPOCANCHA
    serializer_class = TipoCanchaSerializer
    def get(self, request):
        print(self.get_queryset())
        respuesta = self.get_serializer(self.get_queryset(), many=True)
        return Response({
            'ok': True,
            'content':respuesta.data,
            'message': None
        })
    
    def post(self, request):
        # print(request.data)
        respuesta=self.get_serializer(data=request.data)
        # print(respuesta.is_valid(raise_exception=True))
        if respuesta.is_valid(raise_exception=False):
            # con el save se hace el guardado a la base de datos
            respuesta.save()
            return Response({
                'ok':True,
                'content':respuesta.data,
                'message':None
            }, status=status.HTTP_201_CREATED)
        
        else:
            return Response({
                'ok':False,
                'content':None,
                'message':'Hubo un error al crear el Tipo Cancha'
            },status=status.HTTP_400_BAD_REQUEST)

class TipoCanchaView(RetrieveUpdateDestroyAPIView):
    serializer_class = TipoCanchaSerializer
    queryset = TipoCanchaModel.objects.all()
    def get(self, request, tipoCanchaId):
        # el .get() devuelte todas las coincidencias del modelo mediante un filtro que va como parametro indicando el atributo(la columna de la bd) y su valor, tambien se puede usar el metodo filter
        print(self.get_queryset().filter(tipoCanchaId=tipoCanchaId))
        print(self.get_queryset().get(tipoCanchaId=tipoCanchaId))
        respuesta = self.get_serializer(self.get_queryset().get(tipoCanchaId=tipoCanchaId))
        # Una vez que nuestra informacion ya ha sido serializada, simplemente para obtener su informacion en tipo de diccionario llamamos a su atributo data la cual almancena lo necesitado
        return Response({
            'ok':True,
            'content':respuesta.data,
            'message':None
        })
    def put(self, request, tipoCanchaId):
        respuesta = self.get_serializer(self.get_queryset().get(tipoCanchaId=tipoCanchaId),data=request.data)
        if respuesta.is_valid():
            resultado = respuesta.update()
            return Response({
                'ok':True,
                'content':self.serializer_class(resultado).data,
                'message': None
            })
        else:
            return Response({
                'ok':False,
                'content': 'Hubo un error al actualizar el tipo de cancha'
            }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, tipoCanchaId):
        respuesta = self.get_serializer(self.get_queryset().get(tipoCanchaId=tipoCanchaId))
        resultado = respuesta.delete()
        return Response({
            'ok':True,
            'content': self.get_serializer(resultado).data,
            'message': 'Se inhabilito con exito el tipo de Cancha'
        }, status=status.HTTP_200_OK)

class CanchasView(ListCreateAPIView):
    queryset = CanchaModel.objects.all()
    serializer_class = CanchaSerializer
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        resultado = self.get_serializer(self.get_queryset(), many=True).data
        return Response({
            'ok':True,
            'content':resultado,
            'message':None
        })
    def post(self, request):
        respuesta = self.get_serializer(data=request.data)
        if respuesta.is_valid():
            respuesta.save()
            return Response({
                'ok':True,
                'message':'Cancha creada existosamente',
                'content':respuesta.data
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                'ok':False,
                'message':'Error al crear la cancha',
                'content':None
            },status=status.HTTP_400_BAD_REQUEST)

class RegistroView(CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioRegistroSerializer
    def post(self, request):
        # VALIDAR SI YA HAY UN USUARIO CON ESE EMAIL
        correo = request.data.get('usuCorreo')
        # el filter devuelve una LISTA de todas las coincidencias y el get si no hay indicara un error
        usuarios = self.get_queryset().filter(usuCorreo=correo).first()
        if usuarios:
            return Response({
                'ok': False,
                'message':'El usuario con correo {} ya existe'.format(correo,)
            },status = status.HTTP_400_BAD_REQUEST)
        else:
            respuesta = self.get_serializer(data=request.data)
            if respuesta.is_valid(raise_exception=True):
                resultado = respuesta.save()
                return Response({
                    'ok': True,
                    'content': self.get_serializer(resultado).data,
                    'message':'Usuario creado exitosamente'
                }, status=201)
            else:
                return Response({
                    'ok': False,
                    'message': 'Data Incorrecta'
                }, status=status.HTTP_400_BAD_REQUEST)

class LoginView(GenericAPIView):
    serializer_class = LoginSerializer
    def post(self, request):
        serializador = self.get_serializer(data=request.data)
        serializador.is_valid(raise_exception=True)
        return Response({
            'ok':True,
            'content':serializador.data
        })

