from django.contrib.auth import authenticate
from ChanguitasApi.models import Usuario, Direccion
from rest_framework import serializers
from .direccionSerializer import DireccionSerializer

class UsuarioSerializer(serializers.ModelSerializer):
    direccion = DireccionSerializer()
    password2 = serializers.CharField(write_only=True, required=False)  # password2 solo se necesita en la creación
    password = serializers.CharField(write_only=True, required=False)   # password es opcional en la actualización

    class Meta:
        model = Usuario
        fields = [
            'id', 'username', 'first_name', 'last_name', 'email', 'password','password2', 'documento', 'telefono', 
            'fotoPerfil', 'fechaNacimiento', 'direccion'# 'fechaDisponible', 'horarioDisponible'
        ]
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},  # No es obligatorio en la actualización
            'password2': {'write_only': True, 'required': False},  # No es obligatorio en la actualización
            'direccion': {'required': False}
        }

    def validate(self, data):
        # Verifica unicidad para email, username y telefono
        email = data.get('email', None)
        username = data.get('username', None)
        telefono = data.get('telefono', None)

        # Validación de correo electrónico
        if email and Usuario.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "El correo electrónico ya está en uso."})

        # Validación de nombre de usuario
        if username and Usuario.objects.filter(username=username).exists():
            raise serializers.ValidationError({"username": "El nombre de usuario ya está en uso."})

        # Validación de número de teléfono
        if telefono and Usuario.objects.filter(telefono=telefono).exists():
            raise serializers.ValidationError({"telefono": "El número de teléfono ya está en uso."})

        # Validación de contraseñas coincidentes
        if 'password' in data and 'password2' in data:
            if data['password'] != data['password2']:
                raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})

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
            direccion=direccion,
         #   fechaDisponible=validated_data['fechaDisponible'],
          #  horarioDisponible=validated_data['horarioDisponible'],
        )
        return usuario
    
    def update(self, instance, validated_data):
        # Handle password update
        if 'password' in validated_data:
            instance.set_password(validated_data.pop('password'))
        
        # Handle address update
        if 'direccion' in validated_data:
            direccion_data = validated_data.pop('direccion')
            if instance.direccion:
                for key, value in direccion_data.items():
                    setattr(instance.direccion, key, value)
                instance.direccion.save()
            else:
                direccion = Direccion.objects.create(**direccion_data)
                instance.direccion = direccion
        
        # Update remaining fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    def validate(self, data):
        usuario = authenticate(username=data['username'], password=data['password'])
        if usuario and usuario.is_active:
            return {'user': usuario}
        raise serializers.ValidationError("Nombre de usuario o contraseña inválidos")