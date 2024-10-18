import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../AppNavigator';

const PantallaBienvenida = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>ChanguitasApp</Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PantallaRegistro')}
        >
          <Text style={styles.buttonText}>Crear perfil</Text>
        </TouchableOpacity>
        
        <Text style={styles.orText}>O</Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PantallaInicioSesion')}
        >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => navigation.navigate('PantallaChat')}
        >
          <Text style={styles.helpButtonText}>Ayuda</Text>
        </TouchableOpacity>
        
        <Text style={styles.footerText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4DB6AC',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    marginVertical: 10,
  },
  helpButton: {
    marginTop: 20,
  },
  helpButtonText: {
    color: '#4DB6AC',
    fontSize: 16,
  },
  footerText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 12,
    marginTop: 40,
    paddingHorizontal: 20,
  },
});

export default PantallaBienvenida;