from rest_framework import serializers
from ChanguitasApi.models import Fotos

class FotosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fotos
        fields = ['id', 'fotos', 'fechaHora', 'proveedor']