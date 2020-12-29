from django.urls import path
from .views import TipoCanchasView, TipoCanchaView, CanchasView, RegistroView, LoginView

urlpatterns = [
    path('tipoCancha',TipoCanchasView.as_view(), name="TipoCanchas"),
    path('tipoCancha/<int:tipoCanchaId>', TipoCanchaView.as_view()),
    path('cancha', CanchasView.as_view()),
    path('registro', RegistroView.as_view()),
    path('login', LoginView.as_view()),
]