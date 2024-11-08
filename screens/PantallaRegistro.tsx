import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from '../AppNavigator';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const PantallaRegistro = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [mostrarConfirmarContraseña, setMostrarConfirmarContraseña] = useState(false);

  return (
    <LinearGradient
      colors={['#B7B7B7', '#B7B7B7']}
      style={estilos.degradado}
    >
      <SafeAreaView style={estilos.areaSegura}>
        <ScrollView>
          <View style={estilos.contenedor}>
            <View style={estilos.encabezado}>
              <TouchableOpacity 
                style={estilos.botonAtras} 
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={estilos.titulo}>Crear perfil</Text>
            </View>

            <View style={estilos.formulario}>
              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Nombre</Text>
                <TextInput
                  placeholder="Nombre"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                />
              </View>

              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Apellido</Text>
                <TextInput
                  placeholder="Apellido"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                />
              </View>

              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Fecha de nacimiento</Text>
                <TextInput
                  placeholder="dd/mm/aaaa"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                />
              </View>

              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>DNI</Text>
                <TextInput
                  placeholder="12.345.678"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                />
              </View>

              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Teléfono</Text>
                <TextInput
                  placeholder="02901-12345678"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                />
              </View>

              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Calle</Text>
                <TextInput
                  placeholder="San Martín"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                />
              </View>

              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Altura</Text>
                <TextInput
                  placeholder="456"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                />
              </View>

              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Piso (opcional)</Text>
                <TextInput
                  placeholder="1"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                />
              </View>

              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Nro. dpto. (opcional)</Text>
                <TextInput
                  placeholder="A"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                />
              </View>

              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Barrio</Text>
                <TextInput
                  placeholder="Centro"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                />
              </View>

              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Correo electrónico</Text>
                <TextInput
                  placeholder="changuitas@app.com"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Contraseña</Text>
                <View style={estilos.contenedorContraseña}>
                  <TextInput
                    placeholder="************"
                    placeholderTextColor="#666"
                    style={estilos.entradaContraseña}
                    secureTextEntry={!mostrarContraseña}
                  />
                  <TouchableOpacity onPress={() => setMostrarContraseña(!mostrarContraseña)}>
                    <Ionicons 
                      name={mostrarContraseña ? "eye-outline" : "eye-off-outline"}
                      size={24} 
                      color="#666" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Confirme contraseña</Text>
                <View style={estilos.contenedorContraseña}>
                  <TextInput
                    placeholder="************"
                    placeholderTextColor="#666"
                    style={estilos.entradaContraseña}
                    secureTextEntry={!mostrarConfirmarContraseña}
                  />
                  <TouchableOpacity onPress={() => setMostrarConfirmarContraseña(!mostrarConfirmarContraseña)}>
                    <Ionicons 
                      name={mostrarConfirmarContraseña ? "eye-outline" : "eye-off-outline"}
                      size={24} 
                      color="#666" 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('PantallaVerificacion1')}
            >
              <LinearGradient
                colors={['#197278', '#9BCDC8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={estilos.botonDegradado}
              >
                <Text style={estilos.textoBotonRegistro}>Registrarse</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const estilos = StyleSheet.create({
  degradado: {
    flex: 1,
  },
  areaSegura: {
    flex: 1,
  },
  contenedor: {
    flex: 1,
    paddingHorizontal: 20,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 8,
  },
  botonAtras: {
    marginRight: 10,
  },
  titulo: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
    justifyContent: 'flex-end',
  },
  formulario: {
    marginTop: 10,
  },
  campo: {
    marginBottom: 16,
  },
  etiqueta: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 16,
  },
  entradaTexto: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    color: '#000',
  },
  contenedorContraseña: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  entradaContraseña: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: '#000',
  },
  botonDegradado: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 60,
    alignItems: 'center',
  },
  textoBotonRegistro: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PantallaRegistro;
