from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from rest_framework import status
from ChanguitasApi.models import Cliente
from rest_framework.response import Response
from ChanguitasApi.serializers import ClienteSerializer

# Create your views here.
class ClienteView(APIView):
    def get(self,request): #obtener la lista de todos los clientes.
        clientes = Cliente.objects.all()
        serializer = ClienteSerializer(clientes,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK) #Get exitoso
    
    def post(self,request): #para crear un nuevo cliente
        serializer = ClienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) #creado exitosamente
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) #datos enviados en POST invalidos