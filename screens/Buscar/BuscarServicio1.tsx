import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';  // Importar Checkbox de react-native-paper

import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const BuscarServicio1 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [selectedServices, setSelectedServices] = useState({
    "Depilacion":false,
    "Maquillaje":false,
    "Manicura": false,
    "Peluqueria":false,
    "Podologia":false,
    "Corte de pasto": false,
    "Arreglo jardín": false,
    "Limpieza jardín": false,
    "Limpieza de hogar": false,
    "Limpieza vehículo": false,
    "Gasista": false,
    "Electricista": false,
    "Plomero": false,
    "Carpintero": false,
    "Pintor": false,
    "Albañil": false,
    "Ziguería": false,
    "Gomería": false,
    "Electrodomésticos": false,
    "Calderista": false,
    "Niñero/a": false,
    "Cuidado de adultos mayores": false,
    "Clases particulares": false,
    "Clases de música": false,
    "Clases de idiomas": false,
    "Fletes": false,
    "Movimiento de muebles": false,
    "Limpieza de nieve": false,
    "Sal en veredas": false,
    "Fumigación": false,
    "Control de roedores": false,
  });

  const toggleService = (service) => {
    setSelectedServices((prevSelected) => ({
      ...prevSelected,
      [service]: !prevSelected[service],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buscar un servicio (1/2)</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Sección de servicios */}
        {renderCategory("BELLEZA", ["Depilacion", "Maquillaje", "Manicura","Peluqueria","Podologia"], selectedServices, toggleService)}
        {renderCategory("JARDINERÍA", ["Corte de pasto", "Arreglo jardín", "Limpieza jardín"], selectedServices, toggleService)}
        {renderCategory("LIMPIEZA", ["Limpieza de hogar", "Limpieza vehículo"], selectedServices, toggleService)}
        {renderCategory("HOGAR", [
          "Gasista", "Electricista", "Plomero", "Carpintero", 
          "Pintor", "Albañil", "Ziguería", "Gomería", 
          "Electrodomésticos", "Calderista"
        ], selectedServices, toggleService)}
        {renderCategory("CUIDADO DE PERSONAS", ["Niñero/a", "Cuidado de adultos mayores"], selectedServices, toggleService)}
        {renderCategory("EDUCACIÓN", ["Clases particulares", "Clases de música", "Clases de idiomas"], selectedServices, toggleService)}
        {renderCategory("MUDANZA", ["Fletes", "Movimiento de muebles"], selectedServices, toggleService)}
        {renderCategory("INVIERNO", ["Limpieza de nieve", "Sal en veredas"], selectedServices, toggleService)}
        {renderCategory("CONTROL DE PLAGAS", ["Fumigación", "Control de roedores"], selectedServices, toggleService)}

        {/* Botones de acción */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('BuscarServicio2')}>
            <Text style={styles.nextButtonText}>Siguiente</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate('PantallaHome')} style={styles.iconoNavegacion}>
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

// Funcion para renderizar cada categoría de servicios
const renderCategory = (title, options, selectedServices, toggleService) => (
  <View key={title}>
    <Text style={styles.categoryTitle}>{title}</Text>
    {options.map(option => (
      <View style={styles.optionContainer} key={option}>
        <Checkbox
          status={selectedServices[option] ? 'checked' : 'unchecked'}
          onPress={() => toggleService(option)}
        />
        <Text style={styles.optionText}>{option}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    padding: 20,
    marginTop:40,

  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  categoryTitle: {
    fontSize: 16,
    color: '#197278',
    fontWeight: '600',
    marginTop: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  optionText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    marginBottom: 70,
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
  cancelButton: {
    borderWidth: 1,
    borderColor: '#197278',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  cancelButtonText: {
    color: '#197278',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: 'gray',
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

export default BuscarServicio1;