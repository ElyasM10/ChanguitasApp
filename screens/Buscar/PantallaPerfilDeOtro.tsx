import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Linking,Alert  } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../API_URL';
import {cerrarSesion} from '../Autenticacion/authService';

const PantallaPerfilDeOtro = () => {

  const route = useRoute<RouteProp<RootStackParamList, 'PantallaPerfilDeOtro'>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);


  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };


  const logout = async () => {
    try {
      await cerrarSesion();
      navigation.navigate('PantallaBienvenida');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  interface Direccion {
    calle: string;
    altura: number;
    piso: number | null;
    nroDepto: number | null;
    barrio: string;
  }

  interface Usuario {
    username: string;
    first_name: string;
    last_name: string;
    fechaNacimiento: string;
    email: string;
    telefono: string;
    direccion: Direccion;
    fotoPerfil: string | null;
  }

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);

  
  // Mostrar los datos pasados desde la pantalla anterior
  useEffect(() => {
    console.log('Componente de id montado');
    if (route.params?.id) {
      console.log('ID obtenido:', route.params.id);
    } else {
      console.log('No se encontraron id.');
    }
    fetchUsuario();
  }, [route.params]);

  const fetchUsuario = async () => {
    try {
      // Obtén el token de acceso desde AsyncStorage
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log('Token obtenido de AsyncStorage:', accessToken); // Debug: Verifica el token obtenido

      if (!accessToken) {
        throw new Error('No se encontró el token de acceso');
      }

      const userId = route.params.id;
      console.log('ID del usuario extraído:', userId);

      // Se realiza la solicitud utilizando el ID del usuario
      const response = await fetch(`${API_URL}/usuarios/${userId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      console.log('Response status:', response.status); // Verificamos el estado de la respuesta

      if (!response.ok) {
        throw new Error(`Error al obtener el usuario: ${response.status}`);
      }

      // Procesa los datos recibidos
      const data: Usuario = await response.json();
      console.log('Datos del usuario recibidos:', data); // Verifica los datos del usuario
      setUsuario(data);
      setImageUri(data.fotoPerfil || 'https://via.placeholder.com/80');
    } catch (error: any) {
      console.error('Error al cargar datos del usuario:', error); // Detalles del error
      setError('No se pudo cargar el perfil del usuario');
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el enlace de WhatsApp
  const handleChat = () => {
    const phoneNumber = usuario?.telefono; // Número de teléfono del usuario
    const whatsappLink = `https://wa.me/${phoneNumber}`; // Crear el enlace de WhatsApp

    Linking.openURL(whatsappLink).catch((err) => console.error('Error al abrir WhatsApp', err));
  };

  // Mostrar la vista de carga o error
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilos.contenedor}>
      {/* Encabezado con opciones de menú */}
      <View style={estilos.encabezado}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={estilos.textoEncabezado}>Perfil de {usuario?.first_name}</Text>
        <TouchableOpacity onPress={toggleDesplegable}>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

            {/* Menú Desplegable */}
            {mostrarDesplegable && (
        <View style={estilos.desplegable}>
          <TouchableOpacity onPress={logout} style={estilos.opcionDesplegable}>
            <Text style={estilos.textoDesplegable}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      )}


      {/* Información del Usuario */}
      <View style={estilos.seccionUsuario}>
        <Image source={{ uri: imageUri }} style={estilos.imagenUsuario} />
        <Text style={estilos.nombreCompleto}>{usuario?.first_name} {usuario?.last_name}</Text>
        <Text style={estilos.rolUsuario}>User role</Text>
      </View>

      {/* Botones */}
      <View style={estilos.buttonContainer}>
        <TouchableOpacity style={estilos.nextButton} onPress={() => navigation.navigate('DetalleTarea')}>
          <Text style={estilos.nextButtonText}>Iniciar changuita</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.prevButton} onPress={handleChat}>
          <Text style={estilos.prevButtonText}>Chatear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.prevButton} onPress={() => navigation.navigate('ResultadosBusqueda')}>
          <Text style={estilos.prevButtonText}>Bloquear</Text>
        </TouchableOpacity>
      </View>

      {/* Datos adicionales */}
      <View style={estilos.datosExtras}>
        <View style={estilos.datoItem}>
        <Text style={estilos.datoNumero}>{(usuario as any)?.cantServiciosContratados ?? 0}</Text>
          <Text style={estilos.datoLabel}>Contrató</Text>
        </View>
        <View style={estilos.datoItem}>
        <Text style={estilos.datoNumero}>{(usuario as any)?.cantServiciosTrabajados ?? 0}</Text>
          <Text style={estilos.datoLabel}>Trabajó</Text>
        </View>
        <View style={estilos.datoItem}>
        <Text style={estilos.datoNumero}>{(usuario as any)?.puntaje ?? 0}</Text>
          <Text style={estilos.datoLabel}>Puntaje</Text>
        </View>
      </View>

      {/* Datos Personales */}
      <Text style={estilos.tituloDatosPersonales}>DATOS PERSONALES</Text>
      <View style={estilos.datosPersonales}>
        <Text style={estilos.infoUsuario}>Nombre: {usuario?.first_name}</Text>
        <Text style={estilos.infoUsuario}>Apellido: {usuario?.last_name}</Text>
        <Text style={estilos.infoUsuario}>Fecha de Nacimiento: {usuario?.fechaNacimiento}</Text>
        <Text style={estilos.infoUsuario}>Correo Electronico: {usuario?.email}</Text>
        <Text style={estilos.infoUsuario}>Telefono: {usuario?.telefono}</Text>
        <Text style={estilos.infoUsuario}>Direccion: {usuario?.direccion?.calle}</Text>
      </View>

      {/* Barra de navegación inferior */}
      <View style={estilos.barraNavegacion}>
        <TouchableOpacity onPress={() => navigation.navigate('PantallaHome')} style={estilos.iconoNavegacion}>
          <Ionicons name="home-outline" size={24} color="gray" />
          <Text style={estilos.textoNavegacion}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('BuscarServicio1')} style={estilos.iconoNavegacion}>
          <Ionicons name="search-outline" size={24} color="gray" />
          <Text style={estilos.textoNavegacion}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Historial1')} style={estilos.iconoNavegacion}>
          <Ionicons name="grid-outline" size={24} color="gray" />
          <Text style={estilos.textoNavegacion}>Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PantallaPerfilEditarUsuario')} style={estilos.iconoNavegacion}>
          <Ionicons name="person-outline" size={24} color="gray" />
          <Text style={estilos.textoNavegacion}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: 'white',
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    marginTop: 50,
  },
  textoEncabezado: {
    fontSize: 24,
    fontWeight: '600',
  },
  barraPestanas: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
  },
  pestanaActiva: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#197278',
  },
  pestanaInactiva: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textoPestanaActiva: {
    fontSize: 16,
    color: '#197278',
  },
  textoPestanaInactiva: {
    fontSize: 16,
    color: '#666',
  },
  seccionUsuario: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imagenUsuario: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  nombreCompleto: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  rolUsuario: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  prevButton: {
    borderWidth: 1,
    borderColor: '#197278',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  prevButtonText: {
    color: '#197278',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#197278',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  datosExtras: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  datoItem: {
    alignItems: 'center',
  },
  datoNumero: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  datoLabel: {
    fontSize: 14,
    color: '#666',
  },
  tituloDatosPersonales: {
    fontSize: 18,
    color: '#197278',
    textAlign: 'center',
    marginVertical: 10,
  },
  datosPersonales: {
    paddingHorizontal: 20,
  },
  infoUsuario: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  barraNavegacion: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  iconoNavegacion: {
    alignItems: 'center',
  },
  textoNavegacion: {
    fontSize: 12,
    color: 'gray',
  },
  desplegable: {
    position: 'absolute',
    top: 80,
    right: 20,
    width: 150,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    zIndex: 10,
  },
  opcionDesplegable: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textoDesplegable: {
    fontSize: 16,
    color: '#333333',
  },
});

export default PantallaPerfilDeOtro;

