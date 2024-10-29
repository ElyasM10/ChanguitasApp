
import { createStackNavigator } from '@react-navigation/stack';
import PantallaBienvenida from './screens/PantallaBienvenida';
import PantallaInicioSesion from './screens/PantallaInicioSesion';
import PantallaRegistro from './screens/PantallaRegistro';
import PruebaEmpleado from './screens/pruebaEmpleado';
import PantallaVerificacion5 from './screens/Verificacion/PantallaVerificacion5';
import PantallaVerificacion4 from './screens/Verificacion/PantallaVerificacion4';
import PantallaVerificacion3 from './screens/Verificacion/PantallaVerificacion3';
import PantallaVerificacion2 from './screens/Verificacion/PantallaVerificacion2';
import PantallaVerificacion1 from './screens/Verificacion/PantallaVerificacion1';
//import PantallaChat from './screens/chat/PantallaChat';

//Aca se definen las pantallas que tendra la aplicacion serian como las urls en Django
export type RootStackParamList = {
  PantallaBienvenida: undefined;
  PantallaInicioSesion: undefined;
  PantallaRegistro: undefined;
  PruebaEmpleado: undefined;
  PantallaChat: undefined;
  PantallaVerificacion1: undefined;
  PantallaVerificacion2: undefined;
  PantallaVerificacion3: undefined;
  PantallaVerificacion4: undefined;
  PantallaVerificacion5: undefined;
};

// Crea una instancia(como una lista) del stack navigator con el tipo RootStackParamList
const Stack = createStackNavigator<RootStackParamList>();

//Componente AppNavigator que configura la navegación de la aplicación <Stack.Screen name="PantallaChat" component={PantallaChat} />
export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="PantallaBienvenida" 
        component={PantallaBienvenida} 
        options={{ headerShown: false }}  
      />
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
        name="PruebaEmpleado" 
        component={PruebaEmpleado} 
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






    </Stack.Navigator>
  );
}