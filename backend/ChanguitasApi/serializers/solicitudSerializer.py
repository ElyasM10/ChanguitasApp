from rest_framework import serializers
from ChanguitasApi.models import Solicitud, ProveedorServicio, Cliente, Notificacion

class SolicitudSerializer(serializers.ModelSerializer):
    proveedorServicio = serializers.PrimaryKeyRelatedField(queryset=ProveedorServicio.objects.all())
    cliente = serializers.PrimaryKeyRelatedField(queryset=Cliente.objects.all())
    notificacion = serializers.PrimaryKeyRelatedField(queryset=Notificacion.objects.all())
    class Meta:
        model = Solicitud
        fields = [
            'id', 'comentario', 'fechaSolicitud', 'fechaTrabajo', 
            'fechaValoracion', 'valoracion', 'proveedorServicio', 
            'cliente', 'notificacion'
        ]