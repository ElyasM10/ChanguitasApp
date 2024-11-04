from rest_framework import serializers
from ChanguitasApi.models import Servicio, Proveedor, ProveedorServicio

class ProveedorServicioSerializer(serializers.ModelSerializer):
    servicio = serializers.PrimaryKeyRelatedField(queryset=Servicio.objects.all())
    proveedor = serializers.PrimaryKeyRelatedField(queryset=Proveedor.objects.all())
    class Meta:
        model = ProveedorServicio
        fields = ['id', 'servicio', 'proveedor', 'fechaDesde', 'fechaHasta']