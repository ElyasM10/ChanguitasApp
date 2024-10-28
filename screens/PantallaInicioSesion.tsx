import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { lazy, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';

const PantallaInicioSesion = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* boton volver */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Iniciar sesión</Text>
        </View>

        {/*  fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            placeholder="changuitas@app.com"
            placeholderTextColor="#666"
            style={styles.input}
          />

          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              placeholder="***************"
              placeholderTextColor="#666"
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons 
                name={showPassword ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ingresarbotton */}
        <TouchableOpacity onPress={() => navigation.navigate('PantallaBienvenida')}>
          <LinearGradient
            colors={['#197278', '#9BCDC8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Ingresar</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Footer texto */}
        <Text style={styles.footerText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#B7B7B7',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginLeft: 10,
    marginBottom: 80, 
    justifyContent: 'flex-end',
  
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  passwordInputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',   
    justifyContent: 'center', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  footerText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 20,
    paddingHorizontal: 40,
  },
});

export default PantallaInicioSesion;

