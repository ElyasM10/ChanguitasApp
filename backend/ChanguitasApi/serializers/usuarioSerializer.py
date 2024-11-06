from ChanguitasApi.models import Usuario, Direccion
from rest_framework import serializers
from .direccionSerializer import DireccionSerializer

class UsuarioSerializer(serializers.ModelSerializer):
    direccion = DireccionSerializer()
    class Meta:
        model=Usuario
        fields = [
            'id', 'username', 'first_name', 'last_name', 'email', 'documento', 'telefono', 
            'fotoPerfil', 'fechaNacimiento', 'direccion'
        ]
        extra_kwargs = {
            'password': {'write_only': True}  # Para que la contraseña solo sea de escritura y no se envíe en las respuestas
        }
    def create(self, validated_data):
        # Extrae los datos de la dirección
        direccion_data = validated_data.pop('direccion')
        
        # Crea una nueva instancia de la dirección
        direccion = Direccion.objects.create(**direccion_data)
        
        # Crea el usuario y asocia la dirección creada
        usuario = Usuario.objects.create(direccion=direccion, **validated_data)
        return usuario