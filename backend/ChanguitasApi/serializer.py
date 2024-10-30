
from rest_framework import serializers
from . models import *

class ReactSerializer (serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'documento', 'nombre', 'apellido', 'correoElectronico', 'contraseña', 'telefono', 'fotoPerfil','fechaNacimiento','direccion']