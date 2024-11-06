from ChanguitasApi.models import Direccion
from rest_framework import serializers

class DireccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direccion
        fields = ['calle', 'altura', 'piso', 'nroDepto', 'barrio']