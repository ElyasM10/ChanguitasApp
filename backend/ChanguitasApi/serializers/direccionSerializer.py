from ChanguitasApi.models import Direccion
from rest_framework import serializers

class DireccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direccion
        fields = ['altura', 'calle', 'nroDepto', 'piso', 'barrio']