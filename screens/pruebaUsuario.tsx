
/*
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
*/
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';
import axios from 'axios';

const PruebaUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    documento: '',
    telefono: '',
    fotoPerfil: '',
    fechaNacimiento: '',
    direccion: {
      calle: '',
      altura: '',
      piso: '',
      nroDepto: '',
      barrio: '',
    },
  });

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const createUser = async () => {
    // Hardcodear los datos de un usuario predefinido
    const hardcodedUser = {
      username: 'usuarioHardcodeado',
      first_name: 'Nombre',
      last_name: 'Apellido',
      email: 'correo@ejemplo.com',
      documento: '12345678',
      telefono: '1234567890',
      fechaNacimiento: '2000-01-01',
      direccion: {
        calle: 'Calle Falsa',
        altura: '123',
        piso: '1',
        nroDepto: 'A',
        barrio: 'Centro',
      },
    };

    try {
      const response = await axios.post('http://10.0.2.2:8000/usuarios', hardcodedUser);

      Alert.alert('Usuario creado', 'El usuario ha sido creado exitosamente.');
      setUsuarios(prevUsuarios => [...prevUsuarios, response.data]);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      Alert.alert('Error', 'No se pudo crear el usuario.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Usuario</Text>
      <Button title="Crear Usuario" onPress={createUser} />
      
      {usuarios.length === 0 ? (
        <Text style={styles.noDireccionesText}>No hay usuarios creados aún.</Text>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff', marginTop: 30 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  noDireccionesText: { fontSize: 16, color: 'red' },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  text: { fontSize: 16 },
});

export default PruebaUsuario;
