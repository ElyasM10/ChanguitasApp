
import { createStackNavigator } from '@react-navigation/stack';
import PantallaBienvenida from './screens/PantallaBienvenida';
import PantallaInicioSesion from './screens/PantallaInicioSesion';
import PantallaRegistro from './screens/PantallaRegistro';
import PantallaVerificacion5 from './screens/Verificacion/PantallaVerificacion5';
import PantallaVerificacion4 from './screens/Verificacion/PantallaVerificacion4';
import PantallaVerificacion3 from './screens/Verificacion/PantallaVerificacion3';
import PantallaVerificacion2 from './screens/Verificacion/PantallaVerificacion2';
import PantallaVerificacion1 from './screens/Verificacion/PantallaVerificacion1';
import PantallaHome from './screens/Home/PantallaHome';
import PruebaSolicitud from './screens/pruebaSolicitud';
import PantallaHomeAdmin from './screens/Admin/PantallaHomeAdmin';
import PantallaEditarUsuario from './screens/Admin/PantallaEditarUsuario';
import PantallaEditarDatosUsuario from './screens/Admin/PantallaEditarDatosUsuario'
import PantallaPerfilEditarUsuario from './screens/Usuario/PantallaPerfilEditarUsuario';
import EditarDatosPersonales from './screens/Usuario/EditarDatosPersonales';
//import pruebaUsuario from './screens/pruebaUsuario';
import AgregarServicio1 from './screens/Servicios/AgregarServicio1';
import AgregarServicio2 from './screens/Servicios/AgregarServicio2';
import AgregarServicio3 from './screens/Servicios/AgregarServicio3';
import MisServicios from './screens/Servicios/MisServicios';
import BuscarServicio1 from './screens/Buscar/BuscarServicio1';
import BuscarServicio2 from './screens/Buscar/BuscarServicio2';
import ResultadosBusqueda from './screens/Buscar/ResultadosBusqueda';
import PantallaPerfilDeOtro from './screens/Buscar/PantallaPerfilDeOtro';
import Historial1 from './screens/Historial/Historial1';
import Historial2 from './screens/Historial/Historial2';
import DetalleTarea from './screens/Historial/DetalleTarea';
import CalificarTarea from './screens/Historial/CalificarTarea';
import PantallaAyuda from './screens/PantallaAyuda';
import CrearCategoria from './screens/Admin/CrearCategoria';
import EditarCategoria from './screens/Admin/EditarCategoria';
import EditarDatosCategoria from './screens/Admin/EditarDatosCategoria';
import SeleccionImagenes from './screens/SeleccionImagenes';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './screens/Autenticacion/auth';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
//import PantallaChat from './screens/chat/PantallaChat';

//Aca se definen las pantallas que tendra la aplicacion serian como las urls en Django
export type RootStackParamList = {
  PantallaBienvenida: undefined;
  PantallaInicioSesion: undefined;
  PantallaRegistro: undefined;
  PruebaSolicitud: undefined;
  PantallaChat: undefined;
  PantallaVerificacion1: undefined;
  PantallaVerificacion2: undefined;
  PantallaVerificacion3: undefined;
  PantallaVerificacion4: undefined;
  PantallaVerificacion5: undefined;
  PantallaHome:undefined;
  PantallaHomeAdmin:undefined;
  PantallaEditarUsuario:undefined;
  PantallaEditarDatosUsuario:undefined;
  PantallaPerfilEditarUsuario: undefined;
  EditarDatosPersonales: undefined;
  //pruebaUsuario: undefined;
  AgregarServicio1: undefined;
  //AgregarServicio2: undefined;
  AgregarServicio2: { selectedServices: string[] }; // Define que AgregarServicio2 espera un parametro
  AgregarServicio3: { datosSeleccionados: any };
  MisServicios: undefined;
  BuscarServicio1: undefined;
  BuscarServicio2: { selectedService: string[] };
  ResultadosBusqueda: { 
    proveedores: any[]; 
    error?: string; // Para el mensaje de error
  };
  PantallaPerfilDeOtro: { id: any[] };
  Historial1: undefined;
  Historial2: undefined;
  DetalleTarea: undefined;
  CalificarTarea: undefined;
  PantallaAyuda: undefined;
  CrearCategoria: undefined;
  EditarCategoria: undefined;
  EditarDatosCategoria: undefined;
  SeleccionImagenes: undefined;
};

// Crea una instancia(como una lista) del stack navigator con el tipo RootStackParamList(rutas a navegar)
const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [state] = useContext(AuthContext);

  const authenticated = state.token !== "";
  const PERSISTENCE_KEY = "NAVIGATION_STATE";

  const [initialState, setInitialState] = useState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedState = await AsyncStorage.getItem(PERSISTENCE_KEY);
        if (savedState) {
          setInitialState(JSON.parse(savedState));
        }
      } catch (error) {
        console.error("Error al restaurar el estado de navegación:", error);
      } finally {
        setIsReady(true);
      }
    };

    restoreState();
  }, []);

  if (!isReady) {
    // Puede ser una pantalla de carga tambien
    return null;
  }

  return (
    <NavigationContainer
    initialState={initialState}
    onStateChange={async (state) => {
      try {
        const stateString = JSON.stringify(state);
        await AsyncStorage.setItem(PERSISTENCE_KEY, stateString);
      } catch (error) {
        console.error("Error al guardar el estado de navegación:", error);
      }
    }}
  >


    <Stack.Navigator
    initialRouteName={authenticated ? "PantallaHome" : "PantallaInicioSesion"}
    screenOptions={{
      cardStyle: { flex: 1 }, // Para que el scroll funcione en web
    }}
  > 
      {authenticated ? (
        <>
          <Stack.Screen 
            name="PantallaHome" 
            component={PantallaHome} 
            options={{ headerShown: false }}  
          />
          <Stack.Screen
            name="PantallaBienvenida"
            component={PantallaBienvenida}
             options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="PantallaHomeAdmin" 
            component={PantallaHomeAdmin} 
            options={{ headerShown: false }}  
          />
      
          <Stack.Screen 
            name="PantallaPerfilEditarUsuario" 
            component={PantallaPerfilEditarUsuario} 
            options={{ headerShown: false }}  
          />
      <Stack.Screen 
        name="PruebaSolicitud" 
        component={PruebaSolicitud} 
        options={{ headerShown: false }}  
      /> 
        <Stack.Screen 
        name="PantallaVerificacion1" 
        component={PantallaVerificacion1} 
        options={{ headerShown: false }}  
      /> 
        <Stack.Screen 
        name="PantallaVerificacion2" 
        component={PantallaVerificacion2} 
        options={{ headerShown: false }}  
      /> 
      <Stack.Screen 
        name="PantallaVerificacion3" 
        component={PantallaVerificacion3} 
        options={{ headerShown: false }}  
      /> 
      <Stack.Screen 
        name="PantallaVerificacion4" 
        component={PantallaVerificacion4} 
        options={{ headerShown: false }}  
      /> 
       <Stack.Screen 
        name="PantallaVerificacion5" 
        component={PantallaVerificacion5} 
        options={{ headerShown: false }}  
      /> 
        <Stack.Screen 
        name="PantallaEditarUsuario" 
        component={PantallaEditarUsuario} 
        options={{ headerShown: false }}  
      /> 
        <Stack.Screen 
        name="EditarDatosPersonales" 
        component={EditarDatosPersonales} 
        options={{ headerShown: false }}  
      /> 
        <Stack.Screen 
        name="AgregarServicio1" 
        component={AgregarServicio1} 
        options={{ headerShown: false }}  
      /> 
        <Stack.Screen 
        name="AgregarServicio2" 
        component={AgregarServicio2} 
        options={{ headerShown: false }}  
      /> 
      <Stack.Screen 
        name="AgregarServicio3" 
        component={AgregarServicio3} 
        options={{ headerShown: false }}  
      /> 
      <Stack.Screen 
        name="MisServicios" 
        component={MisServicios} 
        options={{ headerShown: false }}  
      /> 
      <Stack.Screen 
        name="BuscarServicio1" 
        component={BuscarServicio1} 
        options={{ headerShown: false }}  
      /> 
      <Stack.Screen 
        name="BuscarServicio2" 
        component={BuscarServicio2} 
        options={{ headerShown: false }}  
      /> 
      <Stack.Screen 
        name="ResultadosBusqueda" 
        component={ResultadosBusqueda} 
        options={{ headerShown: false }}  
      /> 
      <Stack.Screen 
        name="PantallaPerfilDeOtro" 
        component={PantallaPerfilDeOtro} 
        options={{ headerShown: false }}  
      /> 
      <Stack.Screen 
        name="Historial1" 
        component={Historial1} 
        options={{ headerShown: false }}  
      /> 
      <Stack.Screen 
        name="Historial2" 
        component={Historial2} 
        options={{ headerShown: false }}  
      /> 
      <Stack.Screen 
        name="DetalleTarea" 
        component={DetalleTarea} 
        options={{ headerShown: false }}  
      /> 
      <Stack.Screen 
        name="CalificarTarea" 
        component={CalificarTarea} 
        options={{ headerShown: false }}  
      /> 
      <Stack.Screen 
        name="PantallaAyuda" 
        component={PantallaAyuda} 
        options={{ headerShown: false }}  
      /> 
      <Stack.Screen 
        name="CrearCategoria" 
        component={CrearCategoria} 
        options={{ headerShown: false }}  
      /> 
      <Stack.Screen 
        name="EditarCategoria" 
        component={EditarCategoria} 
        options={{ headerShown: false }}  
      /> 
      <Stack.Screen 
        name="EditarDatosCategoria" 
        component={EditarDatosCategoria} 
        options={{ headerShown: false }}  
      /> 
        </>
      ) : (
        <>
         <Stack.Screen 
            name="PantallaInicioSesion" 
            component={PantallaInicioSesion} 
            options={{ headerShown: false }}  
          />
          <Stack.Screen 
          name="PantallaRegistro" 
          component={PantallaRegistro} 
          options={{ headerShown: false }}  
        />
          <Stack.Screen 
            name="PantallaHome" 
            component={PantallaHome} 
            options={{ headerShown: false }}  
          />
          <Stack.Screen
            name="PantallaBienvenida"
            component={PantallaBienvenida}
             options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
    </NavigationContainer>

  );
};
/*
El código implementa la persistencia del estado de navegación usando AsyncStorage. 
Cuando la aplicación inicia, intenta restaurar el estado guardado (pantalla actual y navegación) desde el almacenamiento local. 
Mientras se carga este estado, muestra una pantalla en blanco o de carga. Una vez restaurado, la navegación comienza desde donde el usuario estaba antes de recargar. 
Además, cada vez que el usuario navega a otra pantalla, el nuevo estado se guarda automáticamente en AsyncStorage, 
asegurando que al recargar la aplicación, el usuario vuelva a la última pantalla visitada en lugar de la inicial.

*/