from rest_framework import serializers
from ChanguitasApi.models import Servicio, EstadoServicio

class ServicioSerializer(serializers.ModelSerializer):
    estado = serializers.ChoiceField(choices=EstadoServicio.choices, default=EstadoServicio.INICIADO)
    class Meta:
        model = Servicio
        fields = ['id', 'nombreServicio', 'descripcion', 'estado']