import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const PantallaVerificacion4 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <View style={estilos.contenedor}>
        {/* Título de la pantalla */}
        <Text style={estilos.titulo}>Verificación</Text>

        {/* Paso de verificación */}
        <Text style={estilos.subtitulo}>PASO 4</Text>
        <Text style={estilos.instruccion}>Ingrese su direccion en la ciudad de Ushuaia:</Text>

        {/* Campo de entrada */}
        <TextInput
          placeholder=" "
          style={estilos.entrada}
          keyboardType="phone-pad"
        />

        {/* Botón de siguiente */}
        <TouchableOpacity 
          style={estilos.botonSiguiente} 
          onPress={() => navigation.navigate('PantallaVerificacion5')}
        >
          <Text style={estilos.textoBoton}>Siguiente</Text>
          <Ionicons name="arrow-forward" size={20} color="#197278" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contenedor: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 18,
    color: '#197278',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  instruccion: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  entrada: {
    borderWidth: 1,
    borderColor: '#197278',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    marginBottom: 30,
    color: '#000',
  },
  botonSiguiente: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#197278',
    borderRadius: 25,
  },
  textoBoton: {
    color: '#197278',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 5,
  },
});

export default PantallaVerificacion4;