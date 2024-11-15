import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from '../AppNavigator';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import API_URL from './API_URL';
/*
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
*/
const PantallaRegistro = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [mostrarConfirmarContraseña, setMostrarConfirmarContraseña] = useState(false);
//  const API_URL = 'http://127.0.0.1:8000'; 

  // Estados para cada campo
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [calle, setCalle] = useState("");
  const [altura, setAltura] = useState("");
  const [piso, setPiso] = useState("");
  const [nroDepto, setNroDepto] = useState("");
  const [barrio, setBarrio] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  // Función para manejar el registro del usuario
  const handleRegistro = async () => {
    if (password !== confirmarPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    // Reformatea fecha de nacimiento a 'YYYY-MM-DD'
    const fechaNacimientoFormatoCorrecto = fechaNacimiento.split('/').reverse().join('-');

    const usuario = {
      username,
      first_name: firstName,
      last_name: lastName,
      email,
      documento: parseInt(documento, 10),
      telefono: parseInt(telefono, 10),
      fotoPerfil: null,
      fechaNacimiento: fechaNacimientoFormatoCorrecto,
      password,
      password2: password, // Usa el mismo valor de `password` para `password2`
      direccion: {
        calle,
        altura: parseInt(altura, 10),
        piso: parseInt(piso, 10),
        nroDepto: parseInt(nroDepto, 10) || null,
        barrio,
      },
    };

    try {
      const response = await fetch(`${API_URL}/usuarios/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      Alert.alert('Éxito', 'Usuario creado exitosamente');
      navigation.goBack();
    } catch (error: any) {
      const errorMessage = error.message || 'Error desconocido';
      console.error('Error detallado:', error);
      Alert.alert('Error', `No se pudo crear el usuario: ${errorMessage}`);
    }
  };

  return (
    <LinearGradient colors={['#B7B7B7', '#B7B7B7']} style={estilos.degradado}>
      <SafeAreaView style={estilos.areaSegura}>
        <ScrollView>
          <View style={estilos.contenedor}>
            <View style={estilos.encabezado}>
              <TouchableOpacity style={estilos.botonAtras} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={estilos.titulo}>Crear perfil</Text>
            </View>
            <View style={estilos.formulario}>
              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Nombre de usuario</Text>
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Nombre</Text>
                <TextInput
                  placeholder="Nombre"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Apellido</Text>
                <TextInput
                  placeholder="Apellido"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Fecha de nacimiento</Text>
                <TextInput
                  placeholder="aaaa-mm-dd"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                  value={fechaNacimiento}
                  onChangeText={setFechaNacimiento}
                />
              </View>
              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>DNI</Text>
                <TextInput
                  placeholder="12345678"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                  value={documento}
                  onChangeText={setDocumento}
                  keyboardType="numeric"
                />
              </View>
              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Teléfono</Text>
                <TextInput
                  placeholder="02901-12345678"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                  value={telefono}
                  onChangeText={setTelefono}
                  keyboardType="phone-pad"
                />
              </View>
              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Calle</Text>
                <TextInput
                  placeholder="San Martín"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                  value={calle}
                  onChangeText={setCalle}
                />
              </View>
              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Altura</Text>
                <TextInput
                  placeholder="456"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                  value={altura}
                  onChangeText={setAltura}
                  keyboardType="numeric"
                />
              </View>
              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Piso (opcional)</Text>
                <TextInput
                  placeholder="1"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                  value={piso}
                  onChangeText={setPiso}
                  keyboardType="numeric"
                />
              </View>
              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Nro. dpto. (opcional)</Text>
                <TextInput
                  placeholder="A"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                  value={nroDepto}
                  onChangeText={setNroDepto}
                />
              </View>
              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Barrio</Text>
                <TextInput
                  placeholder="Centro"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                  value={barrio}
                  onChangeText={setBarrio}
                />
              </View>
              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Correo electrónico</Text>
                <TextInput
                  placeholder="changuitas@app.com"
                  placeholderTextColor="#666"
                  style={estilos.entradaTexto}
                  value={email}
                  onChangeText={setEmail}
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
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => setMostrarContraseña(!mostrarContraseña)}>
                    <Ionicons name={mostrarContraseña ? "eye-outline" : "eye-off-outline"} size={24} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={estilos.campo}>
                <Text style={estilos.etiqueta}>Confirmar contraseña</Text>
                <View style={estilos.contenedorContraseña}>
                  <TextInput
                    placeholder="************"
                    placeholderTextColor="#666"
                    style={estilos.entradaContraseña}
                    secureTextEntry={!mostrarConfirmarContraseña}
                    value={confirmarPassword}
                    onChangeText={setConfirmarPassword}
                  />
                  <TouchableOpacity onPress={() => setMostrarConfirmarContraseña(!mostrarConfirmarContraseña)}>
                    <Ionicons name={mostrarConfirmarContraseña ? "eye-outline" : "eye-off-outline"} size={24} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={handleRegistro}>
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
