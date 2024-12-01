import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const BuscarServicio2 = () => {
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
              <TextInput
                style={styles.timeInput}
                placeholder="Inicio"
                value={hours[day].start}
                onChangeText={(value) => handleTimeChange(day, 'start', value)}
                editable={days[day]}
              />
              <Text style={styles.toText}>a</Text>
              <TextInput
                style={styles.timeInput}
                placeholder="Fin"
                value={hours[day].end}
                onChangeText={(value) => handleTimeChange(day, 'end', value)}
                editable={days[day]}
              />
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('ResultadosBusqueda')}>
            <Text style={styles.nextButtonText}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.prevButton} onPress={() => navigation.navigate('BuscarServicio1')}>
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
});

export default BuscarServicio2;