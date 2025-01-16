import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { renovarToken } from './authService'; // Asumiendo que tienes la función que ya definiste
import API_URL from '../API_URL';
// Crear una instancia de axios
const api = axios.create({
  baseURL: `${API_URL}`,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor para solicitudes
api.interceptors.request.use(
  async (config) => {
    let accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No se encontró el token de acceso');
    }

    // Agregar el token de acceso a los encabezados de la solicitud
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    console.log('Agregando token a la solicitud:', accessToken);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para respuestas (para manejar la expiración del token)
api.interceptors.response.use(
  (response) => {
    console.log('Respuesta exitosa:', response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Si el error es por token expirado, intentar renovar el token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        console.log('Token expirado, intentando renovarlo...');
        originalRequest._retry = true;
      
      const nuevoToken = await renovarToken();
      if (nuevoToken) {
        // Actualizar el token en la solicitud original
        console.log('Token renovado:', nuevoToken);
        originalRequest.headers['Authorization'] = `Bearer ${nuevoToken}`;
        // Reintentar la solicitud original
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

