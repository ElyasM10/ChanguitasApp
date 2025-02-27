from rest_framework import status
from ChanguitasApi.models import ProveedorServicio, Servicio,Usuario
from rest_framework.response import Response
from ChanguitasApi.serializers import ServicioSerializer
from rest_framework import viewsets
from rest_framework.decorators import action

class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer

    def create(self, request, *args, **kwargs):
        # manejo para múltiples registros
        if isinstance(request.data, list):
            serializer = self.get_serializer(data=request.data, many=True)
            if serializer.is_valid():
                self.perform_create(serializer)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Manejo para un único registro
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                self.perform_create(serializer)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #Para traer los servicios que tiene vinculado un usuario
    @action(detail=False, methods=['get'], url_path='por-usuario/(?P<usuario_id>[^/.]+)')
    def por_usuario(self, request, usuario_id=None):
        try:
            # Busca el usuario
            usuario = Usuario.objects.get(id=usuario_id)
            
            # Obtiene los servicios asociados al usuario
            proveedor_servicios = ProveedorServicio.objects.filter(proveedor=usuario)
            servicios = [proveedor_servicio.servicio for proveedor_servicio in proveedor_servicios]
            
            # Obtenga servicios únicos para evitar duplicados
            servicios = list({ps.servicio.id: ps.servicio for ps in proveedor_servicios}.values())

            # Serializa los servicios
            serializer = ServicioSerializer(servicios, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Usuario.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()  # Obtiene el servicio a eliminar
        self.perform_destroy(instance)  # Elimina el servicio de la base de datos
        return Response({"message": "Servicio eliminado correctamente."}, status=status.HTTP_200_OK)