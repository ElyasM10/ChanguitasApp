import {SafeAreaView, StyleSheet,Text,TextInput,TouchableOpacity,View} from "react-native";
import React from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Font from "../constants/Fonts";
import Colors from "../constants/Colors";
import { TypeFormatFlags } from "typescript";
import { Ionicons } from "@expo/vector-icons";//es una libreria que trae iconos npm install @expo/vector-icons
import { RootStackParamList } from '../AppNavigator';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const PantallaRegistro= () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  return(
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Registrarse</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={Colors.darkText}
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor={Colors.darkText}
          style={styles.input}
          secureTextEntry={true}
        />
           <TextInput
          placeholder="Confirmar Contraseña"
          placeholderTextColor={Colors.darkText}
          style={styles.input}
          secureTextEntry={true} 
        />

      </View>

     <View>
       <Text
        style={{
          fontFamily:Font["poppins-semiBold"],
          fontSize: FontSize.small,
          color: "#ffffff",
          alignSelf:"flex-end",
        }}
        >
          Ya tengo una cuenta
        </Text>
     </View>

      <TouchableOpacity
    style={{
      padding: Spacing * 2,
      backgroundColor: '#ffffff',
      marginVertical: Spacing * 3,
      borderRadius: Spacing,
      shadowColor: Colors.primary,
      shadowOffset: {
        width: 0,
        height: Spacing,
      },
      shadowOpacity: 0.3,
      shadowRadius: Spacing,
    }}
    onPress={() => navigation.navigate('PantallaChat')}
  >
    <Text
      style={{
        fontFamily: Font["poppins-bold"],
        color: "#f46524",
        textAlign: "center",
        fontSize: FontSize.large,
      }}
    >
      Registrarse
    </Text>
  </TouchableOpacity>
 
      <TouchableOpacity
     style={{
      padding: Spacing,
     }}
     >
       <Text style={{
        fontFamily:Font["poppins-semibold"],
        color: '#ffffff',
        textAlign:"center",
        fontSize:FontSize.small,

       }}
       >
         Crear una Cuenta
       </Text>
      </TouchableOpacity> 

      <View style={{
        marginVertical:Spacing*3,
      }}
      >
      <Text style={{
        fontFamily:Font["poppins-semibold"],
        color: '#ffffff',
        textAlign:"center",
        fontSize:FontSize.small,

       }}
       >
         o continua con
       </Text>

         <View style={{
            marginTop:Spacing,
            flexDirection:"row",
            justifyContent:"center",
         }}>
           <TouchableOpacity style={{
              padding:Spacing,
              backgroundColor:'#ffffff',
              borderRadius: Spacing/2,
              marginHorizontal:Spacing,
           }} 
           >
            <Ionicons name="logo-google" color={Colors.text} size={Spacing*2}/>
           </TouchableOpacity>

           <TouchableOpacity style={{
              padding:Spacing,
              backgroundColor:'#ffffff',
              borderRadius: Spacing/2,
              marginHorizontal:Spacing,
           }} 
           >
            <Ionicons name="logo-apple" color={Colors.text} size={Spacing*2}/>
           </TouchableOpacity>

           <TouchableOpacity style={{
              padding:Spacing,
              backgroundColor:'#ffffff',
              borderRadius: Spacing/2,
              marginHorizontal:Spacing,
           }} 
           >
            <Ionicons name="logo-facebook" color={Colors.text} size={Spacing*2}/>
           </TouchableOpacity>
            
         </View>
      </View>
    </View>
  </SafeAreaView>
  );
};



const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#f46524",
    },
    container: {
      padding: Spacing * 2,
    },
    header: {
      alignItems: "center",
    },
    title: {
      fontSize: FontSize.xLarge,
      color: "#ffffff", 
      fontFamily: Font["poppins-bold"],
      marginVertical: Spacing * 3,
    },
    inputContainer: {
      marginVertical: Spacing * 3,
    },
    input: {
      fontFamily: Font["poppins-regular"],
      fontSize: FontSize.small,
      padding: Spacing * 2,
      backgroundColor: Colors.lightPrimary,
      borderRadius: Spacing,
      marginVertical: Spacing,
    },
  });
  

export default PantallaRegistro;

