from django.urls import path
from .views import ClientesView

urlpatterns= [
    path('cliente', ClientesView.as_view()),
]