
from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from rest_framework import status
from . models import *
from rest_framework.response import Response
from . serializer import *
from rest_framework import viewsets

# Create your views here.


#class ReactView(APIView):


 ##   serializer_class = ReactSerializer

   ## def get(self, request):
      ##  output = [{"employee": output.employee, "department": output.department}
    ##              for output in React.objects.all()]
  ##      return Response(output)

##    def post(self, request):

     ##   serializer = ReactSerializer(data=request.data)
    #    if serializer.is_valid(raise_exception=True):
   #         serializer.save()
  #         return Response(serializer.data)
       
class DireccionView(APIView):

    def create_hardcoded_direccion(self):
        # Crea una dirección hardcodeada solo si no existe
        if not Direccion.objects.filter(calle='Calle Ejemplo', altura=123).exists():
            direccion = Direccion(
                altura=123,
                calle='Calle Ejemplo',
                nroDepto=5,
                piso=2,
                barrio='Barrio Ejemplo'
            )
            direccion.save()

    def get(self, request, pk=None, *args, **kwargs):
        self.create_hardcoded_direccion()  # Crea la dirección si no existe
        if pk:
            direccion = get_object_or_404(Direccion, pk=pk)
            serializer = DireccionSerializer(direccion)
            return Response(serializer.data)
        else:
            direcciones = Direccion.objects.all()
            serializer = DireccionSerializer(direcciones, many=True)
            return Response(serializer.data)

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Guarda el nuevo usuario en la base de datos
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UsuarioView(APIView):
    def get(self, request, pk=None, *args, **kwargs):
        if pk:
            usuario = get_object_or_404(Usuario, pk=pk)
            serializer = UsuarioSerializer(usuario)
            return Response(serializer.data)
        else:
            usuarios = Usuario.objects.all()
            serializer = UsuarioSerializer(usuarios, many=True)
            return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ClienteView(APIView):
    def get(self,request): #obtener la lista de todos los clientes.
        clientes=Cliente.objects.all()
        serializer=ClienteSerializer(clientes,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK) #Get exitoso
    
    def post(self,request): #para crear un nuevo cliente
        serializer = ClienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) #creado exitosamente
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) #datos enviados en POST invalidos