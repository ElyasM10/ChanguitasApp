from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Usuario)
admin.site.register(Cliente)
admin.site.register(Proveedor)
admin.site.register(Direccion)
admin.site.register(Notificacion)
admin.site.register(Servicio)
admin.site.register(EstadoServicio)
admin.site.register(ProveedorServicio)
admin.site.register(Fotos)
admin.site.register(Categoria)
admin.site.register(Solicitud)

