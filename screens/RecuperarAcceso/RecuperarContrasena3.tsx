import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const RecuperarContrasena3 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <View style={estilos.contenedor}>
        {/* Título de la pantalla */}
        <Text style={estilos.titulo}>Recuperar contraseña</Text>

                <View style={estilos.contenedorEntrada}>
                <Text style={estilos.etiqueta}>Nueva contraseña</Text>
                  <View style={estilos.contenedorEntradaContrasena}>
                    <TextInput
                      placeholder="***************"
                      placeholderTextColor="#666"
                      secureTextEntry={!mostrarContrasena}
                      style={estilos.entradaContrasena}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity 
                      style={estilos.iconoOjo}
                      onPress={() => setMostrarContrasena(!mostrarContrasena)}
                    >
                      <Ionicons 
                        name={mostrarContrasena ? "eye-outline" : "eye-off-outline"} 
                        size={20} 
                        color="#666" 
                      />
                    </TouchableOpacity>
                  </View>
        
                  <Text style={estilos.etiqueta}>Confirmar contraseña</Text>
                  <View style={estilos.contenedorEntradaContrasena}>
                    <TextInput
                      placeholder="***************"
                      placeholderTextColor="#666"
                      secureTextEntry={!mostrarContrasena}
                      style={estilos.entradaContrasena}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity 
                      style={estilos.iconoOjo}
                      onPress={() => setMostrarContrasena(!mostrarContrasena)}
                    >
                      <Ionicons 
                        name={mostrarContrasena ? "eye-outline" : "eye-off-outline"} 
                        size={20} 
                        color="#666" 
                      />
                    </TouchableOpacity>
                  </View>
                </View>

        {/* Botón de siguiente */}
        <TouchableOpacity 
          style={estilos.botonSiguiente} 
          onPress={() => navigation.navigate('PantallaInicioSesion')}
        >
          <Text style={estilos.textoBoton}>Enviar</Text>
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
  contenedorEntrada: {
    marginBottom: 20,
  },
  etiqueta: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  entrada: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  contenedorEntradaContrasena: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  entradaContrasena: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    flex: 1,
    marginBottom: 16,
  },
  iconoOjo: {
    position: 'absolute',
    right: 15,
  },
  instruccion: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
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

export default RecuperarContrasena3;
