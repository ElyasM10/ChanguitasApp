from django.contrib import admin
from .models import *
from django.utils.safestring import mark_safe
# Register your models here.

admin.site.register(Categoria)
admin.site.register(Direccion)
admin.site.register(Notificacion)
admin.site.register(ProveedorServicio)
admin.site.register(Fotos)
admin.site.register(Solicitud)

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin): 

    readonly_fields = ['get_fotoPerfil',]   
    ordering = ('last_name',)   
    search_fields = ('first_name',
                     'last_name',
                     'fechaNacimiento',
                     'documento'
                     )  
    list_filter = ('fechaNacimiento',
                   )    
    list_display = ('get_fotoPerfil',
                    'username',
                    'first_name',
                    'last_name',
                    'documento',
                    'telefono',
                    'fechaNacimiento',
                     'puntaje') 
    list_display_links = ('get_fotoPerfil',
                          'first_name',
                          'last_name',
                         )  
    list_per_page = 5   
    def get_fotoPerfil(self, obj):
         if obj.fotoPerfil:
             return mark_safe(f'<img src="{obj.fotoPerfil.url}" width="50" height="50" />')
         return "No hay foto"
    
    get_fotoPerfil.short_description = 'Foto de perfil'

@admin.register(Servicio)
class ServicioAdmin(admin.ModelAdmin):
    list_display = ('nombreServicio', 'descripcion', 'dia', 'desdeHora', 'hastaHora')
    search_fields = ('nombreServicio', 'descripcion')
    list_filter = ('dia',)
    filter_horizontal = ('categorias',)  # Esto mejora la UI para la relación M2M

# @admin.register(Categoria)
# class CategoriaAdmin(admin.ModelAdmin):
#     list_display = ('nombre', 'categoria_padre')
#     search_fields = ('nombre',)
#     list_filter = ('categoria_padre',)
#     filter_horizontal = ('servicios',)  # Esto mejora la UI para la relación M2M
