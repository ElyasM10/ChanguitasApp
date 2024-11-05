from rest_framework import status
from ChanguitasApi.models import Fotos
from rest_framework.response import Response
from ChanguitasApi.serializers import FotosSerializer
from rest_framework import viewsets

class FotosViewSet(viewsets.ModelViewSet):
    queryset = Fotos.objects.all()
    serializer_class = FotosSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Guarda la nueva Foto en la base de datos
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)