import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity,Alert, FlatList,Image  } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';
import API_URL from '../API_URL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {cerrarSesion} from '../Autenticacion/authService';
import { AuthContext } from '../Autenticacion/auth';


const UsuariosBloqueados = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  
  const [loading, setLoading] = useState<boolean>(true);
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [state,setState] = useContext(AuthContext);
  const [usuariosBloqueados, setUsuariosBloqueados] = useState([]);

  
  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };

  useEffect(() => {
    const usuarioEjemplo = [
      { 
        id: 1, 
        nombre: 'Juan Pérez', 
        foto: 'https://randomuser.me/api/portraits/men/1.jpg' 
      }
    ];
    
    setUsuariosBloqueados(usuarioEjemplo);
    setLoading(false);
  }, []);
 
  const logout = async () => {
    try {
    

      await cerrarSesion(); // Simula el proceso de cierre de sesión
      setState({ token: "" });
      console.log('Sesión cerrada correctamente'); // Log al finalizar el cierre de sesión
    } catch (error) {
    
      console.log('Error en el cierre de sesión:', error.message); // Log en caso de error
      Alert.alert("Error", error.message);
    } finally {

      // Navegar a la pantalla de bienvenida
      navigation.navigate("PantallaBienvenida");
    

      // Esperar y luego redirigir a la pantalla de inicio de sesión
      setTimeout(() => {
       
        console.log('Redirigiendo a la pantalla de inicio de sesión'); 
        navigation.reset({
          index: 0,
          routes: [{ name: "PantallaInicioSesion" }],
        });
      }, 10); 
    }

  };


  const obtenerUsuariosBloqueados = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
  
      if (!accessToken) {
        throw new Error('Token de acceso no encontrado');
      }
  
      const response = await fetch(`${API_URL}/usuarios/bloqueados/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error al obtener los usuarios bloqueados: ${response.status}`);
      }
  
      const data = await response.json();
      setUsuariosBloqueados(data.usuarios_bloqueados); // Asumiendo que el backend devuelve { "usuarios_bloqueados": [...] }
    } catch (error) {
      console.error('Error al cargar los usuarios bloqueados:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    obtenerUsuariosBloqueados();
  }, []);
 
  return (
    <SafeAreaView style={estilos.contenedor}>
      {/* Header con Perfil*/}
      <View style={estilos.header}>
        <Text style={estilos.textoEncabezado}>Perfil</Text>
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

     {/* Barra de pestañas */}
     <View style={estilos.barraPestanas}>
  <TouchableOpacity 
    style={estilos.pestanaInactiva} 
    onPress={() => navigation.navigate('PantallaPerfilEditarUsuario')}>
    <Text style={estilos.textoPestanaInactiva}>Perfil</Text>
  </TouchableOpacity>
  <TouchableOpacity 
    style={estilos.pestanaInactiva} 
    onPress={() => navigation.navigate('EditarDatosPersonales')}>
    <Text style={estilos.textoPestanaInactiva}>Editar</Text>
  </TouchableOpacity>
  <TouchableOpacity 
    style={estilos.pestanaInactiva} 
    onPress={() => navigation.navigate('MisServicios')}>
    <Text style={estilos.textoPestanaInactiva}>Mis servicios</Text>
  </TouchableOpacity>
  <TouchableOpacity 
    style={estilos.pestanaActiva} 
    onPress={() => navigation.navigate('UsuariosBloqueados')}>
    <Text style={estilos.textoPestanaActiva}>Bloqueados</Text>
  </TouchableOpacity>
</View>


{loading ? (
  <Text style={estilos.cargando}>Cargando usuarios bloqueados...</Text>
) : usuariosBloqueados.length === 0 ? (
  <Text style={estilos.sinServicios}>Aún no tienes usuarios bloqueados.</Text>
) : (

<FlatList
  data={usuariosBloqueados}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={estilos.usuarioBloqueado}>
      <Image 
        source={{ uri: item.foto || 'https://via.placeholder.com/50' }} 
        style={estilos.image} 
      />
      <Text>{item.nombre}</Text>
      <TouchableOpacity>
        <Text>Desbloquear</Text>
      </TouchableOpacity>
    </View>
  )}
  contentContainerStyle={estilos.listaUsuarios}
/>
)}

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
    marginTop: 43,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    marginTop: 5,
  },
  textoEncabezado: {
    fontSize: 24,
    fontWeight: '600',
    marginRight: 300,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
  opcion: {
    fontSize: 16,
    color: 'gray',
  },
  opcionSeleccionada: {
    color: '#197278',
    fontWeight: '600',
  },
  cargando: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 20,
    color: '#197278',
  },
  sinServicios: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginVertical: 20,
  },
  listaUsuarios: {
    paddingHorizontal: 15,
    paddingBottom: 80, 
  },
  usuarioBloqueado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  botonDesbloquear: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: 'bold',
  },
  seccionFoto: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imagenUsuario: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
  },
  cambiarFotoTexto: {
    color: '#197278',
    marginTop: 10,
  },
  formulario: {
    paddingHorizontal: 20,
    marginTop: -20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
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
  botonGuardarCambios: {
    backgroundColor: '#197278',
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginTop: -130,
  },
  textoBotonGuardar: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  opcionDesplegable: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textoDesplegable: {
    fontSize: 16,
    color: '#333333',
  },
  desplegable: {
    position: 'absolute',
    top: 70,
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
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
  },

});

export default UsuariosBloqueados;
