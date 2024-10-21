import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrlLogin = "http://192.168.1.3:8000/mobile/auth/login";
const apiUrlRegister = "http://192.168.1.3:8000/mobile/auth/register"; // URL para el registro

const authApi = {
    login: async (username, password) => {
        try {
            console.log("apiUrlLogin: ", apiUrlLogin);
            const response = await axios.post(apiUrlLogin, { username, password }, { withCredentials: true });

            // Imprimir toda la respuesta para depuración
            console.log("Respuesta del servidor (login): ", response);

            // Verificar si hay cookies en la respuesta
            const tokenCookie = response.headers['set-cookie']?.find(cookie => cookie.startsWith('jwtToken='));
            if (!tokenCookie) {
                throw new Error('No token found in response');
            }

            // Extraer el token de la cookie
            const token = tokenCookie.split(';')[0].split('=')[1];
            console.log("Token recibido (login): ", token);

            // Guardar el token JWT en AsyncStorage
            await AsyncStorage.setItem('token', token);

            return response.data; // Devuelve los datos recibidos
        } catch (error) {
            // Imprimir el error completo para más detalles
            console.error('Error en login: ', error);
            throw new Error(error.response?.data || 'Login failed');
        }
    },

    AuthRegister: async (name, username, password) => {
        try {
            console.log("apiUrlRegister: ", apiUrlRegister);

            // Imprimir los datos que se enviarán al servidor
            console.log("Datos a enviar: ", { name, username, password });

            const response = await axios.post(apiUrlRegister, { name, username, password });

            // Imprimir toda la respuesta para depuración
            console.log("Respuesta del servidor (register): ", response);

            return response.data; // Devuelve los datos recibidos
        } catch (error) {
            // Imprimir el error completo para más detalles
            console.error('Error en registro: ', error);
            throw new Error(error.response?.data || 'Registration failed');
        }
    },

};

export default authApi;
