
import { createStackNavigator } from '@react-navigation/stack';
import PantallaBienvenida from './screens/PantallaBienvenida';
import PantallaInicioSesion from './screens/PantallaInicioSesion';
import PantallaRegistro from './screens/PantallaRegistro';
import PruebaEmpleado from './screens/pruebaEmpleado';
//import PantallaChat from './screens/chat/PantallaChat';

//Aca se definen las pantallas que tendra la aplicacion serian como las urls en Django
export type RootStackParamList = {
  PantallaBienvenida: undefined;
  PantallaInicioSesion: undefined;
  PantallaRegistro: undefined;
  PruebaEmpleado: undefined;
  PantallaChat: undefined;
};

// Crea una instancia(como una lista) del stack navigator con el tipo RootStackParamList
const Stack = createStackNavigator<RootStackParamList>();

//Componente AppNavigator que configura la navegación de la aplicación <Stack.Screen name="PantallaChat" component={PantallaChat} />
export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PantallaBienvenida" component={PantallaBienvenida} />
      <Stack.Screen name="PantallaInicioSesion" component={PantallaInicioSesion} />
      <Stack.Screen name="PantallaRegistro" component={PantallaRegistro} />
      <Stack.Screen name="PruebaEmpleado" component={PruebaEmpleado} /> 
    </Stack.Navigator>
  );
}
