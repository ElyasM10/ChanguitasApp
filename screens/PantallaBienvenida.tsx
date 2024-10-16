// PantallaBienvenida.tsx
import React from 'react';
import {
  Dimensions, // Proporciona informacion sobre las dimensiones de la pantalla.
  SafeAreaView,  // Asegura que el contenido no se superponga con las áreas de "safe area" (las barras de estado).
  Text,
  View,
  ImageBackground,//Permite establecer una imagen de fondo
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../AppNavigator'; // usado para poder navegar en entre las pestañas
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Font from '../constants/Fonts';


const { height } = Dimensions.get('window');

const PantallaBienvenida = () => {
  // define el tipo de navegación
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          resizeMode="contain"
          source={require('../assets/Bricklayer.png')}
          /*la imagen la saque de https://storyset.com */
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>ChanguitasApp</Text>

          <Text
            style={{
              fontSize: FontSize.small,
              color: '#ffffff',
              fontFamily: Font['poppins-regular'],
              textAlign: 'center',
              marginTop: Spacing * 2,
            }}
          >
            Alguna Descripcion
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
          //  onPress={() => navigation.navigate('PantallaInicioSesion')}
          onPress={() => navigation.navigate('PruebaEmpleado')}
          >
            <Text style={styles.buttonText}>Iniciar Sesion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('PantallaRegistro')}
          >
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Definicion de estilos para los diferentes componentes
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,//Ocupa todo el espacio disponible en la pantalla
    backgroundColor: '#f46524',// Color de fondo de la pantalla (naranja).
  },
  container: {
    flex: 1,
  },
  imageBackground: {
    height: height / 2.5,
  },
  textContainer: {
    paddingHorizontal: Spacing * 4,// Margen horizontal alrededor del texto.
    paddingTop: Spacing * 2,// Margen superior
    marginTop: Spacing * 2,
  },
  text: {
    fontSize: FontSize.xxLarge,
    color: '#ffffff',// Color blanco
    fontFamily: Font['poppins-bold'],
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: Spacing * 2,
    paddingVertical: Spacing * 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: Spacing * 1.5,
    paddingHorizontal: Spacing * 2,
    width: '48%',
    borderRadius: Spacing,
  },
  buttonText: {
    color: '#f46524',
    fontFamily: Font['poppins-bold'],
    fontSize: FontSize.large,
    textAlign: 'center',
  },
});

export default PantallaBienvenida;

