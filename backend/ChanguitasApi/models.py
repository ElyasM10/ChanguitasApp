from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

class Direccion(models.Model):
    altura = models.IntegerField(unique=True)
    calle = models.CharField(max_length=100, unique=True)
    nroDepto = models.IntegerField(blank=True, null=True)
    piso = models.IntegerField(blank=True, null=True)
    barrio = models.CharField(max_length=100, blank=True, null=True)

class Usuario(AbstractUser):
    #nombre, apellido, contraseña y email lo trae por defecto el usuario de django
    documento = models.IntegerField(unique=True, blank=False, null=False)
    telefono = models.IntegerField(blank=True, null=True)
    # fotoPerfil - blank=True se debe sacar una vez terminado el proyecto
    fotoPerfil = models.ImageField(blank=True, upload_to='imagenesUsuario')
    fechaNacimiento = models.DateField(blank=False, null=True)
    direccion = models.OneToOneField(Direccion, on_delete=models.CASCADE, null=False, blank=True)

    groups = models.ManyToManyField( #Es como crear "roles" o "tipos de usuario"
        'auth.Group', 
        related_name='usuariosEnGrupo',
        blank=True,
        verbose_name='GruposDeUsuario',
        help_text='Grupos a los que pertenece este usuario en el sistema.',
    )
    user_permissions = models.ManyToManyField(  #Son permisos específicos para acciones individuales. Django crea automáticamente permisos básicos para cada modelo
        'auth.Permission',
        related_name='usuariosConPermiso',
        blank=True,
        verbose_name='PermisosDeUsuario',
        help_text='Permisos específicos asignados a este usuario',
    )

class Cliente(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='cliente')

class Proveedor(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='proveedor')
    fechaDisponible = models.DateField()
    horarioDisponible = models.TimeField()

class Fotos(models.Model):
    fotos = models.ImageField(upload_to='imagenesProveedor')
    fechaHora = models.DateTimeField(blank=True, null=False)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, related_name='fotos')

class Notificacion(models.Model):
    fechaHora = models.DateTimeField(null=True)
    mensaje = models.TextField(null=True)
    tipoSistema = models.BooleanField()
    Usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='notificaciones')

class EstadoServicio(models.TextChoices):
    INICIADO = 'Iniciado', 'I'
    FINALIZADO = 'Finalizado', 'F'
    CANCELADO = 'Cancelado', 'C'

class Servicio (models.Model):
    nombreServicio = models.CharField(max_length=100, null=False)
    descripcion = models.TextField(null=False)
    estado = models.CharField(max_length=15, choices=EstadoServicio.choices, default=EstadoServicio.INICIADO)

class ProveedorServicio(models.Model):
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, related_name='proveedores_servicio')
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, related_name='servicios_ofrecidos')
    fechaDesde = models.DateField()
    fechaHasta = models.DateField()

class Categoria (models.Model):
    nombre = models.CharField(max_length=100, null=True)
    categoria_padre = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='subcategorias')
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, related_name='categoria')    

class Solicitud (models.Model):
    comentario = models.TextField(null=True)
    fechaSolicitud = models.DateField(blank=True, null=True)
    fechaTrabajo = models.DateField(blank=True, null=True)
    fechaValoracion = models.DateField(blank=True, null=True)
    valoracion = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], default=1)
    proveedorServicio = models.ForeignKey(ProveedorServicio, on_delete=models.CASCADE, related_name='solicitudes')
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='solicitudes_cliente')
    notificacion = models.ForeignKey(Notificacion, on_delete=models.CASCADE, related_name='solicitudes_notificacion')