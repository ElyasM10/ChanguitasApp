import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator'; 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './components/LoadingScreen'; // Importa el componente

import 'firebase/auth';
import { AuthProvider } from './screens/Autenticacion/auth';
import Main from "./screens/Main"

// Renderiza la aplicacion y carga los componentes

export default function App(){
  return <Main/>;
}


/*
class App extends React.Component {
  state = { details: [] };

  
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
  

  render() {
    return (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );
  }
}

export default App;
*/




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