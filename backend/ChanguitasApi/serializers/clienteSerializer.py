from rest_framework import serializers
from ChanguitasApi.models import Cliente
from .usuarioSerializer import UsuarioSerializer

class ClienteSerializer(serializers.ModelSerializer):
    usuario=UsuarioSerializer()
    class Meta:
        model=Cliente
        fields=['id','usuario']