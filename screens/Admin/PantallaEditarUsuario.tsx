import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const PantallaEditarUsuario = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Datos de ejemplo para la lista de usuarios
  const usuarios = [
    { id: '1', nombre: 'Rodrigo Rodriguez' },
    { id: '2', nombre: 'Domingo Dominguez' },
    { id: '3', nombre: 'Gonzalo Gonzalez' },
    { id: '4', nombre: 'Martina Martinez' },
    { id: '5', nombre: 'Alvaro Alvarez' },
    { id: '6', nombre: 'Juan Juarez' },
  ];

  const handleUserPress = (userId) => {
    console.log(`Editar usuario con ID: ${userId}`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={estilos.usuarioFila} onPress={() => navigation.navigate('PantallaEditarDatosUsuario')}>
      <View style={estilos.usuarioInfo}>
        <Image source={{ uri: 'https://via.placeholder.com/40' }} style={estilos.imagenUsuario} />
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
          <Text style={estilos.textoEncabezado}>Editar usuario</Text>
        </View>
      </View>
      
      {/* Lista de Usuarios */}
      <FlatList
        data={usuarios}
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
    backgroundColor: '#197278', // Cambiar el fondo aquí si necesario
    width: '100%',
    paddingTop: 15, // Para dar espacio en la parte superior (SafeArea)
    paddingBottom: 15, // Espaciado debajo
  },
  recuadroAzul: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
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
export default PantallaEditarUsuario;
