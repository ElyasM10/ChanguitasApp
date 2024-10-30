
from django.shortcuts import render
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