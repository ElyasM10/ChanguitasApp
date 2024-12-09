import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';  // Importar Checkbox de react-native-paper
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const BuscarServicio1 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedService, setSelectedService] = useState<string | null>(null);


  const handleSelectService = (service: string) => {
    // Seleccionar un solo servicio, desmarcando el anterior
    setSelectedService(service === selectedService ? null : service);
  };

  const handleNext = () => {
    if (!selectedService) {
      alert("Por favor selecciona un servicio.");
      return;
    }
    navigation.navigate('pruebaBusqueda', { selectedService: [selectedService] });
  };


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.header}>Buscar un servicio (1/3)</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Sección de servicios */}
         {/* Sección de servicios */}
         {renderCategory("BELLEZA", ["Depilacion", "Maquillaje", "Manicura", "Peluqueria", "Podologia"], selectedService, handleSelectService)}
        {renderCategory("JARDINERÍA", ["Corte de pasto", "Arreglo jardín", "Limpieza jardín"], selectedService, handleSelectService)}
        {renderCategory("LIMPIEZA", ["Limpieza de hogar", "Limpieza vehículo"], selectedService, handleSelectService)}
        {renderCategory("HOGAR", [
          "Gasista", "Electricista", "Plomero", "Carpintero", 
          "Pintor", "Albañil", "Ziguería", "Gomería", 
          "Electrodomésticos", "Calderista"
        ], selectedService, handleSelectService)}
        {renderCategory("CUIDADO DE PERSONAS", ["Niñero/a", "Cuidado de adultos mayores"], selectedService, handleSelectService)}
        {renderCategory("EDUCACIÓN", ["Clases particulares", "Clases de música", "Clases de idiomas"], selectedService, handleSelectService)}
        {renderCategory("MUDANZA", ["Fletes", "Movimiento de muebles"], selectedService, handleSelectService)}
        {renderCategory("INVIERNO", ["Limpieza de nieve", "Sal en veredas"], selectedService, handleSelectService)}
        {renderCategory("CONTROL DE PLAGAS", ["Fumigación", "Control de roedores"], selectedService, handleSelectService)}

        {/* Botones de acción */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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


// Función para renderizar cada categoría de servicios
const renderCategory = (title, options, selectedService, handleSelectService) => (
  <View key={title}>
    <Text style={styles.categoryTitle}>{title}</Text>
    {options.map(option => (
      <View style={styles.optionContainer} key={option}>
        <Checkbox
          status={selectedService === option ? 'checked' : 'unchecked'}
          onPress={() => handleSelectService(option)}
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 0,
    backgroundColor: '#197278', // Color de fondo azul
  },
  backButton: {
    marginRight: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white', // Color blanco para el texto
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
