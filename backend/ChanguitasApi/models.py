from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import MinValueValidator, MaxValueValidator

class Direccion(models.Model):
    calle = models.CharField(max_length=100, null=False)
    altura = models.IntegerField(null=False)
    nroDepto = models.IntegerField(blank=True, null=True)
    piso = models.IntegerField(blank=True, null=True)
    barrio = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.calle}, {self.altura}"

# Manager personalizado
class UsuarioManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El email es obligatorio')
        if not username:
            raise ValueError('El nombre de usuario es obligatorio')

        # Validar campos obligatorios solo para usuarios normales (no superusuarios)
        if not extra_fields.get('is_superuser', False):
            if 'documento' not in extra_fields or not extra_fields['documento']:
                raise ValueError("El campo 'documento' es obligatorio.")
            if 'direccion' not in extra_fields or not extra_fields['direccion']:
                raise ValueError("El campo 'direccion' es obligatorio.")

        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        # Crear el superusuario y omitir la validación de campos obligatorios.
        return self.create_user(username, email, password, **extra_fields)
    
class Usuario(AbstractUser):
    #nombre, apellido, contraseña y email lo trae por defecto el usuario de django
    documento = models.IntegerField(unique=True, blank=False, null=False)
    telefono = models.IntegerField(blank=True, null=False, default=1234)
    # fotoPerfil - blank=True se debe sacar una vez terminado el proyecto
    fotoPerfil = models.ImageField(upload_to='imagenesUsuario', null=True, blank=True, default='imagenesUsuario/empty.jpg')
    fechaNacimiento = models.DateField(blank=False, null=False, verbose_name="fecha nacimiento", default="2000-01-01")
    direccion = models.OneToOneField(Direccion, on_delete=models.CASCADE, null=False)
    # explote las clases hijas Cliente y Proveedor en Usuario ya que un usuario va a poder contratar y ser contratado
    # por lo tanto y al final de cuentas, hace lo mismo sin importar la diferenciación de tipo de usuario.
    fechaDisponible = models.DateField(blank=True, null=True)
    horarioDisponible = models.TimeField(blank=True, null=True)
    #atributos a mostrar en perfil
    cantServiciosContratados = models.IntegerField(blank=True, null=True)
    cantServiciosTrabajados = models.IntegerField(blank=True, null=True)
    puntaje = models.IntegerField(blank=True, null=True)

    objects = UsuarioManager()

    def getServiciosContratados(self):
        return self.solicitudes_cliente.all()
    
    def getServiciosTrabajados(self):
        # Obtiene todas las solicitudes relacionadas con los servicios ofrecidos por el proveedor
        servicios_ofrecidos = self.servicios_ofrecidos.all()  # Relación del proveedor con ProveedorServicio
        solicitudes = Solicitud.objects.filter(proveedorServicio__in=servicios_ofrecidos)
        return solicitudes

    def calcularCantServiciosContratados(self):
        # Accedo a Solicitudes desde Usuario mediante la conexión de "cliente" (es un Usuario) gracias al related_name "solicitudes_cliente"
        servicios_contratados = self.getServiciosContratados.exclude(estado=EstadoServicio.CANCELADO)
        self.cantServiciosContratados = servicios_contratados.count()
        self.save()  # Este save() es importante para que los cambios persistan

    def calcularCantServiciosTrabajados(self):
        # Filtra las solicitudes finalizadas
        solicitudes_finalizadas = self.getServiciosTrabajados.filter(estado=EstadoServicio.FINALIZADO)
        self.cantServiciosTrabajados = solicitudes_finalizadas.count()
        # Guarda el resultado en la base de datos
        self.save()

    def calcularPuntaje(self):
        # Filtra las solicitudes finalizadas
        solicitudes_finalizadas = self.getServiciosTrabajados.filter(estado=EstadoServicio.FINALIZADO)
        # Calcula el puntaje promedio
        total_valoraciones = solicitudes_finalizadas.aggregate(total=models.Sum('valoracion'))['total'] or 0
        cantidad_finalizadas = solicitudes_finalizadas.count()
        # Evita la división por cero
        self.puntaje = total_valoraciones / cantidad_finalizadas if cantidad_finalizadas > 0 else 0
        # Guarda el resultado en la base de datos
        self.save()

class Fotos(models.Model):
    fotos = models.ImageField(upload_to='imagenesProveedor')
    fechaHora = models.DateTimeField(blank=True, null=False)
    proveedor = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='fotos')

class Notificacion(models.Model):
    fechaHora = models.DateTimeField(null=True)
    mensaje = models.TextField(null=True)
    tipoSistema = models.BooleanField()
    Usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='notificaciones')

class DiasSemana(models.TextChoices):
    LUNES = "Lunes", "Lun"
    MARTES = "Martes", "Mar"
    MIERCOLES = "Miércoles", "Mie"
    JUEVES = "Jueves", "Jue"
    VIERNES = "Viernes", "Vie"
    SABADO = "Sábado", "Sab"
    DOMINGO = "Domingo", "Dom"
    
class Servicio(models.Model):
    nombreServicio = models.CharField(max_length=100, null=False)
    categorias = models.ManyToManyField('Categoria', related_name='servicios') #actualizar cardinalidad diagrama entidad relación
    descripcion = models.TextField(null=False)
    dia = models.CharField(max_length=10, choices=DiasSemana.choices,null=False, default="Lunes")
    desdeHora = models.TimeField(null=False, default="00:00")
    hastaHora = models.TimeField(null=False, default="00:00")

    def obtener_proveedores(self):
       # Retorna los usuarios que ofrecen este servicio.
        proveedores_servicio = self.proveedores_servicio.all()  # conexión con ProveedorServicio mediante related_name
        proveedores = [proveedor_servicio.proveedor for proveedor_servicio in proveedores_servicio]
        return proveedores

    def __str__(self) -> str:
        return self.nombreServicio
    
class ProveedorServicio(models.Model):
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, related_name='proveedores_servicio')
    proveedor = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='servicios_ofrecidos')
    fechaDesde = models.DateField()
    fechaHasta = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"Servicio: {self.servicio.nombreServicio}, Proveedor: {self.proveedor.get_username()}"
    
class Categoria (models.Model):
    nombre = models.CharField(max_length=100, null=True)
    categoria_padre = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='subcategorias')

    def __str__(self) -> str:
        return self.nombre

class EstadoServicio(models.TextChoices):
    INICIADO = 'Iniciado', 'I'
    FINALIZADO = 'Finalizado', 'F'
    CANCELADO = 'Cancelado', 'C'

class Solicitud (models.Model):
    comentario = models.TextField(null=True)
    fechaSolicitud = models.DateField(blank=True, null=True)
    fechaTrabajo = models.DateField(blank=True, null=True)
    fechaValoracion = models.DateField(blank=True, null=True)
    valoracion = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], default=1)
    proveedorServicio = models.ForeignKey(ProveedorServicio, on_delete=models.CASCADE, related_name='solicitudes')
    cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='solicitudes_cliente')
    notificacion = models.ForeignKey(Notificacion, on_delete=models.CASCADE, null=True, blank=True, related_name='solicitudes_notificacion')
    estado = models.CharField(max_length=15, choices=EstadoServicio.choices, default=EstadoServicio.INICIADO)

    def __str__(self) -> str:
        return f"Cliente: {self.cliente.get_username()},  Proveedor: {self.proveedorServicio.proveedor.get_username()}"

    def save(self) :
        a= super().save()
        self.cliente.calcularCantServiciosContratados()
        self.proveedorServicio.proveedor.calcularCantServiciosTrabajados()
        self.proveedorServicio.proveedor.calcularPuntaje()
        return a
    
    def delete(self, *args, **kwargs):
        # Elimino y después actualizo valores
        super().delete(*args, **kwargs)
        self.cliente.calcularCantServiciosContratados()
        self.proveedorServicio.proveedor.calcularCantServiciosTrabajados()
        self.proveedorServicio.proveedor.calcularPuntaje()