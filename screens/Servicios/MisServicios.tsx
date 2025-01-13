import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity,Alert, FlatList } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';
import API_URL from '../API_URL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {cerrarSesion} from '../Autenticacion/authService';



const MisServicios = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  interface Servicio {
    id: number;
    nombreServicio: string;
    descripcion: string;
    dia: string;
    desdeHora: string;
    hastaHora: string;
  }

  const [services, setServices] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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

  const fetchUsuario = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!accessToken || !userId) {
        throw new Error('Token de acceso o ID de usuario no encontrado');
      }

      const response = await fetch(`${API_URL}/servicios/por-usuario/${userId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener servicios: ${response.status}`);
      }

      const data: Servicio[] = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error al cargar los servicios del usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuario();
  }, []);

  const renderServiceItem = ({ item }: { item: Servicio }) => (
    <View style={estilos.servicioCard}>
      <Text style={estilos.nombreServicio}>{item.nombreServicio}</Text>
      <Text style={estilos.descripcion}>{item.descripcion}</Text>
      <Text style={estilos.horario}>
        {item.dia}: {item.desdeHora} - {item.hastaHora}
      </Text>
    </View>
  );

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
        <TouchableOpacity style={estilos.pestanaInactiva} onPress={() => navigation.navigate('PantallaPerfilEditarUsuario')}>
          <Text style={estilos.textoPestanaInactiva}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.pestanaInactiva} onPress={() => navigation.navigate('EditarDatosPersonales')}>
          <Text style={estilos.textoPestanaInactiva}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.pestanaActiva} onPress={() => navigation.navigate('MisServicios')}>
          <Text style={estilos.textoPestanaActiva}>Mis servicios</Text>
        </TouchableOpacity>
      </View>

        {/* Botón Agregar Servicio */}
        <TouchableOpacity 
          style={estilos.botonAgregarServicio} 
          onPress={() => navigation.navigate('AgregarServicio1')}
        >
          <Ionicons name="add" size={20} color="#197278" />
          <Text style={estilos.textoBoton}>Agregar servicio</Text>
        </TouchableOpacity>

         {/* Muestra la lista de Servicios y en caso de que aun no tenga ninguno muestra un mensaje */}
         {loading ? (
          <Text style={estilos.cargando}>Cargando servicios...</Text>
        ) : services.length === 0 ? (
          <Text style={estilos.sinServicios}>Aún no tienes servicios vinculados.</Text>
        ) : (
          <FlatList
            data={services}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderServiceItem}
            contentContainerStyle={estilos.listaServicios}
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
    marginTop:43,
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
    marginRight:300,
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
    marginTop:-130, 
  },
  textoBotonGuardar: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonAgregarServicio: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
    marginTop: 20, 
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#197278',
    borderRadius: 50,
  },
  textoBoton: {
    color: '#197278',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  cargando: { 
    textAlign: 'center', 
    marginTop: 20, 
    color: 'gray' 
  },
  listaServicios: { paddingHorizontal: 16 },
  servicioCard: { padding: 16, marginBottom: 8, backgroundColor: '#fff', borderRadius: 8, elevation: 2 },
  nombreServicio: { fontSize: 16, fontWeight: 'bold' },
  descripcion: { fontSize: 14, color: 'gray' },
  horario: { fontSize: 12, color: '#197278' },
  sinServicios: { textAlign: 'center', marginTop: 20, color: 'gray', fontSize: 16 },
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
  opcionDesplegable: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textoDesplegable: {
    fontSize: 16,
    color: '#333333',
  },
});

export default MisServicios;