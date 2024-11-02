
from rest_framework import serializers
from .models import *

#class ReactSerializer (serializers.ModelSerializer):
 #   class Meta:
  #      model = Usuario
  #      fields = ['id', 'documento', 'nombre', 'apellido', 'correoElectronico', 'contraseña', 'telefono', 'fotoPerfil','fechaNacimiento','direccion']
  
class DireccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direccion
        fields = ['altura', 'calle', 'nroDepto', 'piso', 'barrio']


class UsuarioSerializer(serializers.ModelSerializer):
    direccion=DireccionSerializer()
    class Meta:
        model=Usuario
        fields = [
            'id', 'username', 'first_name', 'last_name', 'email', 'documento', 'telefono', 
            'fotoPerfil', 'fechaNacimiento', 'direccion', 'groups', 'user_permissions'
        ]
        extra_kwargs = {
            'password': {'write_only': True}  # Para que la contraseña solo sea de escritura y no se envíe en las respuestas
        }


class ClienteSerializer(serializers.ModelSerializer):
    usuario=UsuarioSerializer()
    class Meta:
        model=Cliente
        fields=['id','usuario']


class ProveedorSerializer(serializers.ModelSerializer):
    usuario=UsuarioSerializer()
    class Meta:
        model=Proveedor
        fields=['id','usuario','fechaDisponible','horarioDisponible']


class FotosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fotos
        fields = ['id', 'fotos', 'fechaHora', 'proveedor']


class NotificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacion
        fields = ['id', 'fechaHora', 'mensaje', 'tipoSistema', 'Usuario']


class ServicioSerializer(serializers.ModelSerializer):
    estado = serializers.ChoiceField(choices=EstadoServicio.choices, default=EstadoServicio.INICIADO)
    class Meta:
        model = Servicio
        fields = ['id', 'nombreServicio', 'descripcion', 'estado']


class ProveedorServicioSerializer(serializers.ModelSerializer):
    servicio = serializers.PrimaryKeyRelatedField(queryset=Servicio.objects.all())
    proveedor = serializers.PrimaryKeyRelatedField(queryset=Proveedor.objects.all())
    class Meta:
        model = ProveedorServicio
        fields = ['id', 'servicio', 'proveedor', 'fechaDesde', 'fechaHasta']


class CategoriaSerializer(serializers.ModelSerializer):
    categoria_padre = serializers.PrimaryKeyRelatedField(queryset=Categoria.objects.all(), allow_null=True)
    servicio = serializers.PrimaryKeyRelatedField(queryset=Servicio.objects.all())
    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'categoria_padre', 'servicio']


class SolicitudSerializer(serializers.ModelSerializer):
    proveedorServicio = serializers.PrimaryKeyRelatedField(queryset=ProveedorServicio.objects.all())
    cliente = serializers.PrimaryKeyRelatedField(queryset=Cliente.objects.all())
    notificacion = serializers.PrimaryKeyRelatedField(queryset=Notificacion.objects.all())
    class Meta:
        model = Solicitud
        fields = [
            'id', 'comentario', 'fechaSolicitud', 'fechaTrabajo', 
            'fechaValoracion', 'valoracion', 'proveedorServicio', 
            'cliente', 'notificacion'
        ]