import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const PantallaHomeAdmin = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = (screen) => {
    if (screen === 'Buscar') {
      navigation.navigate('PantallaEditarUsuario');
    } else {
      console.log(`Navegar a ${screen}`);
    }
  };

  return (
    <SafeAreaView style={estilos.contenedor}>
      {/* Encabezado */}
      <View style={estilos.encabezado}>
        <Text style={estilos.textoInicio}>Inicio</Text>
        <TouchableOpacity>
          <Text style={estilos.menuPuntos}>...</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido Principal */}
      <View style={estilos.contenidoPrincipal}>
        <Text style={estilos.tituloApp}>Changuitas{'\n'}App</Text>

        {/* Opciones Administrativas */}
        <View style={estilos.contenedorOpcionesAdmin}>
            <TouchableOpacity onPress={() => navigation.navigate('PantallaEditarUsuario')} style={estilos.cajaOpcion}>
              <Text style={estilos.textoOpcion}>Editar usuarios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.cajaOpcion}>
              <Text style={estilos.textoOpcion}>Administrar reportes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CrearCategoria')} style={estilos.cajaOpcion}>
              <Text style={estilos.textoOpcion}>Crear categoría</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EditarCategoria')} style={estilos.cajaOpcion}>
              <Text style={estilos.textoOpcion}>Editar categoría</Text>
            </TouchableOpacity>
        </View>
      </View>

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
  textoInicio: {
    fontSize: 24,
    fontWeight: '600',
  },
  menuPuntos: {
    fontSize: 24,
    fontWeight: '600',
  },
  contenidoPrincipal: {
    flex: 1,
    backgroundColor: '#4EAAA5',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  tituloApp: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    lineHeight: 40,
  },
  contenedorOpcionesAdmin: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cajaOpcion: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  textoOpcion: {
    color: '#2A3A35',
    fontSize: 16,
    fontWeight: '500',
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

export default PantallaHomeAdmin;
