from rest_framework import status
from ChanguitasApi.models import ProveedorServicio
from rest_framework.response import Response
from ChanguitasApi.serializers import ProveedorServicioSerializer
from rest_framework import viewsets

class ProveedorServicioViewSet(viewsets.ModelViewSet):
    queryset = ProveedorServicio.objects.all()
    serializer_class = ProveedorServicioSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Guarda el nuevo ProveedorServicio en la base de datos
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)