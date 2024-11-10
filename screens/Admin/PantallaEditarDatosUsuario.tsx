import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const PantallaEditarDatosUsuario = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSaveChanges = () => {
    console.log('Guardar cambios');
  };

  return (
    <SafeAreaView style={estilos.contenedor}>
      {/* Encabezado */}
      <View style={estilos.encabezado}>
        <TouchableOpacity>
          <Text style={estilos.textoAccion}>Crear</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={estilos.textoAccion}>Eliminar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={estilos.scrollViewContent}>
        {/* Imagen del usuario */}
        <View style={estilos.contenedorImagen}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={estilos.imagenUsuario} />
          <TouchableOpacity>
            <Text style={estilos.cambiarFotoTexto}>Cambiar foto</Text>
          </TouchableOpacity>
        </View>

        {/* Formulario */}
        <View style={estilos.formulario}>
          <Text style={estilos.label}>Nombre</Text>
          <TextInput
            style={estilos.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={estilos.label}>Apellido</Text>
          <TextInput
            style={estilos.input}
            placeholder="Apellido"
            value={apellido}
            onChangeText={setApellido}
          />

          <Text style={estilos.label}>Fecha de nacimiento</Text>
          <TextInput
            style={estilos.input}
            placeholder="dd/mm/aaaa"
            value={fechaNacimiento}
            onChangeText={setFechaNacimiento}
          />

          <Text style={estilos.label}>Correo electrónico</Text>
          <TextInput
            style={estilos.input}
            placeholder="changuitas@app.com"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={estilos.label}>Teléfono</Text>
          <TextInput
            style={estilos.input}
            placeholder="Teléfono"
            value={telefono}
            onChangeText={setTelefono}
          />
        </View>

        {/* Botón Guardar Cambios */}
        <TouchableOpacity style={estilos.botonGuardar} onPress={() => navigation.navigate('PantallaEditarUsuario')}>
          <Text style={estilos.textoBotonGuardar}>Guardar cambios</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Barra de navegación inferior */}
      <View style={estilos.barraNavegacion}>
        <TouchableOpacity onPress={() => navigation.navigate('PantallaHomeAdmin')} style={estilos.iconoNavegacion}>
          <Ionicons name="home-outline" size={24} color="gray" />
          <Text style={estilos.textoNavegacion}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('BuscarServicio1')} style={estilos.iconoNavegacion}>
          <Ionicons name="search-outline" size={24} color="gray" />
          <Text style={estilos.textoNavegacion}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Historial1')} style={estilos.iconoNavegacion}>
          <Ionicons name="grid-outline" size={24} color="gray" />
          <Text style={estilos.textoNavegacion}>Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PantallaPerfilEditarUsuario')} style={estilos.iconoNavegacion}>
          <Ionicons name="person-outline" size={24} color="gray" />
          <Text style={estilos.textoNavegacion}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: 'white',
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  textoAccion: {
    fontSize: 16,
    color: '#007AFF',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  contenedorImagen: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imagenUsuario: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
  },
  cambiarFotoTexto: {
    color: '#007AFF',
    marginTop: 10,
  },
  formulario: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  botonGuardar: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotonGuardar: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  barraNavegacion: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  iconoNavegacion: {
    alignItems: 'center',
  },
  textoNavegacion: {
    fontSize: 12,
    color: 'gray',
  },
});

export default PantallaEditarDatosUsuario;
