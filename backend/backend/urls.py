
from django.contrib import admin
from django.urls import path, include 
from django.conf.urls.static import static
from django.conf import settings
from ChanguitasApi.views import *
from ChanguitasApi.views import RefreshView
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from ChanguitasApi.views.usuarioViewSet import LoginView, LogoutView

router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'direcciones', DireccionViewSet)
router.register(r'fotos', FotosViewSet)
router.register(r'notificaciones', NotificacionViewSet)
router.register(r'proveedores-servicios', ProveedorServicioViewSet)
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
    path('api/refresh/', RefreshView.as_view(), name='refresh'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
