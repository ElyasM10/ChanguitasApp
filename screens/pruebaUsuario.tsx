import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const PruebaUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8000/usuario/');
        console.log(response.data); // Verifica la estructura de los datos
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando Usuarios...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios</Text>
      {usuarios.length === 0 ? (
        <Text style={styles.noDireccionesText}>No hay usuarios disponibles.</Text>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()} // Usa `id` o un campo único
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.text}>ID: {item.id}</Text>
              <Text style={styles.text}>Nombre de usuario: {item.username}</Text>
              <Text style={styles.text}>Nombre: {item.first_name}</Text>
              <Text style={styles.text}>Apellido: {item.last_name}</Text>
              <Text style={styles.text}>Correo: {item.email}</Text>
              <Text style={styles.text}>Documento: {item.documento}</Text>
              <Text style={styles.text}>
                Foto perfil: {item.fotoPerfil ? item.fotoPerfil : 'No disponible'}
              </Text>
              <Text style={styles.text}>Fecha de Nacimiento: {item.fechaNacimiento}</Text>
              <Text style={styles.text}>Teléfono: {item.telefono}</Text>
              
              {/* Información de la dirección */}
              <Text style={styles.text}>Dirección:</Text>
              <Text style={styles.text}>  Calle: {item.direccion?.calle}</Text>
              <Text style={styles.text}>  Altura: {item.direccion?.altura}</Text>
              <Text style={styles.text}>  Piso: {item.direccion?.piso}</Text>
              <Text style={styles.text}>  Número Depto: {item.direccion?.nroDepto}</Text>
              <Text style={styles.text}>  Barrio: {item.direccion?.barrio}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', marginTop: 30 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  loadingText: { fontSize: 18, color: 'gray' },
  noDireccionesText: { fontSize: 16, color: 'red' },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  text: { fontSize: 16 }
});

export default PruebaUsuario;
