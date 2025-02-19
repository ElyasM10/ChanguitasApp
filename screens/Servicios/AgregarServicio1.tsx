import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper'; 
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const AgregarServicio1 = () => {
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
    navigation.navigate('AgregarServicio2', { selectedServices: [selectedService] });
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Agregar un servicio (1/3)</Text>
      </View>

      {/* Servicios */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderCategory("BELLEZA", ["Depilación", "Maquillaje", "Manicura", "Peluquería", "Podología"], selectedService, handleSelectService)}
        {renderCategory("JARDINERÍA", ["Corte de pasto", "Arreglo jardín", "Limpieza jardín"], selectedService, handleSelectService)}
        {renderCategory("LIMPIEZA", ["Limpieza de hogar", "Limpieza vehículo"], selectedService, handleSelectService)}
        {renderCategory("HOGAR", [
          "Gasista", "Electricista", "Plomero", "Carpintero",
          "Pintor", "Albañil", "Zinguería", "Gomería",
          "Electrodomésticos", "Calderista"
        ], selectedService, handleSelectService)}
        {renderCategory("CUIDADO DE PERSONAS", ["Niñero/a", "Cuidado de adultos mayores"], selectedService, handleSelectService)}
        {renderCategory("EDUCACIÓN", ["Clases particulares", "Clases de música", "Clases de idiomas"], selectedService, handleSelectService)}
        {renderCategory("MUDANZA", ["Fletes", "Movimiento de muebles"], selectedService, handleSelectService)}
        {renderCategory("INVIERNO", ["Limpieza de nieve", "Sal en veredas"], selectedService, handleSelectService)}
        {renderCategory("CONTROL DE PLAGAS", ["Fumigación", "Control de roedores"], selectedService, handleSelectService)}

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Siguiente</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('MisServicios')}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
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

// Función para renderizar categorías
const renderCategory = (
  title: string,
  options: string[],
  selectedService: string | null,
  handleSelectService: (service: string) => void
) => (
  <View key={title}>
    <Text style={styles.categoryTitle}>{title}</Text>
    {options.map(option => (
      <TouchableOpacity
        key={option}
        style={styles.optionContainer}
        onPress={() => handleSelectService(option)}
      >
        <Checkbox
          status={selectedService === option ? 'checked' : 'unchecked'}
          onPress={() => handleSelectService(option)}
        />
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#197278',
    padding: 15,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
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

export default AgregarServicio1;


{/* Version para seleccionar muchos servicios
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper'; 
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const AgregarServicio1 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [selectedServices, setSelectedServices] = useState({
    "Depilacion": false,
    "Maquillaje": false,
    "Manicura": false,
    "Peluqueria": false,
    "Podologia": false,
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

  const toggleService = (service: string) => {
    setSelectedServices((prevSelected) => ({
      ...prevSelected,
      [service]: !prevSelected[service],
    }));
  };

  const handleNext = () => {
    const selected = Object.keys(selectedServices).filter(service => selectedServices[service]);
    navigation.navigate('AgregarServicio2', { selectedServices: selected });
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Agregar un servicio (1/3)</Text>
      </View>

     
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderCategory("BELLEZA", ["Depilacion", "Maquillaje", "Manicura", "Peluqueria", "Podologia"], selectedServices, toggleService)}
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

        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Siguiente</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('MisServicios')}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
   
        // Barra de navegación inferior
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

// Función para renderizar categorías
const renderCategory = (title: string, options: string[], selectedServices: Record<string, boolean>, toggleService: (service: string) => void) => (
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
    marginTop: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#197278',
    padding: 15,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
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

export default AgregarServicio1;
*/}