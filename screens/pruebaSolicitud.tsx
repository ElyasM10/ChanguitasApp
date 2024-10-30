import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const PruebaSolicitud = () => {
  const [direcciones, setDirecciones] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchDirecciones = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8000/'); // Asegúrate de que la URL sea correcta
        console.log(response.data); // Verifica la estructura de los datos
        setDirecciones(response.data);
      } catch (error) {
        console.error('Error al obtener direcciones:', error);
      } finally {
        setLoading(false); // Cambia el estado de carga una vez que se complete la solicitud
      }
    };

    fetchDirecciones();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando direcciones...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Direcciones</Text>
      {direcciones.length === 0 ? ( // Verifica si la lista de direcciones está vacía
        <Text style={styles.noDireccionesText}>No hay direcciones disponibles.</Text>
      ) : (
        <FlatList
          data={direcciones}
          keyExtractor={(item) => item.calle} // Usa un campo único como clave
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.text}>Calle: {item.calle}</Text>
              <Text style={styles.text}>Altura: {item.altura}</Text>
              <Text style={styles.text}>Número de Depto: {item.nroDepto}</Text>
              <Text style={styles.text}>Piso: {item.piso}</Text>
              <Text style={styles.text}>Barrio: {item.barrio}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
  },
  noDireccionesText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
  },
});

export default PruebaSolicitud;

