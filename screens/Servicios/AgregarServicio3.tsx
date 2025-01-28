import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation,useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';
import API_URL from '../API_URL';
import { Dialog } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AgregarServicio3 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'AgregarServicio3'>>();
  const [description, setDescription] = useState('');

  // Datos pasados desde AgregarServicio2
  const { datosSeleccionados } = route.params || {};

  useEffect(() => {
    console.log('Componente AgregarServicio3 montado');
    if (datosSeleccionados) {
      console.log('Datos recibidos:', datosSeleccionados);
    } else {
      console.log('No se recibieron datos.');
    }
  }, [datosSeleccionados]);

  const manejarGuardarServicio = async () => {
    if (!datosSeleccionados) {
      Alert.alert('Error', 'No hay datos para guardar.');
      return;
    }

 
   // Armo la lista de datos para enviar
   const formatearHora = (hora: string) => {
    const [horaPartes, minutos] = hora.split(':');
    return `${horaPartes}:${minutos}:00`;  // Añadir los segundos
  };
  
  // Uso en el frontend para enviar los datos
  const datosServicio = datosSeleccionados.dias.map(dia => ({
    nombreServicio: datosSeleccionados.nombreServicio,
    descripcion: datosSeleccionados.descripcion,
    dia: dia.dia,
    desdeHora: formatearHora(dia.desdeHora),
    hastaHora: formatearHora(dia.hastaHora),
  }));
 


    console.log('Datos del primer día:', datosServicio);
 
   // Extraer los datos de cada día y sus respectivas horas
  datosSeleccionados.dias.map(dia => {
    console.log('Nombre del Servicio:', datosSeleccionados.nombreServicio);
    console.log('Descripción:', datosSeleccionados.descripcion);
    console.log('Día:', dia.dia);           // El nombre del día
    console.log('Hora de Inicio:', dia.desdeHora); // Hora de inicio
    console.log('Hora de Fin:', dia.hastaHora);   // Hora de fin
    console.log('---'); // Separador para cada día
  });

    try {
      // Verifica que los datos estén bien formateados
      console.log('Preparando el POST...');
      console.log("Datos que se enviarán al backend:", JSON.stringify(datosServicio, null, 2));

      const response = await fetch(`${API_URL}/servicios/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(datosServicio),
      });

      console.log('Respuesta de la API:', response);
      
      const data = await response.json();

      if (!response.ok) {
        console.log('Respuesta no OK:', response.status, response.statusText);
        console.error("Detalles del error:", data);  // Muestra los detalles
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      
      console.log('Datos recibidos de la API:', data);

      Alert.alert('Éxito', 'Servicio creado exitosamente');

      const userId = await AsyncStorage.getItem('userId');

      const servicio = data[0].id;
    
    const fechaDesde = new Date().toISOString().split('T')[0];
    //obtiene la fecha actual en el formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ), y luego extrae solo la parte de la fecha (YYYY-MM-DD).
    const cuerpo = {
      servicio:servicio, // ID del servicio
      proveedor: userId, // ID del proveedor
      fechaDesde: fechaDesde, 
      fechaHasta: null //por ahora null
    };


    console.log('Datos que se enviarán:', JSON.stringify(cuerpo));
    // Se realiza la solicitud al backend para la vinculacion
    const respuesta = await fetch(`${API_URL}/proveedores-servicios/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(cuerpo) 
    });

    // Manejo de la respuesta
    if (respuesta.ok) {
      const datos = await respuesta.json();
      console.log('Vinculación exitosa:', datos);
    } else {
      console.error('Error al vincular el servicio:', respuesta.status, respuesta.statusText);
    }



      navigation.navigate('PantallaHome');  // Navegar a PantallaHome
    } catch (error: any) {
      console.error('Error al guardar el servicio:', error);
      const errorMessage = error.message || 'Error desconocido';
      Alert.alert('Error', `No se pudo crear el servicio: ${errorMessage}`);
    }
  }

  return (
    <View style={styles.container}>
      {/* Encabezado con diseño azul*/}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Agregar un servicio (3/3)</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.label}>Subir Fotos (Opcional):</Text>

        {/* Encabezado para subir fotos */}
        <View style={styles.encabezado}>
          <TouchableOpacity onPress={() => navigation.navigate('AgregarServicio3')}>
            <Text style={styles.opcion}>+ Buscar en el teléfono</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AgregarServicio3')}>
            <Text style={styles.opcion}>+ Sacar foto con la cámara</Text>
          </TouchableOpacity>
        </View>

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={manejarGuardarServicio}>
        {/* Esto es solo texto que debe ir dentro de un componente Text */}
        <Text style={styles.nextButtonText}>Publicar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.prevButton} onPress={() => navigation.navigate('AgregarServicio2')}>
            <Text style={styles.prevButtonText}>Atrás</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Barra de navegación inferior */}
      <View style={styles.barraNavegacion}>
        <TouchableOpacity onPress={() => navigation.navigate('PantallaHome')} style={styles.iconoNavegacion}>
          <Ionicons name="home-outline" size={24} color="gray" />
          <Text style={styles.textoNavegacion}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('BuscarServicio1')} style={styles.iconoNavegacion}>
          <Ionicons name="search-outline" size={24} color="gray" />
          <Text style={styles.textoNavegacion}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Historial1')} style={styles.iconoNavegacion}>
          <Ionicons name="grid-outline" size={24} color="gray" />
          <Text style={styles.textoNavegacion}>Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PantallaPerfilEditarUsuario')} style={styles.iconoNavegacion}>
          <Ionicons name="person-outline" size={24} color="gray" />
          <Text style={styles.textoNavegacion}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 40,
  },
  headerContainer: {
    backgroundColor: '#197278',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  encabezado: {
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  opcion: {
    fontSize: 16,
    color: '#197278',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  prevButton: {
    borderWidth: 1,
    borderColor: '#197278',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  prevButtonText: {
    color: '#197278',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#197278',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default AgregarServicio3;
