import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from '../../AppNavigator';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../API_URL';
import { Alert } from 'react-native';
import {cerrarSesion} from '../Autenticacion/authService';
import { renovarToken } from '../Autenticacion/authService';
import { AuthContext } from '../Autenticacion/auth';


const PantallaHome = () => {
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [state,setState] = useContext(AuthContext);
  const caracteristicas = [
    '+30 servicios',
     'Confiable',
     'Ushuaia'
      
  ];



  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };

  useEffect(() => {
    // Obtén el token de acceso al cargar el componente
    const fetchAccessToken = async () => {
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
      }
    };

    fetchAccessToken();

    // Refrescar el token cada 5 minutos (300000ms)
    const intervalId = setInterval(async () => {
      const newAccessToken = await renovarToken();
      if (newAccessToken) {
        setAccessToken(newAccessToken);
      }
    },60000);// 60000:1 minuto,300000); // 5 minutos

    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  /*
  const renovarToken = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No se encontró el token de actualización');

      const response = await fetch(`${API_URL}/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('accessToken', data.access); // Almacena el nuevo token
        return data.access;
      } else {
        const errorData = await response.json();
        console.error('Error al renovar el token:', errorData);
        return null;
      }
    } catch (error) {
      console.error('Error al intentar renovar el token:', error);
      return null;
    }
  };
 */

  const logout = async () => {
    try {
    

      await cerrarSesion(); // Simula el proceso de cierre de sesión
      setState({ token: "" });
      console.log('Sesión cerrada correctamente'); // Log al finalizar el cierre de sesión
    } catch (error) {
    
      console.log('Error en el cierre de sesión:', error.message); // Log en caso de error
      Alert.alert("Error", error.message);
    } finally {

      // Navegar a la pantalla de bienvenida
      navigation.navigate("PantallaBienvenida");
    

      // Esperar y luego redirigir a la pantalla de inicio de sesión
      setTimeout(() => {
       
        console.log('Redirigiendo a la pantalla de inicio de sesión'); 
        navigation.reset({
          index: 0,
          routes: [{ name: "PantallaInicioSesion" }],
        });
      }, 10); 
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
            <Text onPress={logout} style={estilos.textoDesplegable}>Cerrar sesión</Text>
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
