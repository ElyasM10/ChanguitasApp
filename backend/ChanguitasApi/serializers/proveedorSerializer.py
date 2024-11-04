from rest_framework import serializers
from ChanguitasApi.models import Proveedor
from .usuarioSerializer import UsuarioSerializer

class ProveedorSerializer(serializers.ModelSerializer):
    usuario=UsuarioSerializer()
    class Meta:
        model=Proveedor
        fields=['id','usuario','fechaDisponible','horarioDisponible']