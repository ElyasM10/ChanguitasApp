import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const EditarDatosCategoria = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [nombre, setNombre] = useState('');
  const [categoriaPadre, setCategoriaPadre] = useState('');

  return (
    <SafeAreaView style={estilos.contenedor}>
      {/* Encabezado con recuadro azul */}
      <View style={estilos.encabezado}>
        <View style={estilos.recuadroAzul}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={estilos.botonAtras}>
            <Ionicons name="arrow-back-outline" size={24} color="white" />
          </TouchableOpacity>
          <Text style={estilos.textoEncabezado}>Editar categoría</Text>
        </View>
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

        <Text style={estilos.label}>Categoría padre</Text>
        <TextInput
          style={estilos.input}
          placeholder="Categoría padre"
          value={categoriaPadre}
          onChangeText={setCategoriaPadre}
        />
      </View>

      {/* Botón Guardar Cambios */}
      <TouchableOpacity style={estilos.botonGuardar} onPress={() => navigation.navigate('EditarCategoria')}>
        <Text style={estilos.textoBotonGuardar}>Guardar cambios</Text>
      </TouchableOpacity>

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
    backgroundColor: '#197278',
    width: '100%',
    paddingTop: 15, // Espacio para la barra de estado
    paddingBottom: 15,
  },
  recuadroAzul: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  botonAtras: {
    marginRight: 10,
  },
  textoEncabezado: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  formulario: {
    marginBottom: 20,
    paddingHorizontal: 20,
    marginTop: 20,
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
    backgroundColor: '#197278',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 0,
    marginHorizontal: 20,
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

export default EditarDatosCategoria;
