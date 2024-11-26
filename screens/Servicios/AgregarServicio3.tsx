import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const AgregarServicio3 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [description, setDescription] = useState('');

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
