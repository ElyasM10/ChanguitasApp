import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator'; 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './components/LoadingScreen'; // Importa el componente

import 'firebase/auth';

/*
class App extends React.Component {
  state = { 
    details: [], 
    isSessionRestored: false, // Estado para saber si la sesión fue restaurada
    isAuthenticated: false, // Estado para saber si el usuario está autenticado
  };

  async componentDidMount() {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (refreshToken) {
        // Decodificar el token para verificar la fecha de expiración
        const tokenPayload = JSON.parse(atob(refreshToken.split('.')[1])); // Decodifica el payload del JWT
        const now = Math.floor(Date.now() / 1000); // Fecha actual en segundos
  
        if (tokenPayload.exp < now) {
          console.warn('El token de actualización ha expirado. Redirigiendo al inicio de sesión.');
          this.setState({ isAuthenticated: false });
          this.setState({ isSessionRestored: true });
          this.props.navigation.navigate('PantallaInicioSesion');
          return; // Detener la ejecución si el token ha expirado
        }
  
        // Si el token es válido, intenta renovarlo
        const response = await fetch('http://localhost:8000/api/refresh/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
  
        if (response.ok) {
          const data = await response.json();
          await AsyncStorage.setItem('accessToken', data.access_token);
          this.setState({ isAuthenticated: true }); // Marcar al usuario como autenticado
          console.log('Sesión restaurada correctamente');
          console.log('Refresh Token:', refreshToken);
        } else {
          console.error('Error al restaurar sesión:', await response.json());
          this.setState({ isAuthenticated: false });
        }
      } else {
        console.warn('No se encontró ningún refresh token. Redirigiendo al inicio de sesión.');
        this.setState({ isAuthenticated: false });
        this.props.navigation.navigate('PantallaInicioSesion');
      }
    } catch (error) {
      console.error('Error al intentar restaurar la sesión:', error);
      this.setState({ isAuthenticated: false });
    } finally {
      this.setState({ isSessionRestored: true }); // Finaliza el proceso de restauración
    }
  
    // Ejemplo de llamada adicional al backend (opcional)
    axios.get('http://localhost:8000')
      .then(res => {
        const data = res.data;
        this.setState({
          details: data,
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    // Mostrar la pantalla de carga si la sesión aún no está restaurada
    if (!this.state.isSessionRestored) {
      return <LoadingScreen />;
    }

    return (
      <NavigationContainer>
        <AppNavigator isAuthenticated={this.state.isAuthenticated} />
      </NavigationContainer>
    );
  }
}

export default App;
*/

// Este sería el "Main" que llama a los demás componentes
class App extends React.Component {
  state = { details: [] };

  /*
  componentDidMount() {
    axios.get('http://localhost:8000')
      .then(res => {
        const data = res.data; 
        this.setState({
          details: data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
  */

  render() {
    return (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );
  }
}

export default App;





/*r
este el por defecto 

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/