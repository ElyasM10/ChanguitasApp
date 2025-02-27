import { Alert, Platform, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';
import * as ImagePicker from 'expo-image-picker';

const PantallaVerificacion2 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  // Estado para la foto de perfil
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para el mensaje de error
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

  const handleImagePress = () => {
    setModalVisible(true); // Mostrar el modal cuando se presiona la imagen
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Cerrar el modal cuando se presiona el botón de cerrar
  };

  // Funciones para manejar la selección de imagen
  const manejarRespuestaSelectorImagen = (resultado: ImagePicker.ImagePickerResult) => {
    if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
      setImageUri(resultado.assets[0].uri);
    }
  };

 
  const manejarCambioArchivoWeb = (event: Event) => {
    const target = event.target as HTMLInputElement; 
    const file = target.files ? target.files[0] : null;
  
    if (file) {
      console.log("Imagen seleccionada:", file);
      setImageFile(file); // Actualiza el estado con el archivo seleccionado
      const imageUrl = URL.createObjectURL(file); // Genera una URL para mostrar la imagen seleccionada
      setImageUri(imageUrl);
    }
  };

  const mostrarOpcionesSelectorImagen = () => {
    if (Platform.OS === 'web') {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = manejarCambioArchivoWeb;
      fileInput.click();
    } else {
      Alert.alert("Seleccionar una imagen", "Elige la opción para seleccionar una imagen", [
        { text: "Cancelar", style: "cancel" },
        { text: "Tomar una foto", onPress: abrirCamara },
        { text: "Elegir desde la galería", onPress: abrirSelectorImagen },
      ]);
    }
  };

  const abrirSelectorImagen = async () => {
    const resultadoPermiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (resultadoPermiso.granted === false) {
      alert("Has rechazado el acceso a la galería de imágenes.");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true, // Activa el recorte
    aspect: [1, 1], // Define la relación de aspecto del recorte (cuadrado)
    quality: 0.8, // Calidad de la imagen (0.1 a 1.0)
    });

    manejarRespuestaSelectorImagen(resultado);
  };

  const abrirCamara = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync(); // Solicita permisos
  
    if (status !== "granted") {
      alert("Se requieren permisos para acceder a la cámara.");
      return;
    }
  
    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // Activa el recorte
      aspect: [1, 1], // Relación de aspecto cuadrada
      quality: 0.8, // Calidad de la imagen
    });
  
    manejarRespuestaSelectorImagen(resultado);
  };



  return (
    <SafeAreaView style={styles.areaSegura}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Verificación</Text>
        <Text style={styles.textoPaso}>PASO 5</Text>
        <Text style={styles.subtitulo}>Subir foto de perfil</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}></TouchableOpacity>

        <View style={styles.contenedorImagenPerfil}>
  <TouchableOpacity onPress={handleImagePress} style={styles.contenedorImagenPerfil}>
    {imageUri ? (
      <Image 
        source={{ uri: imageUri }} 
        style={styles.imagenPerfil} 
      />
    ) : (
      <Ionicons 
        name="person-circle-outline" 
        size={100} 
        color="#B7B7B7" 
      />
    )}
  </TouchableOpacity>
</View>

        <TouchableOpacity onPress={mostrarOpcionesSelectorImagen}>
          <Text style={styles.textoOpcion}>+ Seleccionar Imagen</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="fade" transparent>
          <TouchableWithoutFeedback onPress={handleCloseModal}>
            <View style={styles.modalContainer}>
              <Image 
                source={{ uri: imageUri || 'https://via.placeholder.com/100' }} 
                style={styles.imagenModal} 
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <TouchableOpacity onPress={() => navigation.navigate('PantallaHome')} style={styles.botonContenedor}>
          <Text style={styles.textoBoton}>Siguiente →</Text>
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
    paddingTop: 50,
    alignItems: 'flex-start',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginRight:10,
  },
  textoPaso: {
    fontSize: 16,
    color: '#197278',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  contenedorImagenPerfil: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
    borderWidth: 5, 
    borderColor: '#5A9EA2',
    marginTop:10,
  },
  imagenPerfil: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  textoOpcion: {
    fontSize: 16,
    color: '#197278',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  botonContenedor: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#197278',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textoBoton: {
    color: '#197278',
    fontSize: 18,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  imagenModal: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'cover',
  },
});

export default PantallaVerificacion2;
