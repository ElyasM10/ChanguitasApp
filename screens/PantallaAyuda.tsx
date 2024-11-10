import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from '../AppNavigator';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const PantallaAyuda = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={estilos.contenedor}>
    <ScrollView>
      {/* Encabezado */}
      <View style={estilos.encabezado}>
        <Text style={estilos.textoInicio}>Ayuda</Text>
        <TouchableOpacity>
          <Text onPress={() => navigation.goBack()} style={estilos.menuPuntos}>X</Text>
        </TouchableOpacity>
      </View>

      {/* Datos Personales */}
      <Text style={estilos.tituloAyuda}>MANUAL DE USUARIO</Text>
      <View style={estilos.datosPreguntas}>
        <Text style={estilos.tituloPregunta}>¿Cómo buscar un servicio?</Text>
        <Text style={estilos.infoPregunta}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a maximus nulla, nec dignissim quam. Curabitur quis ex in diam lobortis consequat ut a enim. Praesent rhoncus magna nisi, a condimentum erat ornare vel. Duis nec pretium nisi. Vestibulum ac congue leo. Curabitur metus erat, posuere quis lacus rhoncus, molestie volutpat est. Praesent suscipit justo a eros porta auctor.</Text>
        <Text style={estilos.tituloPregunta}>¿Cómo ofrecer un servicio?</Text>
        <Text style={estilos.infoPregunta}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a maximus nulla, nec dignissim quam. Curabitur quis ex in diam lobortis consequat ut a enim. Praesent rhoncus magna nisi, a condimentum erat ornare vel. Duis nec pretium nisi. Vestibulum ac congue leo. Curabitur metus erat, posuere quis lacus rhoncus, molestie volutpat est. Praesent suscipit justo a eros porta auctor.</Text>
      </View>
      <Text style={estilos.tituloAyuda}>PREGUNTAS FRECUENTES</Text>
      <View style={estilos.datosPreguntas}>
        <Text style={estilos.tituloPregunta}>¿Es segura la aplicación?</Text>
        <Text style={estilos.infoPregunta}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a maximus nulla, nec dignissim quam. Curabitur quis ex in diam lobortis consequat ut a enim. Praesent rhoncus magna nisi, a condimentum erat ornare vel. Duis nec pretium nisi. Vestibulum ac congue leo. Curabitur metus erat, posuere quis lacus rhoncus, molestie volutpat est. Praesent suscipit justo a eros porta auctor.</Text>
        <Text style={estilos.tituloPregunta}>¿Puedo hablar con la otra persona antes de contratarlo?</Text>
        <Text style={estilos.infoPregunta}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a maximus nulla, nec dignissim quam. Curabitur quis ex in diam lobortis consequat ut a enim. Praesent rhoncus magna nisi, a condimentum erat ornare vel. Duis nec pretium nisi. Vestibulum ac congue leo. Curabitur metus erat, posuere quis lacus rhoncus, molestie volutpat est. Praesent suscipit justo a eros porta auctor.</Text>
        <Text style={estilos.tituloPregunta}>¿Cómo funciona el sistema de pago?</Text>
        <Text style={estilos.infoPregunta}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a maximus nulla, nec dignissim quam. Curabitur quis ex in diam lobortis consequat ut a enim. Praesent rhoncus magna nisi, a condimentum erat ornare vel. Duis nec pretium nisi. Vestibulum ac congue leo. Curabitur metus erat, posuere quis lacus rhoncus, molestie volutpat est. Praesent suscipit justo a eros porta auctor.</Text>
        <Text style={estilos.tituloPregunta}>¿Puedo contactarme con los desarrolladores?</Text>
        <Text style={estilos.infoPregunta}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a maximus nulla, nec dignissim quam. Curabitur quis ex in diam lobortis consequat ut a enim. Praesent rhoncus magna nisi, a condimentum erat ornare vel. Duis nec pretium nisi. Vestibulum ac congue leo. Curabitur metus erat, posuere quis lacus rhoncus, molestie volutpat est. Praesent suscipit justo a eros porta auctor.</Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: 'white',
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: 'white',
    marginTop: 50,
  },
  textoInicio: {
    fontSize: 24,
    fontWeight: '600',
  },
  menuPuntos: {
    fontSize: 24,
    fontWeight: '600',
  },
  tituloAyuda: {
    fontSize: 18,
    color: '#197278',
    textAlign: 'center',
    marginVertical: 10,
  },
  datosPreguntas: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tituloPregunta: {
    fontSize: 16,
    color: '#197278',
    marginBottom: 5,
  },
  infoPregunta: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});

export default PantallaAyuda;