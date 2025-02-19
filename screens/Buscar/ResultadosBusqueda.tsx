import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from "../API_URL"; 

const ResultadosBusqueda = () => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'ResultadosBusqueda'>>();
    const { proveedores, error } = route.params;

    console.log("Datos del arreglo de proveedores: ", proveedores);


    const obtenerFotoPerfil = (proveedor) => {
      console.log(proveedor.fotoPerfil); // Verificar qué valor tiene proveedor.fotoPerfil
      if (proveedor.fotoPerfil) {
        return `${API_URL}${proveedor.fotoPerfil}`;
      }
      return "https://via.placeholder.com/100";
    };
  

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Botón de regreso y título */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>Resultados</Text>
          </View>
  

  
         
        {/* Mostrar mensaje de error si existe */}
        {error ? (
           <View style={styles.errorContainer}>
           <Text style={styles.errorText}>{error}</Text>
         </View>
        ) : (
          /* Lista de resultados */
          proveedores.map((item, index) => (
            <View key={index} style={styles.resultItem}>
              <Image
                style={styles.image}
                source={{
                  uri: obtenerFotoPerfil(item),
                }}
              />
              <View style={styles.resultDetails}>
                <Text style={styles.name}>{item.nombre} {item.apellido}</Text>
                <Text style={styles.category}>{item.nombreServicio || "Categoría no especificada"}</Text>
                <View style={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons
                      key={i}
                      name="star"
                      size={16}
                      color={i < item.puntaje ? "black" : "#CCCCCC"}
                    />
                  ))}
                </View>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('PantallaPerfilDeOtro', { id: item.id })}
                style={styles.arrowButton}
              >
                <Ionicons name="chevron-forward" size={20} color="#333" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

        {/* Barra de navegación inferior */}
        <View style={styles.barraNavegacion}>
          <TouchableOpacity onPress={() => navigation.navigate('PantallaHome')} style={styles.iconoNavegacion}>
            <Ionicons name="home-outline" size={24} color="gray" />
            <Text style={styles.textoNavegacion}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('BuscarServicio1')} style={styles.iconoNavegacion}>
            <Ionicons name="search-outline" size={24} color="gray" />
            <Text style={styles.textoNavegacion}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Historial1')} style={styles.iconoNavegacion}>
            <Ionicons name="grid-outline" size={24} color="gray" />
            <Text style={styles.textoNavegacion}>Historial</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('PantallaPerfilEditarUsuario')} style={styles.iconoNavegacion}>
            <Ionicons name="person-outline" size={24} color="gray" />
            <Text style={styles.textoNavegacion}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5',
      },
      container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 70,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
      },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
  },
  resultDetails: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  category: {
    fontSize: 14,
    color: '#666',
  },
  rating: {
    flexDirection: 'row',
    marginTop: 5,
  },
  arrowButton: {
    paddingLeft: 10,
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
  errorContainer: {
    backgroundColor: '#F8D7DA',
    borderRadius: 10,
    padding: 10,
    marginTop:20,
  },
  errorText: {
    color: '#A94442',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ResultadosBusqueda;
