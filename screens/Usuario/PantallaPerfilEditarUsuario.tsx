/*
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const PantallaPerfiEditarUsuario = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const userData = {
    nombre: 'Juan',
    apellido: 'Pérez',
    fechaNacimiento: '01/01/1990',
    correo: 'juan@perez.com',
    telefono: '02901-12345678',
    direccion: 'Calle Las Changas 456'
  };

  return (
    <SafeAreaView style={estilos.contenedor}>
      //{ Encabezado con opciones de menú }
      <View style={estilos.encabezado}>
        <Text style={estilos.textoEncabezado}>Perfil</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

         //{ Barra de pestañas }
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

      //{ Información del Usuario }
      <View style={estilos.seccionUsuario}>
        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={estilos.imagenUsuario} />
        <Text style={estilos.nombreCompleto}>Full name</Text>
        <Text style={estilos.rolUsuario}>User role</Text>
      </View>

      //{ Datos adicionales }
      <View style={estilos.datosExtras}>
        <View style={estilos.datoItem}>
          <Text style={estilos.datoNumero}>1986</Text>
          <Text style={estilos.datoLabel}>Contrató</Text>
        </View>
        <View style={estilos.datoItem}>
          <Text style={estilos.datoNumero}>2728</Text>
          <Text style={estilos.datoLabel}>Trabajó</Text>
        </View>
        <View style={estilos.datoItem}>
          <Text style={estilos.datoNumero}>4.2</Text>
          <Text style={estilos.datoLabel}>Puntaje</Text>
        </View>
      </View>

      //{ Datos Personales }
      <Text style={estilos.tituloDatosPersonales}>DATOS PERSONALES</Text>
      <View style={estilos.datosPersonales}>
        <Text style={estilos.infoUsuario}>Nombre: {userData.nombre}</Text>
        <Text style={estilos.infoUsuario}>Apellido: {userData.apellido}</Text>
        <Text style={estilos.infoUsuario}>Fecha de Nacimiento: {userData.fechaNacimiento}</Text>
        <Text style={estilos.infoUsuario}>Correo Electronico: {userData.correo}</Text>
        <Text style={estilos.infoUsuario}>Telefono: {userData.telefono}</Text>
        <Text style={estilos.infoUsuario}>Direccion: {userData.direccion}</Text>
      </View>

      //{ Barra de navegación inferior }
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
});

export default PantallaPerfiEditarUsuario;
*/

import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';
import API_URL from '../API_URL';
import AsyncStorage from '@react-native-async-storage/async-storage';



const PantallaPerfiEditarUsuario: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  //Extraemos los datos del token para obtener el id 
 /*
    El token  es una cadena codificada en base64url de tres partes:
    <Encabezado>.<Cuerpo>.<Firma>
  Encabezado: Describe el algoritmo y el tipo de token.
  Cuerpo (Payload): Contiene los datos del usuario y otras informaciones (como user_id, role, iat, exp).
  Firma: Garantiza que el token no ha sido alterado.
  */
  const decodeJWT = (token: string) => {
    const base64Url = token.split('.')[1]; // Extrae la segunda parte del token (payload)
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Reemplaza caracteres no válidos para Base64
    const decoded = JSON.parse(atob(base64)); // Decodifica y parsea el JSON
    return decoded;
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
  }

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
  
      // Decodifica el token para extraer el ID del usuario
     // Luego en el código
     const decoded = decodeJWT(accessToken);
     console.log('Payload decodificado:', decoded);
 
     const userId = decoded.user_id;
     console.log('ID del usuario extraído:', userId);

    
  

      // Se realiza la solicitud utilizando el ID del usuario
      const response = await fetch(`${API_URL}/usuarios/${userId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Incluimos el token en el encabezado
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
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

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
        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={estilos.imagenUsuario} />
        <Text style={estilos.nombreCompleto}>{usuario?.username}</Text>
      </View>

      {/* Datos adicionales */}
      <View style={estilos.datosExtras}>
        <View style={estilos.datoItem}>
          <Text style={estilos.datoNumero}>1986</Text>
          <Text style={estilos.datoLabel}>Contrató</Text>
        </View>
        <View style={estilos.datoItem}>
          <Text style={estilos.datoNumero}>2728</Text>
          <Text style={estilos.datoLabel}>Trabajó</Text>
        </View>
        <View style={estilos.datoItem}>
          <Text style={estilos.datoNumero}>4.2</Text>
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
});

export default PantallaPerfiEditarUsuario;