import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Image, Alert, ScrollView} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../API_URL';

const EditarDatosPersonales = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // Estados para los datos personales
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');
  


  // Nuevos estados para dirección
  const [calle, setCalle] = useState('');
  const [altura, setAltura] = useState('');
  const [nroDepto, setNroDepto] = useState('');
  const [piso, setPiso] = useState('');
  const [barrio, setBarrio] = useState('');

  const decodeJWT = (token: string) => {
    const base64Url = token.split('.')[1]; // Extrae la segunda parte del token (payload)
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Reemplaza caracteres no válidos para Base64
    const decoded = JSON.parse(atob(base64)); // Decodifica y parsea el JSON
    return decoded;
  };
  
   
  // Función para guardar cambios
  const guardarCambios = async () => {
    try {

      // Obtén el token de acceso desde AsyncStorage
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log('Token obtenido de AsyncStorage:', accessToken); // Debug: Verifica el token obtenido
  
      if (!accessToken) {
        throw new Error('No se encontró el token de acceso');
      }
  
      // Decodifica el token para extraer el ID del usuario
      // Luego en el código
      const decoded = decodeJWT(accessToken);
      console.log('Payload decodificado:', decoded);

      const userId = decoded.user_id;
      console.log('ID del usuario extraído:', userId);


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
        }
    };
    
  
            // Hacer la solicitud al backend
      const response = await fetch(`${API_URL}/usuarios/${userId}/`, {
        method: 'PATCH', // Se especifica el método PATCH
        headers: {
          'Content-Type': 'application/json', // Tipo de contenido JSON
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload), // Convertir el objeto payload a JSON
      });

      console.log('Response Status:', response.status);
      const responseData = await response.json();
      console.log('Response Data:', responseData);
  
      if (response.ok) {
        Alert.alert('Éxito', 'Datos actualizados correctamente.');
        navigation.navigate('PantallaBienvenida');
      } else {
        const errorData = await response.json().catch(() => ({})); // Manejo de JSON malformado.
        console.error('Error en la API:', errorData);
        Alert.alert('Error', errorData.detail || 'No se pudieron guardar los cambios. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      Alert.alert('Error', 'Ocurrió un problema con la conexión.');
    }
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


    {/* Sección para cambiar la foto 
      <View style={estilos.seccionFoto}>
        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={estilos.imagenUsuario} />
        <Text style={estilos.cambiarFotoTexto}>Cambiar foto</Text>
      </View>
      */}

      {/* Formulario de datos personales */}
      <View style={estilos.formulario}>
        <Text style={estilos.label}>Nombre</Text>
        <TextInput style={estilos.input} placeholder="Nombre" value={nombre} onChangeText={setNombre}/>

        <Text style={estilos.label}>Apellido</Text>
        <TextInput style={estilos.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />

        <Text style={estilos.label}>Fecha de nacimiento</Text>
        <TextInput style={estilos.input} placeholder="aaaa-dd-mm" value={fechaNacimiento} onChangeText={setFechaNacimiento}/>

        <Text style={estilos.label}>Correo electrónico</Text>
        <TextInput style={estilos.input} placeholder="changuitas@app.com" value={correo} onChangeText={setCorreo} />

        <Text style={estilos.label}>Teléfono</Text>
        <TextInput style={estilos.input} placeholder="Número de teléfono" value={telefono} onChangeText={setTelefono} />

        <Text style={estilos.label}>Calle</Text>
        <TextInput style={estilos.input} placeholder="Nombre de la calle" value={calle} onChangeText={setCalle}/>

        <Text style={estilos.label}>Altura</Text>
        <TextInput style={estilos.input} placeholder="Número de altura" value={altura} onChangeText={setAltura} inputMode="numeric"/>

      
        <Text style={estilos.label}>Barrio</Text>
        <TextInput style={estilos.input} placeholder="Nombre del barrio" value={barrio} onChangeText={setBarrio}/>

  


     </View>
      
      {/* Botón de Guardar Cambios 
        <Text style={estilos.label}>Número de Departamento</Text>
        <TextInput style={estilos.input} placeholder="Número de departamento" value={nroDepto} onChangeText={setNroDepto} inputMode="numeric"/>

        <Text style={estilos.label}>Piso</Text>
        <TextInput style={estilos.input} placeholder="Número de piso" value={piso} onChangeText={setPiso} inputMode="numeric"/>


      */}
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
    paddingBottom: 20, 
  }
});

export default EditarDatosPersonales;