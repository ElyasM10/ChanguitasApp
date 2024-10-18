/*
import React, { useRef, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, User } from "firebase/auth";
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './estilos/PantallaChat.css'; 

// Configuracion de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBkjrjqvbkn0pPSdvLyKz79uwU5OOPJMJ0",
  authDomain: "changuitasapp.firebaseapp.com",
  projectId: "changuitasapp",
  storageBucket: "changuitasapp.appspot.com",
  messagingSenderId: "698330432372",
  appId: "1:698330432372:web:b22fa08ea2012b8b3ca221",
  measurementId: "G-GJ6QDYW5N8"
};

const app = initializeApp(firebaseConfig);

// Inicializa la autenticación con AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const firestore = getFirestore(app); //Obtiene la instacia de firestore

// Componente principal de la pantalla de chat
function PantallaChat() {
  const [user] = useAuthState(auth);// Obtiene el usuario autenticado

  return (
    <div className="PantallaChat">
      <header>
        <h1>Sala de Chat</h1>
        <CerrarSesion />
      </header>
      <section>
        {user ? <SalaChat /> : <IniciarSesion />}
      </section>
    </div>
  );
}

// Componente para iniciar sesión con google
function IniciarSesion() {
  const iniciarSesionGoogle = () => {
    const provider = new GoogleAuthProvider();// Crea un proveedor de autenticacion de Google
    signInWithPopup(auth, provider);// Inicia sesion con popup
  };

  return (
    <>
      <button className="iniciar-sesion" onClick={iniciarSesionGoogle}>Inicia con Google</button>
      <p>¡Respeta las normas del chat!</p>
    </>
  );
}

// Componente para cerrar sesion
function CerrarSesion() {
  return auth.currentUser && (// Verifica si hay un usuario autenticado
    <button className="cerrar-sesion" onClick={() => signOut(auth)}>Cerrar Sesión</button>
  );
}

// Componente para la sala de chat
function SalaChat() {
  const dummy = useRef<HTMLSpanElement>(null);// Referencia para el scroll al final de la conversacion
  const mensajesRef = collection(firestore, 'mensajes');// Referencia a la coleccion de mensajes en Firestore
  const q = query(mensajesRef, orderBy('creadoEn'), limit(25));  // Consulta para obtener mensajes ordenados por fecha
  const [mensajes] = useCollectionData(q); // Obtiene los mensajes usando el hook
  const [valorFormulario, setValorFormulario] = useState('');// Estado para el valor del formulario de mensaje

  // Función para enviar un mensaje
  const enviarMensaje = async (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    const { uid, photoURL } = auth.currentUser as User;// Obtiene UID y foto del usuario actual
    await addDoc(mensajesRef, {
      texto: valorFormulario,
      creadoEn: serverTimestamp(),  // Marca la hora de creación del mensaje
      uid,
      photoURL
    });

    setValorFormulario(''); // Limpia el formulario
    dummy.current?.scrollIntoView({ behavior: 'smooth' });// Desplaza la vista al último mensaje
  };

  return (
    <>
      <main>
        {mensajes && mensajes.map((msg: any) => <MensajeChat key={msg.id} mensaje={msg} />)}
        <span ref={dummy}></span>
      </main>
      <form onSubmit={enviarMensaje}>
        <input value={valorFormulario} onChange={(e) => setValorFormulario(e.target.value)} placeholder="Escribe algo bonito..." />
        <button type="submit" disabled={!valorFormulario}>Enviar </button>
      </form>
    </>
  );
}

// Componente para mostrar un mensaje
function MensajeChat(props: { mensaje: any }) {
  const { texto, uid, photoURL } = props.mensaje;// Desestructura los props del mensaje
  const claseMensaje = uid === auth.currentUser?.uid ? 'enviado' : 'recibido'; 

  return (
    <div className={`mensaje ${claseMensaje}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/avatar.png'} alt="Avatar" />
      <p>{texto}</p>
    </div>
  );
}

export default PantallaChat;
*/