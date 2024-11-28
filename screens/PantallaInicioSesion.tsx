
/*
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';

const PantallaInicioSesion = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
 
  const API_URL = 'http://127.0.0.1:8000'; // Web


  return (
    <SafeAreaView style={estilos.areaSegura}>
      <View style={estilos.contenedor}>
        <View style={estilos.encabezado}>
          <TouchableOpacity 
            style={estilos.botonAtras} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={estilos.titulo}>Iniciar sesión</Text>
        </View>

        <View style={estilos.contenedorEntrada}>
          <Text style={estilos.etiqueta}>Correo electrónico</Text>
          <TextInput
            placeholder="changuitas@app.com"
            placeholderTextColor="#666"
            style={estilos.entrada}
          />

          <Text style={estilos.etiqueta}>Contraseña</Text>
          <View style={estilos.contenedorEntradaContrasena}>
            <TextInput
              placeholder="***************"
              placeholderTextColor="#666"
              secureTextEntry={!mostrarContrasena}
              style={estilos.entradaContrasena}
            />
            <TouchableOpacity 
              style={estilos.iconoOjo}
              onPress={() => setMostrarContrasena(!mostrarContrasena)}
            >
              <Ionicons 
                name={mostrarContrasena ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('PantallaHome')}>
          <LinearGradient
            colors={['#197278', '#9BCDC8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={estilos.degradadoBoton}
          >
            <Text style={estilos.textoBoton}>Ingresar</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={estilos.textoPie}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </Text>
      </View>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: '#B7B7B7',
  },
  contenedor: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'flex-end',
    marginTop: 60,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -10,
  },
  titulo: {
    fontSize: 24,
    color: '#fff',
    marginLeft: -1,
    marginBottom: 80, 
  },
  botonAtras: {
    marginRight: 10,
    marginTop: -75,
  },
  contenedorEntrada: {
    marginBottom: 20,
  },
  etiqueta: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  entrada: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  contenedorEntradaContrasena: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  entradaContrasena: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    flex: 1,
  },
  iconoOjo: {
    position: 'absolute',
    right: 15,
  },
  degradadoBoton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',   
    justifyContent: 'center', 
  },
  textoBoton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  textoPie: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 80,
    paddingHorizontal: 40,
  },
});

export default PantallaInicioSesion;
*/
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';
import API_URL from './API_URL';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PantallaInicioSesion = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para el mensaje de error

  const handleLogin = async () => {
    setErrorMessage(null); // Resetea el mensaje de error antes de intentar iniciar sesión
    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
    

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('accessToken', data.access); // `data.access` es el token de acceso
        await AsyncStorage.setItem('refreshToken', data.refresh); // `data.refresh` es el token de refresco
        //Lo guardamos para despues utilizarlo para mostrar el perfil por ejemplo
        console.log('Tokens almacenados correctamente'); // Almacena el token recibido

        navigation.navigate('PantallaHome');
      } else {
        const data = await response.json();
        setErrorMessage(data.detail || 'Nombre de usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage('Hubo un error al conectar con el servidor. Inténtalo nuevamente.');
    }
  };


  return (
    <SafeAreaView style={estilos.areaSegura}>
      <View style={estilos.contenedor}>
        {/* Botón de volver */}
        <View style={estilos.encabezado}>
          <TouchableOpacity 
            style={estilos.botonAtras} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={estilos.titulo}>Iniciar sesión</Text>
        </View>

        {/* Mensaje de error */}
        {errorMessage && (
          <View style={estilos.errorContainer}>
            <Text style={estilos.errorText}>Error: {errorMessage}</Text>
          </View>
        )}

        {/* Campos de entrada */}
        <View style={estilos.contenedorEntrada}>
          <Text style={estilos.etiqueta}>Nombre de usuario</Text>
          <TextInput
            placeholder="changuitas1"
            placeholderTextColor="#666"
            style={estilos.entrada}
            value={username}
            onChangeText={setusername}
          />

          <Text style={estilos.etiqueta}>Contraseña</Text>
          <View style={estilos.contenedorEntradaContrasena}>
            <TextInput
              placeholder="***************"
              placeholderTextColor="#666"
              secureTextEntry={!mostrarContrasena}
              style={estilos.entradaContrasena}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity 
              style={estilos.iconoOjo}
              onPress={() => setMostrarContrasena(!mostrarContrasena)}
            >
              <Ionicons 
                name={mostrarContrasena ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botón de ingresar */}
        <TouchableOpacity onPress={handleLogin}>
          <LinearGradient
            colors={['#197278', '#9BCDC8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={estilos.degradadoBoton}
          >
            <Text style={estilos.textoBoton}>Ingresar</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Texto de pie de página */}
        <Text style={estilos.textoPie}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </Text>
      </View>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: '#B7B7B7',
  },
  contenedor: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'flex-end',
    marginTop: 60,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -10,
  },
  titulo: {
    fontSize: 24,
    color: '#fff',
    marginLeft: -1,
    marginBottom: 80, 
  },
  botonAtras: {
    marginRight: 10,
    marginTop: -75,
  },
  errorContainer: {
    backgroundColor: '#F8D7DA',
    borderRadius: 10,
    padding: 10,
  },
  errorText: {
    color: '#A94442',
    fontSize: 14,
    textAlign: 'center',
  },
  contenedorEntrada: {
    marginBottom: 20,
  },
  etiqueta: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  entrada: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  contenedorEntradaContrasena: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  entradaContrasena: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    flex: 1,
  },
  iconoOjo: {
    position: 'absolute',
    right: 15,
  },
  degradadoBoton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',   
    justifyContent: 'center', 
  },
  textoBoton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  textoPie: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 80,
    paddingHorizontal: 40,
  },
});

export default PantallaInicioSesion;
