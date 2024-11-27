import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch,Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation,useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator';

const AgregarServicio2 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'AgregarServicio2'>>();
  const [descripcion, setDescripcion] = useState('');
  const [diasSeleccionados, setDiasSeleccionados] = useState({
    Lunes: false,
    Martes: false,
    Miércoles: false,
    Jueves: false,
    Viernes: false,
    Sábado: false,
    Domingo: false,
  });
  const [horasSeleccionadas, setHorasSeleccionadas] = useState({
    Lunes: { inicio: '', fin: '' },
    Martes: { inicio: '', fin: '' },
    Miércoles: { inicio: '', fin: '' },
    Jueves: { inicio: '', fin: '' },
    Viernes: { inicio: '', fin: '' },
    Sábado: { inicio: '', fin: '' },
    Domingo: { inicio: '', fin: '' },
  });

  // Mostrar los datos pasados desde la pantalla anterior (AgregarServicio1)
  useEffect(() => {
    console.log('Componente AgregarServicio2 montado');
    if (route.params?.selectedServices) {
      console.log('Servicios seleccionados:', route.params.selectedServices);
    } else {
      console.log('No se encontraron servicios seleccionados.');
    }
  }, [route.params]);

  // Cambiar el estado de un día
  const cambiarDia = (dia: string) => {
    setDiasSeleccionados(prev => ({ ...prev, [dia]: !prev[dia] }));
  };

  // Cambiar la hora de inicio o fin de un día
  const manejarCambioHora = (dia: string, tipoHora: 'inicio' | 'fin', valor: string) => {
    setHorasSeleccionadas(prev => ({
      ...prev,
      [dia]: { ...prev[dia], [tipoHora]: valor },
    }));
  };

  //"Guardo" los datos obtenidos y se los paso a AgregarServicio3
   const manejarGuardar = () => {
    // Filtra los días seleccionados
    const diasSeleccionadosFiltrados = Object.keys(diasSeleccionados)
      .filter(dia => diasSeleccionados[dia]) // Filtra solo los días con valor true
      .reduce((acc, dia) => {
        acc[dia] = horasSeleccionadas[dia]; // Incluye solo las horas para los días seleccionados
        return acc;
      }, {});
  
    const datosSeleccionados = {
      descripcion,
      dias: diasSeleccionadosFiltrados, // Solo los días seleccionados
      horas: diasSeleccionadosFiltrados,  // Solo las horas de los días seleccionados
    };
  
    console.log('Datos a guardar:', datosSeleccionados);
  
    // Navegar a AgregarServicio3 y pasar los datos filtrados
    navigation.navigate('AgregarServicio3', { datosSeleccionados });
  };
  
  return (
    <View style={estilos.contenedorPrincipal}>
      <View style={estilos.contenedorEncabezado}>
        <Text style={estilos.encabezado}>Agregar un servicio (2/3)</Text>
      </View>
      <ScrollView contentContainerStyle={estilos.contenedorDesplazable}>
        <Text style={estilos.etiqueta}>Descripción del Servicio:</Text>
        <TextInput
          style={estilos.campoDescripcion}
          placeholder="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
        />

        <View style={estilos.encabezadoDias}>
          <Text style={estilos.etiquetaDia}>Día</Text>
          <Text style={estilos.etiquetaHora}>Hora</Text>
        </View>

        {Object.keys(diasSeleccionados).map((dia) => (
          <View style={estilos.filaDia} key={dia}>
            <Switch
              value={diasSeleccionados[dia]}
              onValueChange={() => cambiarDia(dia)}
            />
            <Text style={estilos.textoDia}>{dia}</Text>
            <TextInput
              style={estilos.campoHora}
              placeholder="Inicio"
              value={horasSeleccionadas[dia].inicio}
              onChangeText={(valor) => manejarCambioHora(dia, 'inicio', valor)}
              editable={diasSeleccionados[dia]}
            />
            <Text style={estilos.textoSeparador}>a</Text>
            <TextInput
              style={estilos.campoHora}
              placeholder="Fin"
              value={horasSeleccionadas[dia].fin}
              onChangeText={(valor) => manejarCambioHora(dia, 'fin', valor)}
              editable={diasSeleccionados[dia]}
            />
          </View>
        ))}

        <View style={estilos.contenedorBotones}>
          <TouchableOpacity style={estilos.botonSiguiente} onPress={manejarGuardar}>
            <Text style={estilos.textoBotonSiguiente}>Siguiente</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botonAtras} onPress={() => navigation.navigate('AgregarServicio1')}>
            <Text style={estilos.textoBotonAtras}>Atrás</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
    </View>
  );
};
const estilos = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 40,
  },
  contenedorEncabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#197278', // Color de fondo de la barra
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  encabezado: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Color de texto blanco
  },
  contenedorDesplazable: {
    paddingHorizontal: 20,
    paddingBottom: 80,
    marginTop: 20,
  },
  etiqueta: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  campoDescripcion: {
    borderWidth: 1,
    borderColor: '#197278',
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  encabezadoDias: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  etiquetaDia: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '600',
  },
  etiquetaHora: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '600',
  },
  filaDia: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  textoDia: {
    fontSize: 16,
    color: 'black',
    marginLeft: 8,
    flex: 1,
  },
  campoHora: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    width: 60,
    textAlign: 'center',
    marginHorizontal: 5,
    padding: 5,
  },
  textoSeparador: {
    fontSize: 16,
    color: 'black',
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  botonAtras: {
    borderWidth: 1,
    borderColor: '#197278',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  textoBotonAtras: {
    color: '#197278',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonSiguiente: {
    backgroundColor: '#197278',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  textoBotonSiguiente: {
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
});

export default AgregarServicio2;
