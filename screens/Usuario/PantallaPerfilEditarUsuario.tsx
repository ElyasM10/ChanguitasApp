
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert,Modal } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {cerrarSesion} from '../Autenticacion/authService';
import api from '../Autenticacion/api';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const PantallaPerfiEditarUsuario: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  
    const handleImagePress = () => {
      setModalVisible(true); // Mostrar el modal cuando se presiona la imagen
    };

    const handleCloseModal = () => {
      setModalVisible(false); // Cerrar el modal cuando se presiona el botón de cerrar
    };

  // Interfaz para el tipo de datos del usuario
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

  const logout = async () => {
    try {
      await cerrarSesion();
      navigation.navigate('PantallaBienvenida');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };

  useEffect(() => {
    fetchUsuario();
  }, []);

  const fetchUsuario = async () => {
    try {
      // Obtén el token de acceso desde AsyncStorage
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log('Token obtenido de AsyncStorage:', accessToken); // Debug: Verifica el token obtenido
  
      if (!accessToken) {
        throw new Error('No se encontró el token de acceso');
      }
  
      const userId = await AsyncStorage.getItem('userId');  
     console.log('ID del usuario extraído:', userId);

    
  

      // Se realiza la solicitud utilizando el ID del usuario
      const response = await api.get(`/usuarios/${userId}/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Axios maneja automáticamente los headers
        },
      });
  
      console.log('Response status:', response.status); // Verificamos el estado de la respuesta
  
      if (response.status !== 200) {
        throw new Error(`Error al obtener el usuario: ${response.status}`);
      }

      // Procesa los datos recibidos
      const data: Usuario = response.data;
      console.log('Datos del usuario recibidos:', data); // Verifica los datos del usuario
      setUsuario(data);
      setImageUri(data.fotoPerfil || 'https://via.placeholder.com/80');

    } catch (error: any) {
      console.error('Error al cargar datos del usuario:', error); //  Detalles del error
      setError('No se pudo cargar el perfil del usuario');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={estilos.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={estilos.errorContainer}>
        <Text style={estilos.errorText}>{error}</Text>
      </View>
    );
  }

  return (
     <SafeAreaView style={estilos.contenedor}>
      {/* Encabezado con opciones de menú */}
      <View style={estilos.encabezado}>
        <Text style={estilos.textoEncabezado}>Perfil</Text>
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
      {/* Barra de pestañas */}
      <View style={estilos.barraPestanas}>
        <TouchableOpacity style={estilos.pestanaActiva} onPress={() => navigation.navigate('PantallaBienvenida')}>
          <Text style={estilos.textoPestanaActiva}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.pestanaInactiva} onPress={() => navigation.navigate('EditarDatosPersonales')}>
          <Text style={estilos.textoPestanaInactiva}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.pestanaInactiva} onPress={() => navigation.navigate('MisServicios')}>
          <Text style={estilos.textoPestanaInactiva}>Mis servicios</Text>
        </TouchableOpacity>
      </View>

        {/* Información del Usuario */}
        <View style={estilos.seccionUsuario}>
        <TouchableOpacity onPress={handleImagePress}>
          <Image 
            source={{ uri: imageUri || 'https://via.placeholder.com/80' }} 
            style={estilos.imagenUsuario} 
          />
        </TouchableOpacity>
        <Text style={estilos.nombreCompleto}>{usuario?.username}</Text>
      </View>
      
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={estilos.modalContainer}>
            <Image 
              source={{ uri: imageUri || 'https://via.placeholder.com/80' }} 
              style={estilos.imagenModal} 
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Datos adicionales */}
      <View style={estilos.datosExtras}>
        <View style={estilos.datoItem}>
        <Text style={estilos.datoNumero}>{(usuario as any)?.cantServiciosContratados ?? 0}</Text>
        {/*Esta parte convierte (o "castea") el objeto usuario al tipo any.
El tipo any en TypeScript desactiva las verificaciones de tipo, permitiendo acceder a cualquier propiedad sin que TypeScript marque un error de momento temporal*/}
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
        <Text style={estilos.infoUsuario}>Correo Electrónico: {usuario?.email}</Text>
        <Text style={estilos.infoUsuario}>Teléfono: {usuario?.telefono}</Text>
        <Text style={estilos.infoUsuario}>
          Dirección: {usuario?.direccion.calle}, {usuario?.direccion.altura}{' '}
          {usuario?.direccion.piso ? `Piso ${usuario?.direccion.piso}` : ''}{' '}
          {usuario?.direccion.nroDepto ? `Depto ${usuario?.direccion.nroDepto}` : ''}, {usuario?.direccion.barrio}
        </Text>
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
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
    top: 70,
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
   // Estilos para el modal
   modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro
  },
  imagenGrande: {
    width: '90%',
    height: '80%',
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 50,
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagenModal: {
    width: 200,   // Ajusta el tamaño de la imagen en el modal
    height: 200,  
    borderRadius: 100,  // Garantiza que la imagen sea circular
    resizeMode: 'cover',  // Mantiene la proporción de la imagen
  },
});
export default PantallaPerfiEditarUsuario;
