import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const PruebaEmpleado = () => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
     //   const response = await  axios.get('http://localhost:8000'); 
     const response = await axios.get('http://10.0.2.2:8000/');
     
     setEmpleados(response.data);
      } catch (error) {
        console.error('Error al obtener empleados:', error);
      }
    };

    fetchEmpleados();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.employee}</Text>
      <Text style={styles.text}>{item.department}</Text>
    </View>
  );

  return (
    <FlatList
      data={empleados}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
  },
});

export default PruebaEmpleado;
