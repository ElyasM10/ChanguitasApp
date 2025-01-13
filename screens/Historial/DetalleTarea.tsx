import React, { useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image,Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';
import {cerrarSesion} from '../Autenticacion/authService';

const DetalleTarea = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);


  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };


  const logout = async () => {
    try {
      await cerrarSesion();
      navigation.navigate('PantallaBienvenida');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const serviceData = {
    servicio: 'Cortar el pasto',
    fecha: '--/--/---',
    puntaje: '--',
    estado: 'En proceso',
  };

  return (
    <SafeAreaView style={estilos.contenedor}>
      {/* Encabezado con opciones de menú */}
      <View style={estilos.encabezado}>
        <TouchableOpacity onPress={() => navigation.navigate('Historial1')}>
            <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={estilos.textoEncabezado}>Detalle de la tarea</Text>
        <TouchableOpacity onPress={toggleDesplegable}>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Menú Desplegable */}
      {mostrarDesplegable && (
        <View style={estilos.desplegable}>
          <TouchableOpacity onPress={logout} style={estilos.opcionDesplegable}>
            <Text style={estilos.textoDesplegable}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Información del Usuario */}
      <View style={estilos.seccionUsuario}>
        <Image source={{ uri: 'https://via.placeholder.com/80' }} style={estilos.imagenUsuario} />
        <Text style={estilos.nombreCompleto}>Full name</Text>
        <Text style={estilos.rolUsuario}>User role</Text>
      </View>

      {/* Datos Personales */}
      <Text style={estilos.tituloDatosPersonales}>DATOS DE LA TAREA</Text>
      <View style={estilos.datosPersonales}>
        <Text style={estilos.infoUsuario}>Servicio: {serviceData.servicio}</Text>
        <Text style={estilos.infoUsuario}>Fecha: {serviceData.fecha}</Text>
        <Text style={estilos.infoUsuario}>Puntaje: {serviceData.puntaje}</Text>
        <Text style={estilos.infoUsuario}>Estado: {serviceData.estado}</Text>
      </View>

      {/* Botones */}
      <View style={estilos.buttonContainer}>
            <TouchableOpacity style={estilos.nextButton} onPress={() => navigation.navigate('CalificarTarea')}>
            <Text style={estilos.nextButtonText}>Finalizar changuita</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.prevButton} onPress={() => navigation.navigate('Historial1')}>
            <Text style={estilos.prevButtonText}>Cancelar changuita</Text>
          </TouchableOpacity>
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
  desplegable: {
    position: 'absolute',
    top: 80,
    right: 20,
    width: 150,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    zIndex: 10,
  },
  opcionDesplegable: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textoDesplegable: {
    fontSize: 16,
    color: '#333333',
  },
});

export default DetalleTarea;
