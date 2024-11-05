from rest_framework import status
from ChanguitasApi.models import Notificacion
from rest_framework.response import Response
from ChanguitasApi.serializers import NotificacionSerializer
from rest_framework import viewsets

class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.all()
    serializer_class = NotificacionSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Guarda la nueva Notificacion en la base de datos
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)