import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function SeleccionImagenes() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const manejarRespuestaSelectorImagen = (resultado: ImagePicker.ImagePickerResult) => {
    if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
      setImageUri(resultado.assets[0].uri);
    }
  };

  const mostrarOpcionesSelectorImagen = () => {
    Alert.alert("Seleccionar una imagen", "Elige la opción para seleccionar una imagen", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Tomar una foto",
        onPress: () => abrirCamara(),
      },
      {
        text: "Elegir desde la galería",
        onPress: () => abrirSelectorImagen(),
      },
    ]);
  };

  const abrirSelectorImagen = async () => {
    const resultadoPermiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (resultadoPermiso.granted === false) {
      alert("Has rechazado el acceso a la galería de imágenes.");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync();

    manejarRespuestaSelectorImagen(resultado);
  };

  const abrirCamara = async () => {
    const resultadoPermiso = await ImagePicker.requestCameraPermissionsAsync();

    if (resultadoPermiso.granted === false) {
      alert("Has rechazado el acceso a la cámara.");
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync();

    manejarRespuestaSelectorImagen(resultado);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Subir imagen</Text>
      <Button title="Seleccionar una imagen" onPress={mostrarOpcionesSelectorImagen} />
      {imageUri && (
        <Image 
          source={{ uri: imageUri }} 
          style={styles.image} 
          resizeMode="contain"
        />
      )}
    </View>
  );
}

export default SeleccionImagenes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#0C1947',
    fontSize: 20,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});