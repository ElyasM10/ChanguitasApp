import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaBienvenida from './PantallaBienvenida';
import PantallaInicioSesion from './PantallaInicioSesion';
import PruebaEmpleado from './screens/pruebaEmpleado';
import PantallaChat from './screens/chat/PantallaChat';

// Se crea una instancia del navegador de pilas (stack navigator) de React Navigation para poder navegar entre las pantallas
const Stack = createStackNavigator();

// Este componente Navigator configura las pantallas y la navegación
const Navigator = () => {
  return (
    <Stack.Navigator initialRouteName="PantallaBienvenida">
      <Stack.Screen 
        name="PantallaBienvenida" 
        component={PantallaBienvenida} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="PantallaInicioSesion" 
        component={PantallaInicioSesion} 
        options={{ title: 'Iniciar Sesión' }} 
      />

    <Stack.Screen 
            name="PruebaEmpleado" 
            component={PruebaEmpleado} 
            options={{ title: 'Prueba de Empleados' }} 
          />

   
    <Stack.Screen 
            name="PantallaChat" 
            component={PantallaChat} 
            options={{ title: 'Prueba de Chat' }} 
          />



    </Stack.Navigator>
  );
};

export default Navigator;
