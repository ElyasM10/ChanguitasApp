
from rest_framework import serializers
from .models import *

#class ReactSerializer (serializers.ModelSerializer):
 #   class Meta:
  #      model = Usuario
  #      fields = ['id', 'documento', 'nombre', 'apellido', 'correoElectronico', 'contraseña', 'telefono', 'fotoPerfil','fechaNacimiento','direccion']
  
class DireccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direccion
        fields = ['altura', 'calle', 'nroDepto', 'piso', 'barrio']

class UsuarioSerializer(serializers.ModelSerializer):
    direccion=DireccionSerializer()
    class Meta:
        model=Usuario
        fields = [
            'id', 'username', 'first_name', 'last_name', 'email', 'documento', 'telefono', 
            'fotoPerfil', 'fechaNacimiento', 'direccion', 'groups', 'user_permissions'
        ]
        extra_kwargs = {
            'password': {'write_only': True}  # Para que la contraseña solo sea de escritura y no se envíe en las respuestas
        }