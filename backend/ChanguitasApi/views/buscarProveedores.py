from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ChanguitasApi.models import Servicio

class BuscarProveedoresAPIView(APIView):
    def get(self, request, *args, **kwargs):
        nombre_servicio = request.query_params.get('nombre_servicio', None)
        if not nombre_servicio:
            return Response({"error": "Debe proporcionar el nombre del servicio"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            servicio = Servicio.objects.get(nombreServicio=nombre_servicio)
        except Servicio.DoesNotExist:
            return Response({"error": "Servicio no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        proveedores = servicio.obtener_proveedores()
        proveedores_data = [
            {
                "username": proveedor.username,
                "nombre": proveedor.first_name,
                "apellido": proveedor.last_name,
                "email": proveedor.email,
                "puntaje": proveedor.puntaje,
                "fotoPerfil": proveedor.fotoPerfil.url if proveedor.fotoPerfil else None
            }
            for proveedor in proveedores
        ]
        
        return Response({"proveedores": proveedores_data}, status=status.HTTP_200_OK)
