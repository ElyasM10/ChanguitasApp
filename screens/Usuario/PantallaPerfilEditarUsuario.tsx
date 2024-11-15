import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const PantallaPerfiEditarUsuario = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const userData = {
    nombre: 'Juan',
    apellido: 'Pérez',
    fechaNacimiento: '01/01/1990',
    correo: 'juan@perez.com',
    telefono: '02901-12345678',
    direccion: 'Calle Las Changas 456'
  };

  return (
    <SafeAreaView style={estilos.contenedor}>
      {/* Encabezado con opciones de menú */}
      <View style={estilos.encabezado}>
        <Text style={estilos.textoEncabezado}>Perfil</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

         {/* Barra de pestañas */}
         <View style={estilos.barraPestanas}>
        <TouchableOpacity style={estilos.pestanaActiva} onPress={() => navigation.navigate('PantallaBienvenida')}>
          <Text style={estilos.textoPestanaActiva}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.pestanaInactiva} onPress={() => navigation.navigate('EditarDatosPersonales')}>
          <Text style={estilos.textoPestanaInactiva}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.pestanaInactiva} onPress={() => navigation.navigate('MisServicios')}>
          <Text style={estilos.textoPestanaInactiva}>Mis servicios</Text>
        </TouchableOpacity>
      </View>

      {/* Información del Usuario */}
      <View style={estilos.seccionUsuario}>
        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={estilos.imagenUsuario} />
        <Text style={estilos.nombreCompleto}>Full name</Text>
        <Text style={estilos.rolUsuario}>User role</Text>
      </View>

      {/* Datos adicionales */}
      <View style={estilos.datosExtras}>
        <View style={estilos.datoItem}>
          <Text style={estilos.datoNumero}>1986</Text>
          <Text style={estilos.datoLabel}>Contrató</Text>
        </View>
        <View style={estilos.datoItem}>
          <Text style={estilos.datoNumero}>2728</Text>
          <Text style={estilos.datoLabel}>Trabajó</Text>
        </View>
        <View style={estilos.datoItem}>
          <Text style={estilos.datoNumero}>4.2</Text>
          <Text style={estilos.datoLabel}>Puntaje</Text>
        </View>
      </View>

      {/* Datos Personales */}
      <Text style={estilos.tituloDatosPersonales}>DATOS PERSONALES</Text>
      <View style={estilos.datosPersonales}>
        <Text style={estilos.infoUsuario}>Nombre: {userData.nombre}</Text>
        <Text style={estilos.infoUsuario}>Apellido: {userData.apellido}</Text>
        <Text style={estilos.infoUsuario}>Fecha de Nacimiento: {userData.fechaNacimiento}</Text>
        <Text style={estilos.infoUsuario}>Correo Electronico: {userData.correo}</Text>
        <Text style={estilos.infoUsuario}>Telefono: {userData.telefono}</Text>
        <Text style={estilos.infoUsuario}>Direccion: {userData.direccion}</Text>
      </View>

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
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    marginTop: 50,
  },
  textoEncabezado: {
    fontSize: 24,
    fontWeight: '600',
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
  seccionUsuario: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imagenUsuario: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  nombreCompleto: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  rolUsuario: {
    fontSize: 16,
    color: '#666',
  },
  datosExtras: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  datoItem: {
    alignItems: 'center',
  },
  datoNumero: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  datoLabel: {
    fontSize: 14,
    color: '#666',
  },
  tituloDatosPersonales: {
    fontSize: 18,
    color: '#197278',
    textAlign: 'center',
    marginVertical: 10,
  },
  datosPersonales: {
    paddingHorizontal: 20,
  },
  infoUsuario: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  barraNavegacion: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 225
  },
  iconoNavegacion: {
    alignItems: 'center',
  },
  textoNavegacion: {
    fontSize: 12,
    color: 'gray',
  },
});

export default PantallaPerfiEditarUsuario;

