import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from "../API_URL"; 
import ResultadosBusqueda from './ResultadosBusqueda';
import { Picker } from '@react-native-picker/picker';

const BuscarServicio2 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'BuscarServicio2'>>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState([]);


  const buscarProveedores = async (nombreServicio: string) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');
      if (!accessToken) {
        throw new Error('No se encontró el token de acceso. Por favor, inicia sesión.');
      }

      const response = await axios.get(`${API_URL}/buscar-proveedores/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        params: { nombre_servicio: nombreServicio },
      });

    //  setProviders(response.data.proveedores || []);
     
        const todosLosProveedores = response.data.proveedores || [];

        // Filtro para excluir tu propio usuario
        const proveedoresFiltrados = todosLosProveedores.filter((proveedor: any) => proveedor.id !== parseInt(userId));
        
        if (proveedoresFiltrados.length > 0) {
          setProviders(proveedoresFiltrados);
          navigation.navigate('ResultadosBusqueda', { proveedores: proveedoresFiltrados });
        } else {
        navigation.navigate('ResultadosBusqueda', { proveedores: [], error: 'No se encontraron proveedores para el servicio solicitado (excluyendo tu cuenta).' });
        }
      
    //  if (response.data.proveedores && response.data.proveedores.length > 0) {
      //  setProviders(response.data.proveedores);
      //  navigation.navigate('ResultadosBusqueda', { proveedores: response.data.proveedores });
      //}
 //     navigation.navigate('ResultadosBusqueda', { proveedores: response.data.proveedores });

    } catch (error: any) {
      navigation.navigate('ResultadosBusqueda', { 
        proveedores: [], 
        error: error.response?.data?.message || 'No se encontraron proveedores para el servicio solicitado.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!route.params || !route.params.selectedService) {
      setErrorMessage('No se seleccionó ningún servicio.');
      return;
    }
  
    console.log('BuscarServicio2: servicio seleccionado:', route.params.selectedService);
  
    buscarProveedores(route.params.selectedService[0]);
  };

  const [description, setDescription] = useState('');
  const [days, setDays] = useState({
    Lunes: false,
    Martes: false,
    Miércoles: false,
    Jueves: false,
    Viernes: false,
    Sábado: false,
    Domingo: false,
  });
  const [hours, setHours] = useState({
    Lunes: { start: '', end: '' },
    Martes: { start: '', end: '' },
    Miércoles: { start: '', end: '' },
    Jueves: { start: '', end: '' },
    Viernes: { start: '', end: '' },
    Sábado: { start: '', end: '' },
    Domingo: { start: '', end: '' },
  });

  const toggleDay = (day) => {
    setDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const handleTimeChange = (day, timeType, value) => {
    setHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [timeType]: value },
    }));
  };

   // Función para generar las opciones de hora
   const generateHourOptions = () => {
    const opciones = [];
    for (let i = 0; i < 24; i++) {  // Generar horas entre 00 y 23
      const hora = `${i.toString().padStart(2, '0')} hs`;  // Formato de hora: 00, 01, ..., 23
      opciones.push(
        <Picker.Item label={hora} value={hora} key={hora} />
      );
    }
    return opciones;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buscar un servicio (2/2)</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.label}>Descripción del Servicio:</Text>

        <View style={styles.dayContainer}>
          <Text style={styles.dayLabel}>Día</Text>
          <Text style={styles.hourLabel}>Hora</Text>
          {Object.keys(days).map((day) => (
            <View style={styles.dayRow} key={day}>
              <Switch
                value={days[day]}
                onValueChange={() => toggleDay(day)}
              />
              <Text style={styles.dayText}>{day}</Text>
              
            {/* Picker para la hora de inicio */}
            <View style={styles.pickerContainer}>
             <Picker
              selectedValue={hours[day].inicio}
              onValueChange={(itemValue) => handleTimeChange(day, 'inicio', itemValue)}
              enabled={days[day]}
              style={styles.picker}
            >
              {generateHourOptions()}
            </Picker>
            </View>

              <Text style={styles.toText}> a </Text>

            {/* Picker para la hora de fin */}
            <View style={styles.pickerContainer}>
            <Picker
              selectedValue={hours[day].fin}
              onValueChange={(itemValue) => handleTimeChange(day, 'fin', itemValue)}
              enabled={days[day]}
              style={styles.picker}
            >
              {generateHourOptions()}
            </Picker>
            </View>

            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.prevButton} onPress={() => navigation.navigate('BuscarServicio1')}>
            <Text style={styles.prevButtonText}>Atrás</Text>
          </TouchableOpacity>
        </View>
       
          {errorMessage ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}
              
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
  },
  header: {
    backgroundColor: '#197278', // Color de fondo
    color: 'white', // Color del texto
    fontSize: 18, // Tamaño del texto
    fontWeight: '600', // Negrita
    paddingVertical: 10, // Espaciado vertical interno
    paddingHorizontal: 15, // Espaciado horizontal interno
    textAlign: 'left', // Alineación a la izquierda
    marginBottom: 15, // Margen inferior
  },
  
  
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#197278',
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  dayContainer: {
    marginTop: 20,
  },
  dayLabel: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '600',
    marginBottom: 10,
  },
  hourLabel: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '600',
    position: 'absolute',
    right: 20,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  dayText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 8,
    flex: 1,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    width: 60,
    textAlign: 'center',
    marginHorizontal: 5,
    padding: 5,
  },
  toText: {
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    marginBottom: 70,
  },
  prevButton: {
    borderWidth: 1,
    borderColor: '#197278',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginTop: 40,
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
    marginTop: 40,
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
  errorContainer: {
    backgroundColor: '#F8D7DA',
    borderRadius: 10,
    padding: 10,
  },
  errorText: {
    color: '#A94442',
    fontSize: 14,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: 121,
    marginVertical: 10,
  },
  pickerItem: {
    fontSize: 50, // Aumenta el tamaño de la fuente para que sea más fácil de leer
    paddingVertical: 30, // Da más espacio entre las opciones
  },
  pickerContainer: {
    borderWidth: 1, // Borde alrededor del contenedor
    borderColor: '#197278', // Color del borde
    borderRadius: 8, // Bordes redondeados
    backgroundColor: 'white', // Fondo blanco
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.2, // Opacidad de la sombra
    shadowRadius: 4, // Radio de la sombra
    elevation: 4, // Elevación para Android
  },
});

export default BuscarServicio2;