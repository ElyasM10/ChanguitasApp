from ChanguitasApi.models import Usuario, Direccion
from rest_framework import serializers
from .direccionSerializer import DireccionSerializer

class UsuarioSerializer(serializers.ModelSerializer):
    direccion = DireccionSerializer()
    class Meta:
        model=Usuario
        fields = [
            'id', 'username', 'first_name', 'last_name', 'email', 'documento', 'telefono', 
            'fotoPerfil', 'fechaNacimiento', 'direccion', 'groups', 'user_permissions'
        ]
        extra_kwargs = {
            'password': {'write_only': True}  # Para que la contraseña solo sea de escritura y no se envíe en las respuestas
        }
    def create(self, validated_data):
        direccion_data = validated_data.pop('direccion')  # Extrae la data de Direccion
        direccion = Direccion.objects.create(**direccion_data)  # Crea la Direccion
        groups_data = validated_data.pop('groups', None)
        permissions_data = validated_data.pop('user_permissions', None)
        usuario = Usuario.objects.create(direccion=direccion, **validated_data)  # Crea el Usuario
        if groups_data:
            usuario.groups.set(groups_data)  # Establecer los grupos usando el método set
        if permissions_data:
            usuario.user_permissions.set(permissions_data)
        return usuario