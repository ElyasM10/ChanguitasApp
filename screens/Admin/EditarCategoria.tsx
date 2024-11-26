import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
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
        <View style={estilos.recuadroAzul}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={estilos.botonAtras}>
            <Ionicons name="arrow-back-outline" size={24} color="white" />
          </TouchableOpacity>
          <Text style={estilos.textoEncabezado}>Editar categoría</Text>
        </View>
      </View>

      {/* Lista de categorías */}
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
