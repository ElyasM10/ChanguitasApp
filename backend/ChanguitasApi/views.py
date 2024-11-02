
from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
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
        
class UsuarioView(APIView):
    
    def create_hardcoded_usuario(self):
    # Verifica si el usuario ya existe en la base de datos
     if not Usuario.objects.filter(username="usuario_ejemplo").exists():
        # Verifica si la dirección ya existe
        direccion, created = Direccion.objects.get_or_create(
            altura=123,            
            calle="Calle Ejemplo", 
            defaults={
                'nroDepto': 1,
                'piso': 2,
                'barrio': "Barrio Ejemplo"
            }
        )
        
        # Crea un nuevo usuario
        usuario = Usuario(
            username="usuario_ejemplo",
            first_name="Nombre",
            last_name="Apellido",
            email="usuario@example.com",
            documento=12345678,
            telefono=5551234,
            fechaNacimiento="1990-01-01",
            direccion=direccion  # Asigna la dirección aquí
        )
        
        # Establece la contraseña del usuario
        usuario.set_password('contraseña123')
        
        # Guarda el usuario en la base de datos
        usuario.save()

    def get(self, request, pk=None, *args, **kwargs):
        self.create_hardcoded_usuario()  # Crea el usuario si no existe
        if pk:
            usuario = get_object_or_404(Usuario, pk=pk)
            serializer = UsuarioSerializer(usuario)
            return Response(serializer.data)
        else:
            usuarios = Usuario.objects.all()
            serializer = UsuarioSerializer(usuarios, many=True)
            return Response(serializer.data)