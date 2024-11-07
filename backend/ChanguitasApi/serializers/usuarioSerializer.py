from django.contrib.auth import authenticate
from ChanguitasApi.models import Usuario, Direccion
from rest_framework import serializers
from .direccionSerializer import DireccionSerializer

class UsuarioSerializer(serializers.ModelSerializer):
    direccion = DireccionSerializer()
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model=Usuario
        fields = [
            'id', 'username', 'first_name', 'last_name', 'email', 'password','password2', 'documento', 'telefono', 
            'fotoPerfil', 'fechaNacimiento', 'direccion'
        ]
        extra_kwargs = {
            'password': {'write_only': True, 'required': True},  # Para que la contraseña solo sea de escritura y no se envíe en las respuestas
            'password2': {'write_only': True, 'required': True} #el required sirve para que cuando se crea un usuario sea obligatorio crearlo con contraseña
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Las contraseñas no coinciden.")
        return data
    
    def create(self, validated_data):
        # Extrae los datos de la dirección
        direccion_data = validated_data.pop('direccion')
        
        # Crea una nueva instancia de la dirección
        direccion = Direccion.objects.create(**direccion_data)
    
        # Crea el usuario y asocia la dirección creada
        usuario = Usuario.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            documento=validated_data['documento'],
            telefono=validated_data['telefono'],
            fechaNacimiento=validated_data['fechaNacimiento'],
            direccion=direccion
        )
        return usuario
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    def validate(self, data):
        usuario = authenticate(username=data['username'], password=data['password'])
        if usuario and usuario.is_active:
            return usuario
        raise serializers.ValidationError("Nombre de usuario o contraseña inválidos")