import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from "../API_URL"; 
import { RootStackParamList } from '../../AppNavigator';
import { useNavigation,useRoute, RouteProp, NavigationProp } from '@react-navigation/native';

const pruebaBusqueda = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'pruebaBusqueda'>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!route.params || !route.params.selectedService) {
      setErrorMessage('No se seleccionó ningún servicio.');
      return;
    }
  
    console.log('Pruebabusqueda: servicio seleccionado:', route.params.selectedService);
  
    buscarProveedores(route.params.selectedService[0]);
  }, [route.params]);

  const buscarProveedores = async (nombreServicio: string) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
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

      setProviders(response.data.proveedores || []);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Error al buscar proveedores.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultados de Proveedores</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={providers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.providerContainer}>
              <Text style={styles.providerText}>{item.nombre}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default pruebaBusqueda;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  providerContainer: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  providerText: {
    fontSize: 16,
  },
});
