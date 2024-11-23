import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const EditarCategoria = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  
  const categorias = [
    { id: '1', nombre: 'Gasista' },
    { id: '2', nombre: 'Plomero' },
    { id: '3', nombre: 'Corte de pasto' },
    { id: '4', nombre: 'Limpieza de hogar' },
    { id: '5', nombre: 'Peluquería' },
    { id: '6', nombre: 'Paseo de animales' },
    { id: '7', nombre: 'Carpintero' },
  ];

  const handleUserPress = (userId) => {
    console.log(`Editar usuario con ID: ${userId}`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={estilos.usuarioFila} onPress={() => navigation.navigate('EditarDatosCategoria')}>
      <View style={estilos.usuarioInfo}>
        <Text style={estilos.nombreUsuario}>{item.nombre}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={20} color="gray" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={estilos.contenedor}>
      {/* Encabezado */}
      <View style={estilos.encabezado}>
        <Text style={estilos.textoEncabezado}>Editar categoría</Text>
        <TouchableOpacity>
          <Text style={estilos.menuPuntos}>...</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de categorias */}
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={estilos.listaUsuarios}
      />

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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: 'white',
    marginTop: 50,
  },
  textoEncabezado: {
    fontSize: 24,
    fontWeight: '600',
  },
  menuPuntos: {
    fontSize: 24,
    fontWeight: '600',
  },
  listaUsuarios: {
    paddingHorizontal: 20,
  },
  usuarioFila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  usuarioInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagenUsuario: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginRight: 15,
  },
  nombreUsuario: {
    fontSize: 16,
    color: '#333',
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

export default EditarCategoria;