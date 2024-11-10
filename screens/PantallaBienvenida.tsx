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
import {LinearGradient} from 'expo-linear-gradient';

const PantallaBienvenida = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <LinearGradient
      colors={['#B7B7B7', '#B7B7B7', '#B7B7B7']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>ChanguitasApp</Text>
          
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('PantallaRegistro')}
          // onPress={() => navigation.navigate('AgregarServicio1')}
          >
            <LinearGradient
              colors={['#197278', '#9BCDC8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Crear perfil</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <View style={styles.orContainer}>
            <Text style={styles.orText}>O</Text>
          </View>
          
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('PantallaHome')}
          >
            <LinearGradient
              colors={['#197278', '#9BCDC8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => navigation.navigate('PantallaHomeAdmin')}
          >
            <Text style={styles.helpButtonText}>Ingresar como Administrador (temporal)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => navigation.navigate('PantallaAyuda')}
          >
            <Text style={styles.helpButtonText}>Ayuda</Text>
          </TouchableOpacity>
          
          <Text style={styles.footerText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 160,
    marginRight: 189,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginVertical: 5,
  },
  orContainer: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 30,
  },
  orText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 3,
  },
  helpButton: {
    marginTop: 60,
  },
  helpButtonText: {
    color: 'white',
    fontSize: 16,
  },
  footerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    marginTop: 100,
    paddingHorizontal: 40,
  },
});

export default PantallaBienvenida;