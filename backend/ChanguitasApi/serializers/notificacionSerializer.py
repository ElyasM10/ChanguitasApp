from rest_framework import serializers
from ChanguitasApi.models import Notificacion

class NotificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacion
        fields = ['id', 'fechaHora', 'mensaje', 'tipoSistema', 'Usuario']