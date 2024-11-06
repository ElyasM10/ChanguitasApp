
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
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, ActivityIndicator, FlatList } from 'react-native';

// URL de la API
const API_URL = 'http://127.0.0.1:8000'; // Web
//const API_URL ='http://10.0.2.2:8000/'; //Android (todavia no funciona)

// Interfaz para el tipo de datos del usuario
interface Usuario {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  documento: number;
  telefono: number;
  fotoPerfil: null;
  fechaNacimiento: string;
  direccion: {
    calle: string;
    altura: number;
    piso: number;
    nroDepto: number;
    barrio: string;
  };
}

const PruebaUsuario: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<any>(null);

  useEffect(() => {
    inputRef.current?.focus();
    fetchUsuarios(); // Llamar a la función para obtener los usuarios cuando el componente se monte
  }, []);

  // Función para obtener los usuarios desde la API
  const fetchUsuarios = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/usuarios/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setUsuarios(data); // Guardar los usuarios obtenidos en el estado
    } catch (error: any) {
      const errorMessage = error.message || 'Error desconocido';
      console.error('Error detallado:', error);
      setError(errorMessage);
      Alert.alert('Error', `No se pudo obtener los usuarios: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Función para crear un nuevo usuario
  const createUser = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    const hardcodedUser: Usuario = {
      username: 'Billy16',
      first_name: 'BILLY',
      last_name: 'Mandy',
      email: 'billy15@gmail.com',
      documento: 12335,
      telefono: 290196882,
      fotoPerfil: null, 
      fechaNacimiento: '2002-11-15',
      direccion: {
        calle: 'Deloqui',
        altura: 2,
        piso: 2,
        nroDepto: 2,
        barrio: 'Deloqui',
      },
    };

    try {
      const response = await fetch(`${API_URL}/usuarios/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          
        },
        body: JSON.stringify(hardcodedUser),
      });
      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

     
      Alert.alert('Éxito', 'Usuario creado exitosamente');
      setUsuarios(prevUsuarios => [...prevUsuarios, data]);
    } catch (error: any) {
      const errorMessage = error.message || 'Error desconocido';
      console.error('Error detallado:', error);
      setError(errorMessage);
      Alert.alert('Error', `No se pudo crear el usuario: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Usuario</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Button title={loading ? 'Creando...' : 'Crear Usuario'} onPress={createUser} disabled={loading} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

      {usuarios.length === 0 ? (
        <Text style={styles.noDireccionesText}>No hay usuarios creados aún.</Text>
      ) : (
        <FlatList
          data={usuarios}
          renderItem={({ item }: { item: Usuario }) => (
            <View style={styles.item}>
              <Text style={styles.text}>Usuario: {item.username}</Text>
              <Text style={styles.text}>Nombre: {item.first_name}</Text>
              <Text style={styles.text}>Apellido: {item.last_name}</Text>
              <Text style={styles.text}>Correo: {item.email}</Text>
              <Text style={styles.text}>Documento: {item.documento}</Text>
              <Text style={styles.text}>Teléfono: {item.telefono}</Text>
              <Text style={styles.text}>Dirección: {item.direccion.calle} {item.direccion.altura}, {item.direccion.barrio}</Text>
            </View>
          )}
          keyExtractor={(item: Usuario) => item.username}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noDireccionesText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  loader: {
    marginTop: 20,
  },
});

export default PruebaUsuario;
