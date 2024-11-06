"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include 
from django.conf.urls.static import static
from django.conf import settings
from ChanguitasApi.views import *
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'direcciones', DireccionViewSet)
router.register(r'fotos', FotosViewSet)
router.register(r'notificaciones', NotificacionViewSet)
router.register(r'proveedores-servicios', ProveedorServicioViewSet)
router.register(r'proveedores', ProveedorViewSet)
router.register(r'servicios', ServicioViewSet)
router.register(r'solicitudes', SolicitudViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    #  path('', ReactView.as_view(), name="xxx"),
    #  path('', DireccionView.as_view(), name='direccion_view'),
    #  path('usuario/', UsuarioView.as_view(), name='usuario_view') !!!! quizas no va ya que usuarioViewSet seria lo mismo y mejor !!!!,
    #  path('clientes/', ClienteView.as_view(), name='clientes'),
    path('', include(router.urls), name='api'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
