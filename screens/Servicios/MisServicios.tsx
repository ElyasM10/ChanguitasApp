import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const MisServicios = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={estilos.contenedor}>
      {/* Header con Perfil*/}
      <View style={estilos.header}>
        <Text style={estilos.textoEncabezado}>Perfil</Text>
      </View>

     {/* Barra de pestañas */}
     <View style={estilos.barraPestanas}>
        <TouchableOpacity style={estilos.pestanaInactiva} onPress={() => navigation.navigate('PantallaPerfilEditarUsuario')}>
          <Text style={estilos.textoPestanaInactiva}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.pestanaInactiva} onPress={() => navigation.navigate('EditarDatosPersonales')}>
          <Text style={estilos.textoPestanaInactiva}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.pestanaActiva} onPress={() => navigation.navigate('MisServicios')}>
          <Text style={estilos.textoPestanaActiva}>Mis servicios</Text>
        </TouchableOpacity>
      </View>

        {/* Botón Agregar Servicio */}
        <TouchableOpacity 
          style={estilos.botonAgregarServicio} 
          onPress={() => navigation.navigate('AgregarServicio1')}
        >
          <Ionicons name="add" size={20} color="#197278" />
          <Text style={estilos.textoBoton}>Agregar servicio</Text>
        </TouchableOpacity>

      {/* Barra de navegación inferior */}
      <View style={estilos.barraNavegacion}>
        <TouchableOpacity onPress={() => navigation.navigate('PantallaHome')} style={estilos.iconoNavegacion}>
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
    marginTop:35,
  },
  header: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: 'white',
  },
  textoEncabezado: {
    fontSize: 24,
    fontWeight: '600',
    marginRight:300,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  barraPestanas: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
  },
  pestanaActiva: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#197278',
  },
  pestanaInactiva: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textoPestanaActiva: {
    fontSize: 16,
    color: '#197278',
  },
  textoPestanaInactiva: {
    fontSize: 16,
    color: '#666',
  },
  opcion: {
    fontSize: 16,
    color: 'gray',
  },
  opcionSeleccionada: {
    color: '#197278',
    fontWeight: '600',
  },
  seccionFoto: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imagenUsuario: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
  },
  cambiarFotoTexto: {
    color: '#197278',
    marginTop: 10,
  },
  formulario: {
    paddingHorizontal: 20,
    marginTop: -20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
  },
  barraNavegacion: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 95,
  },
  iconoNavegacion: {
    alignItems: 'center',
  },
  textoNavegacion: {
    fontSize: 12,
    color: 'gray',
  },
  botonGuardarCambios: {
    backgroundColor: '#197278',
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: 'center',
    width: '80%',  
    alignSelf: 'center',
    marginTop:-130, 
  },
  textoBotonGuardar: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonAgregarServicio: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
    marginTop: 20, 
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#197278',
    borderRadius: 50,
  },
  textoBoton: {
    color: '#197278',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
});

export default MisServicios;