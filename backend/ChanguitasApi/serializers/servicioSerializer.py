from rest_framework import serializers
from ChanguitasApi.models import DiasSemana, Servicio

class ServicioSerializer(serializers.ModelSerializer):
    dia = serializers.ChoiceField(choices=DiasSemana.choices, required=True)
    desdeHora = serializers.TimeField(required=True)
    hastaHora = serializers.TimeField(required=True)

    class Meta:
        model = Servicio
        fields = ['id', 'nombreServicio', 'descripcion', 'dia', 'desdeHora', 'hastaHora']

    # Validación general para verificar que desdeHora sea menor que hastaHora
    def validate(self, data):
        if data['desdeHora'] >= data['hastaHora']:
            raise serializers.ValidationError("La hora de inicio debe ser menor que la hora de fin.")
        return data
