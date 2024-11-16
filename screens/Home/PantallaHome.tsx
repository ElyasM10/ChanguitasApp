import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from '../../AppNavigator';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../API_URL';

const PantallaHome = () => {
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const caracteristicas = [
    '+30 servicios',
    'Ushuaia',
    'Chat integrado'
  ];

  // Configuración para la barra de navegación de abajo
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };

  // Función para cerrar sesión
  const cerrarSesion = async () => {
    try {
      // Hacer la solicitud a la URL de logout del backend
      const response = await fetch(`${API_URL}/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Aquí puedes enviar datos si es necesario, como el token de autenticación.
        // body: JSON.stringify({ token: 'tu_token_aqui' })
      });

      if (response.ok) {
        console.log('Sesión cerrada correctamente');
        // Eliminar los tokens del almacenamiento local
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        // Redirigir a la pantalla de inicio de sesión
        navigation.navigate('PantallaBienvenida');
      } else {
        console.error('Error al cerrar sesión', response.status);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de logout', error);
    }
  };

  return (
    <SafeAreaView style={estilos.contenedor}>
      {/* Encabezado */}
      <View style={estilos.encabezado}>
        <Text style={estilos.textoInicio}>Inicio</Text>
        <TouchableOpacity onPress={toggleDesplegable}>
          <Text style={estilos.menuPuntos}>...</Text>
        </TouchableOpacity>
      </View>

      {/* Menú Desplegable */}
      {mostrarDesplegable && (
        <View style={estilos.desplegable}>
          <TouchableOpacity style={estilos.opcionDesplegable}>
            <Text onPress={() => navigation.navigate('PantallaAyuda')} style={estilos.textoDesplegable}>Ayuda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.opcionDesplegable}>
            <Text onPress={cerrarSesion} style={estilos.textoDesplegable}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Contenido Principal */}
      <View style={estilos.contenidoPrincipal}>
        <Text style={estilos.tituloApp}>Changuitas{'\n'}App</Text>
        
        <View style={estilos.contenedorCaracteristicas}>
          {caracteristicas.map((item, indice) => (
            <TouchableOpacity key={indice} style={estilos.cajaCaracteristica}>
              <Text style={estilos.textoCaracteristica}>• {item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Barra de navegación de abajo */}
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
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: 'white',
    marginTop: 50,
  },
  textoInicio: {
    fontSize: 24,
    fontWeight: '600',
  },
  menuPuntos: {
    fontSize: 24,
    fontWeight: '600',
  },
  desplegable: {
    position: 'absolute',
    top: 90,
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
  contenidoPrincipal: {
    flex: 1,
    backgroundColor: '#4EAAA5',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  tituloApp: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    lineHeight: 40,
  },
  contenedorCaracteristicas: {
    gap: 10,
  },
  cajaCaracteristica: {
    backgroundColor: '#2A3A35',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  textoCaracteristica: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
  barraNavegacion: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  iconoNavegacion: {
    alignItems: 'center',
  },
  textoNavegacion: {
    fontSize: 12,
    color: 'gray',
  },
});

export default PantallaHome;
