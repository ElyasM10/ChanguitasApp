import { AuthProvider } from "./Autenticacion/auth";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "../AppNavigator"; // Asegúrate de importar AppNavigator correctamente.


export default function Main() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <AppNavigator />
            </AuthProvider>
        </NavigationContainer>
    );
}
