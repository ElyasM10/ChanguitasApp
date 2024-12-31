import React, { useState,useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Image, Alert, ScrollView, Platform} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../API_URL';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const EditarDatosPersonales = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  // Estado para la foto de perfil
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [datosOriginales, setDatosOriginales] = useState({
    first_name: '',
    last_name: '',
    fechaNacimiento: '',
    email: '',
    telefono: '',
    direccion: {
      calle: '',
      altura: '',
      nroDepto: '',
      piso: '',
      barrio: '',
    },
  });

  const [camposModificados, setCamposModificados] = useState({
    first_name: '',
    last_name: '',
    fechaNacimiento: '',
    email: '',
    telefono: '',
    direccion: {
      calle: '',
      altura: '',
      nroDepto: '',
      piso: '',
      barrio: '',
    },
  });


  // Función para obtener la foto de perfil desde el backend
  const obtenerFotoPerfil = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!accessToken || !userId) {
        throw new Error('No se encontraron credenciales de usuario');
      }

      const respuesta = await axios.get(`${API_URL}/usuarios/${userId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Actualiza el estado con la URL de la imagen
      setImageUri(respuesta.data.fotoPerfil || 'https://via.placeholder.com/80');
    } catch (error) {
      console.error('Error al obtener la foto de perfil:', error);
      Alert.alert('Error', 'No se pudo cargar la imagen de perfil.');
    }
  };

  
  // Llama a obtenerFotoPerfil al montar el componente
  useEffect(() => {
    obtenerFotoPerfil();
  }, []);

  const manejarCambioCampo = (campo: string, valor: any) => {
    if (campo.startsWith('direccion.')) {
      const campoDir = campo.split('.')[1];
      setCamposModificados(prev => ({
        ...prev,
        direccion: {
          ...prev.direccion,
          [campoDir]: valor
        }
      }));
    } else {
      setCamposModificados(prev => ({
        ...prev,
        [campo]: valor
      }));
    }
  };


 /*
      const payload = {
        first_name: nombre.trim(),
        last_name: apellido.trim(),
        fechaNacimiento: fechaNacimiento || null,
        email: correo.trim(),
        telefono: telefono.trim(),
        direccion: {
            calle: calle.trim(),
            altura: altura && !isNaN(Number(altura)) ? parseInt(altura, 10) : null,
            nroDepto: nroDepto && !isNaN(Number(nroDepto)) ? parseInt(nroDepto, 10) : null,
            piso: piso && !isNaN(Number(piso)) ? parseInt(piso, 10) : null,
            barrio: barrio.trim(),
        },
        fotoPerfil: imageUri || null,
    };
   */

 const enviarFoto = async () => {
  try {
    if (!imageUri) {
      alert("Por favor, selecciona una imagen antes de enviarla.");
      return;
    }

    const formData = new FormData();
    const response = await fetch(imageUri);
    const blob = await response.blob();
    
    const fileType = blob.type.split('/')[1] || 'jpg'; // Define un tipo por defecto si no se encuentra
    formData.append('fotoPerfil', blob, `photo.${fileType}`);

    
    const accessToken = await AsyncStorage.getItem('accessToken');
    const userId = await AsyncStorage.getItem('userId');

    if (!accessToken || !userId) {
      throw new Error('No se encontraron credenciales de usuario');
    }

   
    const respuesta = await axios.patch(`${API_URL}/usuarios/${userId}/`, formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      }
    });

    console.log('Response Data:', respuesta.data);
    Alert.alert('Éxito', 'Foto de perfil actualizada correctamente.');
  } catch (error) {
    console.error('Error al enviar la foto:', error);
    Alert.alert('Error', 'Ocurrió un problema con la conexión.');
  }
}
  // Función para guardar cambios
  const guardarCambios = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');
  
      if (!accessToken || !userId) {
        throw new Error('No se encontraron credenciales de usuario');
      }
  
      // Filtrar los campos que han sido modificados
      const datosActualizados = {}; // Crea un objeto vacío para almacenar los campos que realmente han cambiado
      Object.keys(camposModificados).forEach((campo) => { // Recorre todas las claves del objeto `camposModificados`, que contiene los campos editados.
        if (typeof camposModificados[campo] === 'object') {
          // Si es un objeto anidado (como direccion), filtrar los campos internos modificados
          const subCampos = {};
              // Recorre las claves del campo anidado (como 'ciudad', 'calle', etc.).
          Object.keys(camposModificados[campo]).forEach((subCampo) => {
             // Comparar el valor del subcampo modificado con el valor original.
            // Si son diferentes, significa que el subcampo ha cambiado.
            if (camposModificados[campo][subCampo] !== datosOriginales[campo][subCampo]) {
              subCampos[subCampo] = camposModificados[campo][subCampo];
            }
          });
          if (Object.keys(subCampos).length > 0) { // Si hay al menos un subcampo modificado, agregarlo al objeto `datosActualizados`.
            datosActualizados[campo] = subCampos;
          }
        } else if (camposModificados[campo] !== datosOriginales[campo]) {
          // Si es un campo simple, agregarlo si cambió
          datosActualizados[campo] = camposModificados[campo];
        }
      });

      // Si no hay cambios, no enviar la solicitud
      if (Object.keys(datosActualizados).length === 0) {
        Alert.alert('Sin cambios', 'No hay campos modificados para guardar.');
        return;
      }
  
      // Realizar la solicitud PATCH al backend
      const response = await fetch(`${API_URL}/usuarios/${userId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(datosActualizados),
      });
  
      if (response.ok) {
        Alert.alert('Éxito', 'Datos actualizados correctamente.');
        navigation.navigate('PantallaHome');
      } else {
        const errorData = await response.json().catch(() => ({}));
        Alert.alert('Error', errorData.detail || 'No se pudieron guardar los cambios.');
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      Alert.alert('Error', 'Ocurrió un problema con la conexión.');
    }
  };
  
  
  // Funciones para manejar la selección de imagen
  const manejarRespuestaSelectorImagen = (resultado: ImagePicker.ImagePickerResult) => {
    if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
      setImageUri(resultado.assets[0].uri);
    }
  };

 
  const manejarCambioArchivoWeb = (event: Event) => {
    const target = event.target as HTMLInputElement; // Asegúrate de que el target sea un input de archivo
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
    <SafeAreaView style={estilos.contenedor}>
    <ScrollView contentContainerStyle={estilos.scrollContainer}>
      {/* Header con Perfil*/}
      <View style={estilos.header}>
        <Text style={estilos.textoEncabezado}>Perfil</Text>
      </View>

     {/* Barra de pestañas */}
     <View style={estilos.barraPestanas}>
        <TouchableOpacity style={estilos.pestanaInactiva} onPress={() => navigation.navigate('PantallaPerfilEditarUsuario')}>
          <Text style={estilos.textoPestanaInactiva}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.pestanaActiva} onPress={() => navigation.navigate('EditarDatosPersonales')}>
          <Text style={estilos.textoPestanaActiva}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.pestanaInactiva} onPress={() => navigation.navigate('MisServicios')}>
          <Text style={estilos.textoPestanaInactiva}>Mis servicios</Text>
        </TouchableOpacity>
      </View>


   
       {/* Sección para cambiar la foto */}
       <View style={estilos.seccionFoto}>
          <Image 
            source={{ uri: imageUri || 'https://via.placeholder.com/80' }} 
            style={estilos.imagenUsuario} 
          />
          <TouchableOpacity onPress={mostrarOpcionesSelectorImagen}>
            <Text style={estilos.cambiarFotoTexto}>Cambiar foto</Text>
          </TouchableOpacity>

          {/* Botón para enviar la foto */}
          <TouchableOpacity onPress={enviarFoto}>
            <Text style={estilos.cambiarFotoTexto}>Enviar Foto</Text>
          </TouchableOpacity>
        </View>

          {/* Formulario de datos personales */}
          <View style={estilos.formulario}>
      <Text style={estilos.label}>Nombre</Text>
          <TextInput
            style={estilos.input}
            value={camposModificados.first_name || datosOriginales.first_name || ''}
            onChangeText={(valor) => manejarCambioCampo('first_name', valor)}
          />

          <Text style={estilos.label}>Apellido</Text>
          <TextInput
            style={estilos.input}
            value={camposModificados.last_name || datosOriginales.last_name || ''}
            onChangeText={(valor) => manejarCambioCampo('last_name', valor)}
          />

          <Text style={estilos.label}>Fecha de nacimiento</Text>
          <TextInput
            style={estilos.input}
            value={camposModificados.fechaNacimiento || datosOriginales.fechaNacimiento || ''}
            onChangeText={(valor) => manejarCambioCampo('fechaNacimiento', valor)}
          />

          <Text style={estilos.label}>Correo electrónico</Text>
          <TextInput
            style={estilos.input}
            value={camposModificados.email || datosOriginales.email || ''}
            onChangeText={(valor) => manejarCambioCampo('email', valor)}
          />

          <Text style={estilos.label}>Teléfono</Text>
          <TextInput
            style={estilos.input}
            value={camposModificados.telefono || datosOriginales.telefono || ''}
            onChangeText={(valor) => manejarCambioCampo('telefono', valor)}
          />

          <Text style={estilos.label}>Calle</Text>
          <TextInput
            style={estilos.input}
            value={camposModificados.direccion?.calle || datosOriginales.direccion.calle || ''}
            onChangeText={(valor) => manejarCambioCampo('direccion.calle', valor)}
          />

          <Text style={estilos.label}>Altura</Text>
          <TextInput
            style={estilos.input}
            value={camposModificados.direccion?.altura || datosOriginales.direccion.altura || ''}
            onChangeText={(valor) => manejarCambioCampo('direccion.altura', valor)}
          />

          <Text style={estilos.label}>Número de Departamento</Text>
          <TextInput
            style={estilos.input}
            value={camposModificados.direccion?.nroDepto || datosOriginales.direccion.nroDepto || ''}
            onChangeText={(valor) => manejarCambioCampo('direccion.nroDepto', valor)}
          />

          <Text style={estilos.label}>Piso</Text>
          <TextInput
            style={estilos.input}
            value={camposModificados.direccion?.piso || datosOriginales.direccion.piso || ''}
            onChangeText={(valor) => manejarCambioCampo('direccion.piso', valor)}
          />

          <Text style={estilos.label}>Barrio</Text>
          <TextInput
            style={estilos.input}
            value={camposModificados.direccion?.barrio || datosOriginales.direccion.barrio || ''}
            onChangeText={(valor) => manejarCambioCampo('direccion.barrio', valor)}
          />
     </View>
      
      
      {/* Botón de Guardar Cambios*/}
      <TouchableOpacity onPress={guardarCambios} style={estilos.botonGuardarCambios}>
        <Text style={estilos.textoBotonGuardar}>Guardar Cambios</Text>
      </TouchableOpacity>
      </ScrollView>

      {/* Barra de navegación inferior */}
      <View style={estilos.barraNavegacion}>
        <TouchableOpacity onPress={() =>navigation.navigate('PantallaHome')} style={estilos.iconoNavegacion}>
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
    marginTop:43,
  },
  header: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: 'white',
  },
  textoEncabezado: {
    fontSize: 24,
    fontWeight: '600',
    marginRight:300,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  barraPestanas: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
  },
  pestanaActiva: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#197278',
  },
  pestanaInactiva: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textoPestanaActiva: {
    fontSize: 16,
    color: '#197278',
  },
  textoPestanaInactiva: {
    fontSize: 16,
    color: '#666',
  },
  opcion: {
    fontSize: 16,
    color: 'gray',
  },
  opcionSeleccionada: {
    color: '#197278',
    fontWeight: '600',
  },
  seccionFoto: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imagenUsuario: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
  },
  cambiarFotoTexto: {
    color: '#197278',
    marginTop: 10,
  },
  formulario: {
    paddingHorizontal: 20,
    marginTop: -20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
  },
  barraNavegacion: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  iconoNavegacion: {
    alignItems: 'center',
  },
  textoNavegacion: {
    fontSize: 12,
    color: 'gray',
  },
  botonGuardarCambios: {
    backgroundColor: '#197278',
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: 'center',
    width: '80%',  
    alignSelf: 'center',
    marginTop: 32, 
  },
  textoBotonGuardar: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80, 
  }
});

export default EditarDatosPersonales;