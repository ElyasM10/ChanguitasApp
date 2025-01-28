
from django.contrib import admin
from django.urls import path, include 
from django.conf.urls.static import static
from django.conf import settings
from ChanguitasApi.views import *
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from ChanguitasApi.views.usuarioViewSet import LoginView, LogoutView
#Swagger
from django.urls import re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'direcciones', DireccionViewSet)
router.register(r'fotos', FotosViewSet)
router.register(r'notificaciones', NotificacionViewSet)
router.register(r'proveedores-servicios', ProveedorServicioViewSet)
router.register(r'servicios', ServicioViewSet)
router.register(r'solicitudes', SolicitudViewSet)

schema_view = get_schema_view(
   openapi.Info(
      title="ChanguitasApp Docs",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
   #  path('', ReactView.as_view(), name="xxx"),
   #  path('', DireccionView.as_view(), name='direccion_view'),
   #  path('usuario/', UsuarioView.as_view(), name='usuario_view') !!!! quizas no va ya que usuarioViewSet seria lo mismo y mejor !!!!,
   #  path('clientes/', ClienteView.as_view(), name='clientes'),
    path('admin/', admin.site.urls),
    path('', include(router.urls), name='api'),
    path('api/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/refresh', RefreshView.as_view(), name='refresh'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redocs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('buscar-proveedores/', BuscarProveedoresAPIView.as_view(), name='buscar_proveedores'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
