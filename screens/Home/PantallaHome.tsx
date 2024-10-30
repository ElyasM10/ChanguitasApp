import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const PantallaHome = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const caracteristicas = [
    '+30 servicios',
    'Chat integrado',
    'Ushuaia'
  ];

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
        
        <View style={estilos.contenedorCaracteristicas}>
          {caracteristicas.map((item, indice) => (
            <TouchableOpacity key={indice} style={estilos.cajaCaracteristica}>
              <Text style={estilos.textoCaracteristica}>• {item}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    backgroundColor: '#4EAAA5', // Color de fondo similar al de la imagen
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
  contenedorCaracteristicas: {
    gap: 10,
  },
  cajaCaracteristica: {
    backgroundColor: '#2A3A35', // Fondo oscuro para las características
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  textoCaracteristica: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default PantallaHome;
