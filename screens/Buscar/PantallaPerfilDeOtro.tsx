import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const PantallaPerfilDeOtro = () => {
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
        <TouchableOpacity onPress={() => navigation.navigate('ResultadosBusqueda')}>
            <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={estilos.textoEncabezado}>Perfil de {userData.nombre}</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Información del Usuario */}
      <View style={estilos.seccionUsuario}>
        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={estilos.imagenUsuario} />
        <Text style={estilos.nombreCompleto}>Full name</Text>
        <Text style={estilos.rolUsuario}>User role</Text>
      </View>

      {/* Botones */}
      <View style={estilos.buttonContainer}>
            <TouchableOpacity style={estilos.nextButton} onPress={() => navigation.navigate('DetalleTarea')}>
            <Text style={estilos.nextButtonText}>Iniciar changuita</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.prevButton} >
            <Text style={estilos.prevButtonText}>Chatear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.prevButton} onPress={() => navigation.navigate('ResultadosBusqueda')}>
            <Text style={estilos.prevButtonText}>Bloquear</Text>
          </TouchableOpacity>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  prevButton: {
    borderWidth: 1,
    borderColor: '#197278',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  prevButtonText: {
    color: '#197278',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#197278',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    marginTop: 155
  },
  iconoNavegacion: {
    alignItems: 'center',
  },
  textoNavegacion: {
    fontSize: 12,
    color: 'gray',
  },
});

export default PantallaPerfilDeOtro;

