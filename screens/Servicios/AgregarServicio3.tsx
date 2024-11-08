import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const AgregarServicio3 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Agregar un servicio (3/3)</Text>

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
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('MisServicios')}>
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
        <TouchableOpacity onPress={() => navigation.navigate('AgregarServicio1')} style={styles.iconoNavegacion}>
          <Ionicons name="search-outline" size={24} color="gray" />
          <Text style={styles.textoNavegacion}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AgregarServicio1')} style={styles.iconoNavegacion}>
          <Ionicons name="grid-outline" size={24} color="gray" />
          <Text style={styles.textoNavegacion}>Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PantallaBienvenida')} style={styles.iconoNavegacion}>
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
    fontSize: 24,
    fontWeight: '600',
    padding: 20,
    marginTop: 40,
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
  scrollContainer: {
    paddingHorizontal: 20,
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