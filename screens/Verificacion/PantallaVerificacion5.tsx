
/*
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const PantallaVerificacion5 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  const seleccionarImagenDeGaleria = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagenSeleccionada(resultado.uri);
    }
  };

  const tomarFotoConCamara = async () => {
    let resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagenSeleccionada(resultado.uri);
    }
  };

  return (
    <SafeAreaView style={styles.areaSegura}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Verificación</Text>
        
        <Text style={styles.textoPaso}>PASO 5</Text>
        <Text style={styles.subtitulo}>Subir foto de perfil</Text>

        <View style={styles.contenedorImagenPerfil}>
          {imagenSeleccionada ? (
            <Image source={{ uri: imagenSeleccionada }} style={styles.imagenPerfil} />
          ) : (
            <Ionicons name="person-circle-outline" size={100} color="#B7B7B7" />
          )}
        </View>

        <TouchableOpacity onPress={seleccionarImagenDeGaleria}>
          <Text style={styles.textoOpcion}>+ Buscar en el teléfono</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={tomarFotoConCamara}>
          <Text style={styles.textoOpcion}>+ Sacar foto con la cámara</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('PantallaBienvenida')}>
          <LinearGradient
            colors={['#197278', '#9BCDC8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.botonGradiente}
          >
            <Text style={styles.textoBoton}>Siguiente</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contenedor: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  textoPaso: {
    fontSize: 16,
    color: '#197278',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  contenedorImagenPerfil: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  imagenPerfil: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  textoOpcion: {
    fontSize: 16,
    color: '#197278',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  botonGradiente: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',   
    justifyContent: 'center', 
  },
  textoBoton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PantallaVerificacion5;
*/