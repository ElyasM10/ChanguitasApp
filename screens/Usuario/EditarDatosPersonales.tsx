import React, { useState,useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Image, Alert, ScrollView, Platform} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../API_URL';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import FormData from 'form-data';
import { Snackbar } from 'react-native-paper';
import EstilosEditarDatosPersonales from './estilos/EstilosEditarDatosPersonales';


const EditarDatosPersonales = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  // Estado para la foto de perfil
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [showPasswordFields, setShowPasswordFields] = useState(false);

    // Estados para mostrar/ocultar contraseñas
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para el mensaje de error
   const [visible, setVisible] = useState(false);  // Estado para manejar la visibilidad del Snackbar
   const [message, setMessage] = useState('');  // Estado para almacenar el mensaje de error
 
  const [datosOriginales, setDatosOriginales] = useState({
    first_name: '',
    last_name: '',
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
    email: '',
    telefono: '',
    old_password: '',
    password: '',
    password2: '',
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

   /* const enviarFoto = async () => {
      try {
        if (!imageUri) {
          alert("Por favor, selecciona una imagen antes de enviarla.");
          return;
        }
    
        const formData = new FormData();
    
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const fileType = blob.type.split('/')[1] || 'jpg'; // Define un tipo por defecto si no se encuentra
        
      if(Platform.OS ==="web"){  
        formData.append('fotoPerfil', blob, `photo.${fileType}`);
      }else if(Platform.OS ==="android"){
        formData.append('fotoPerfil', {
          uri: imageUri, // URI de la imagen seleccionada.
          name: 'photo.png', // Nombre del archivo.
          type: 'image/png', // Tipo MIME del archivo.
        });
      }

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
    
       // console.log('Response Data:', respuesta.data);
        Alert.alert('Éxito', 'Foto de perfil actualizada correctamente.');
      } catch (error) {
        if (error.response) {
          // Errores de respuesta del servidor (códigos 4xx o 5xx)
          console.error('Error en la respuesta del servidor:', error.response.data);
          Alert.alert('Error', `Servidor respondió con un error: ${error.response.data.detail || 'Desconocido'}`);
        } else if (error.request) {
          // Errores de la solicitud (el servidor no responde o no se alcanza)
          console.error('Error en la solicitud:', error.request);
          Alert.alert('Error', 'No se pudo alcanzar el servidor. Por favor, verifica tu conexión.');
        } else {
          // Otros errores (problemas de formato, configuración, etc.)
          console.error('Error general:', error.message);
          Alert.alert('Error', `Ocurrió un error: ${error.message}`);
        }
      }
    };
*/

  // Función para guardar cambios
  const guardarCambios = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');
  
      if (!accessToken || !userId) {
        throw new Error('No se encontraron credenciales de usuario');
      }
  
    // Crear FormData para enviar tanto los datos como la imagen
    const formData = new FormData();

      // Agregar la imagen si existe y ha sido modificada
      if (imageUri) {
        try {
          const response = await fetch(imageUri);
          const blob = await response.blob();
          const fileType = blob.type.split('/')[1] || 'jpg';
          
          if (Platform.OS === "web") {
            formData.append('fotoPerfil', blob, `photo.${fileType}`);
          } else if (Platform.OS === "android") {
            formData.append('fotoPerfil', {
              uri: imageUri,
              name: 'photo.png',
              type: 'image/png',
            });
          }
        } catch (error) {
          console.error('Error al procesar la imagen:', error);
          Alert.alert('Error', 'No se pudo procesar la imagen seleccionada.');
          return;
        }
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
            if (camposModificados[campo][subCampo] !== datosOriginales[campo]?.[subCampo]) {
              subCampos[subCampo] = camposModificados[campo][subCampo];
            }
          });
          if (Object.keys(subCampos).length > 0) { // Si hay al menos un subcampo modificado, agregarlo al objeto `datosActualizados`.
            datosActualizados[campo] = subCampos;
            }
          } else if (camposModificados[campo] !== datosOriginales[campo] && campo !== 'password2') {
            if (showPasswordFields && (campo === 'password' || campo === 'old_password')) {
              if (camposModificados[campo]) {
            // Si es un campo simple, agregarlo si cambió
            datosActualizados[campo] = camposModificados[campo];
            }
          } else if (campo !== 'password' && campo !== 'old_password') {
            datosActualizados[campo] = camposModificados[campo];
            }
        }
      });

      // Validar contraseñas si se están cambiando
      if (showPasswordFields) {
        if (camposModificados.password !== camposModificados.password2) {
          Alert.alert('Error', 'Las contraseñas nuevas no coinciden');
          return;
        }
        if (!camposModificados.old_password) {
          Alert.alert('Error', 'Debe ingresar la contraseña actual');
          return;
        }
      }

      // Si no hay cambios y no hay nueva imagen, no enviar la solicitud
      if (Object.keys(datosActualizados).length === 0 && !imageUri) {
        Alert.alert('Sin cambios', 'No hay campos modificados para guardar.');
        return;
      }
  
    // Agregar los datos actualizados al FormData
    Object.keys(datosActualizados).forEach(key => {
      if (typeof datosActualizados[key] === 'object') {
        formData.append(key, JSON.stringify(datosActualizados[key]));
      } else {
        formData.append(key, datosActualizados[key]);
      }
    });

    /*
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
    }*/

    // Realizar la solicitud PATCH al backend usando FormData
    const response = await axios.patch(`${API_URL}/usuarios/${userId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      Alert.alert('Éxito', 'Datos actualizados correctamente.');
      navigation.navigate('PantallaHome');
    } else {
      Alert.alert('Error', 'No se pudieron guardar los cambios.');
    }
} catch (error) {
        //-------------------Mensajes de Error----------------
  if (error.response && error.response.status === 400) {
          const errorData = error.response.data; 
  let errorMessage = '';
  console.log("Bad request");
  // Diccionario para traducir claves y mensajes
  const translations = {
    email: 'Correo electrónico',
    telefono: 'Teléfono',
    direccion: 'Dirección',
    calle: 'Calle',
    altura: 'Altura',
    password: 'Contraseña',
    password2: 'Repetir contraseña',
  };

  const translatedErrors = {
    "Enter a valid email address.": "Introduce una dirección de correo electrónico válida.",
     "A valid integer is required.":"Introduce un valor valido",
    "A valid string is required.":"Introduce un valor valido"
  };

  // Función para traducir errores, incluyendo estructuras anidadas
  const translateErrors = (
    errors: Record<string, unknown>, // Especificamos que los valores pueden ser de cualquier tipo
    parentKey: string = ''
  ): string => {
    let message = '';
  
    for (const [key, value] of Object.entries(errors)) {
      const field = parentKey
        ? `${translations[parentKey] || parentKey} -> ${translations[key] || key}`
        : translations[key] || key;
  
      if (Array.isArray(value)) {
        // Si es un array, traducimos cada mensaje
        const messages = value.map((msg) =>
          typeof msg === 'string' ? translatedErrors[msg] || msg : ''
        );
        message += `${field}: ${messages.join(', ')}\n`;
      } else if (typeof value === 'object' && value !== null) {
        // Si es un objeto, llamamos recursivamente
        message += translateErrors(value as Record<string, unknown>, key);
      } else if (typeof value === 'string') {
        // Caso general (no array, no objeto)
        const singleMessage = translatedErrors[value] || value;
        message += `${field}: ${singleMessage}\n`;
      }
    }
  
    return message;
  };

  // Traducimos los errores
  errorMessage = translateErrors(errorData).trim();
  
     
        // Mostramos el mensaje de error en el Snackbar
        setMessage(errorMessage);
        setVisible(true);  // Mostrar el Snackbar
} 
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
    const resultadoPermiso = await ImagePicker.requestCameraPermissionsAsync();

    if (resultadoPermiso.granted === false) {
      alert("Has rechazado el acceso a la cámara.");
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync();

    manejarRespuestaSelectorImagen(resultado);
  };


  
  return (
  <SafeAreaView style={EstilosEditarDatosPersonales.contenedor}>
    <ScrollView contentContainerStyle={EstilosEditarDatosPersonales.scrollContainer}>
      {/* Header con Perfil*/}
      <View style={EstilosEditarDatosPersonales.header}>
        <Text style={EstilosEditarDatosPersonales.textoEncabezado}>Perfil</Text>
      </View>

     {/* Barra de pestañas */}
     <View style={EstilosEditarDatosPersonales.barraPestanas}>
        <TouchableOpacity style={EstilosEditarDatosPersonales.pestanaInactiva} onPress={() => navigation.navigate('PantallaPerfilEditarUsuario')}>
          <Text style={EstilosEditarDatosPersonales.textoPestanaInactiva}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={EstilosEditarDatosPersonales.pestanaActiva} onPress={() => navigation.navigate('EditarDatosPersonales')}>
          <Text style={EstilosEditarDatosPersonales.textoPestanaActiva}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={EstilosEditarDatosPersonales.pestanaInactiva} onPress={() => navigation.navigate('MisServicios')}>
          <Text style={EstilosEditarDatosPersonales.textoPestanaInactiva}>Mis servicios</Text>
        </TouchableOpacity>
      </View>

       {/* Sección para cambiar la foto */}
       <View style={EstilosEditarDatosPersonales.seccionFoto}>
          <Image 
            source={{ uri: imageUri || 'https://via.placeholder.com/80' }} 
            style={EstilosEditarDatosPersonales.imagenUsuario} 
          />
          <TouchableOpacity onPress={mostrarOpcionesSelectorImagen}>
            <Text style={EstilosEditarDatosPersonales.cambiarFotoTexto}>Cambiar foto</Text>
          </TouchableOpacity>
      
          {/* Botón para enviar la foto 
          <TouchableOpacity onPress={enviarFoto}>
            <Text style={EstilosEditarDatosPersonales.cambiarFotoTexto}>Enviar Foto</Text>
          </TouchableOpacity>
        </View>
        */}

        </View>

          {/* Formulario de datos personales */}
          <View style={EstilosEditarDatosPersonales.formulario}>
      <Text style={EstilosEditarDatosPersonales.label}>Nombre</Text>
          <TextInput
            style={EstilosEditarDatosPersonales.input}
            value={camposModificados.first_name || datosOriginales.first_name || ''}
            onChangeText={(valor) => manejarCambioCampo('first_name', valor)}
          />

          <Text style={EstilosEditarDatosPersonales.label}>Apellido</Text>
          <TextInput
            style={EstilosEditarDatosPersonales.input}
            value={camposModificados.last_name || datosOriginales.last_name || ''}
            onChangeText={(valor) => manejarCambioCampo('last_name', valor)}
          />

          <Text style={EstilosEditarDatosPersonales.label}>Correo electrónico</Text>
          <TextInput
            style={EstilosEditarDatosPersonales.input}
            value={camposModificados.email || datosOriginales.email || ''}
            onChangeText={(valor) => manejarCambioCampo('email', valor)}
          />

          <Text style={EstilosEditarDatosPersonales.label}>Teléfono</Text>
          <TextInput
            style={EstilosEditarDatosPersonales.input}
            value={camposModificados.telefono || datosOriginales.telefono || ''}
            onChangeText={(valor) => manejarCambioCampo('telefono', valor)}
          />

          <Text style={EstilosEditarDatosPersonales.label}>Calle</Text>
          <TextInput
            style={EstilosEditarDatosPersonales.input}
            value={camposModificados.direccion?.calle || datosOriginales.direccion.calle || ''}
            onChangeText={(valor) => manejarCambioCampo('direccion.calle', valor)}
          />

          <Text style={EstilosEditarDatosPersonales.label}>Altura</Text>
          <TextInput
            style={EstilosEditarDatosPersonales.input}
            value={camposModificados.direccion?.altura || datosOriginales.direccion.altura || ''}
            onChangeText={(valor) => manejarCambioCampo('direccion.altura', valor)}
          />

          <Text style={EstilosEditarDatosPersonales.label}>Número de Departamento</Text>
          <TextInput
            style={EstilosEditarDatosPersonales.input}
            value={camposModificados.direccion?.nroDepto || datosOriginales.direccion.nroDepto || ''}
            onChangeText={(valor) => manejarCambioCampo('direccion.nroDepto', valor)}
          />

          <Text style={EstilosEditarDatosPersonales.label}>Piso</Text>
          <TextInput
            style={EstilosEditarDatosPersonales.input}
            value={camposModificados.direccion?.piso || datosOriginales.direccion.piso || ''}
            onChangeText={(valor) => manejarCambioCampo('direccion.piso', valor)}
          />

          <Text style={EstilosEditarDatosPersonales.label}>Barrio</Text>
          <TextInput
            style={EstilosEditarDatosPersonales.input}
            value={camposModificados.direccion?.barrio || datosOriginales.direccion.barrio || ''}
            onChangeText={(valor) => manejarCambioCampo('direccion.barrio', valor)}
          />


          {/* Botón para mostrar/ocultar campos de contraseña */}
          <TouchableOpacity 
            style={EstilosEditarDatosPersonales.botonCambiarPassword}
            onPress={() => setShowPasswordFields(!showPasswordFields)}
          >
            <Text style={EstilosEditarDatosPersonales.textoCambiarPassword}>
              {showPasswordFields ? 'Cancelar cambio de contraseña' : 'Cambiar contraseña'}
            </Text>
          </TouchableOpacity>

          {/* Campos de contraseña */}
          {showPasswordFields && (
          <>
            <Text style={EstilosEditarDatosPersonales.label}>Contraseña actual</Text>
            <View style={EstilosEditarDatosPersonales.contenedorEntradaContrasena}>
              <TextInput
                style={EstilosEditarDatosPersonales.inputContrasena}
                secureTextEntry={!showOldPassword}
                value={camposModificados.old_password}
                onChangeText={(valor) => manejarCambioCampo('old_password', valor)}
              />
              <TouchableOpacity 
                style={EstilosEditarDatosPersonales.iconoOjo}
                onPress={() => setShowOldPassword(!showOldPassword)}
              >
                <Ionicons 
                  name={showOldPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>

            <Text style={EstilosEditarDatosPersonales.label}>Nueva contraseña</Text>
            <View style={EstilosEditarDatosPersonales.contenedorEntradaContrasena}>
              <TextInput
                style={EstilosEditarDatosPersonales.inputContrasena}
                secureTextEntry={!showNewPassword}
                value={camposModificados.password}
                onChangeText={(valor) => manejarCambioCampo('password', valor)}
              />
              <TouchableOpacity 
                style={EstilosEditarDatosPersonales.iconoOjo}
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Ionicons 
                  name={showNewPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>

            <Text style={EstilosEditarDatosPersonales.label}>Confirmar nueva contraseña</Text>
            <View style={EstilosEditarDatosPersonales.contenedorEntradaContrasena}>
              <TextInput
                style={EstilosEditarDatosPersonales.inputContrasena}
                secureTextEntry={!showConfirmPassword}
                value={camposModificados.password2}
                onChangeText={(valor) => manejarCambioCampo('password2', valor)}
              />
              <TouchableOpacity 
                style={EstilosEditarDatosPersonales.iconoOjo}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons 
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
          </>
        )}
     </View>
      
      
      {/* Botón de Guardar Cambios*/}
     {/* Condición para mostrar el botón solo si el Snackbar no está visible */}
      {!visible && (
        <TouchableOpacity onPress={guardarCambios} style={EstilosEditarDatosPersonales.botonGuardarCambios}>
          <Text style={EstilosEditarDatosPersonales.textoBotonGuardar}>Guardar Cambios</Text>
        </TouchableOpacity>
      )}

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}  // Ocultar el Snackbar cuando se cierre
        duration={Snackbar.DURATION_SHORT}    // Podemos intercalar entre  DURATION_LONG o DURATION_SHORT
        style={{
          position: 'absolute',
          top: -150,
          left: 0,
          right: 0,
          zIndex: 100000,  // Alto para asegurarse de que esté encima de otros elementos
        }}
      >
        {message}
      </Snackbar>


      </ScrollView>

      {/* Barra de navegación inferior */}
      <View style={EstilosEditarDatosPersonales.barraNavegacion}>
        <TouchableOpacity onPress={() =>navigation.navigate('PantallaHome')} style={EstilosEditarDatosPersonales.iconoNavegacion}>
          <Ionicons name="home-outline" size={24} color="gray" />
          <Text style={EstilosEditarDatosPersonales.textoNavegacion}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('BuscarServicio1')} style={EstilosEditarDatosPersonales.iconoNavegacion}>
          <Ionicons name="search-outline" size={24} color="gray" />
          <Text style={EstilosEditarDatosPersonales.textoNavegacion}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Historial1')} style={EstilosEditarDatosPersonales.iconoNavegacion}>
          <Ionicons name="grid-outline" size={24} color="gray" />
          <Text style={EstilosEditarDatosPersonales.textoNavegacion}>Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PantallaPerfilEditarUsuario')} style={EstilosEditarDatosPersonales.iconoNavegacion}>
          <Ionicons name="person-outline" size={24} color="gray" />
          <Text style={EstilosEditarDatosPersonales.textoNavegacion}>Perfil</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
    

  );
};

export default EditarDatosPersonales;