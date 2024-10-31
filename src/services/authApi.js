import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showErrorMessage from "../utils/messages/errorMessages";
import {jwtDecode} from "jwt-decode";

const apiUrlLogin = "http://192.168.1.3:8000/mobile/auth/login";
const apiUrlRegister = "http://192.168.1.3:8000/mobile/auth/register";

const authApi = {
    login: async (username, password) => {
        try {
            console.log("apiUrlLogin: ", apiUrlLogin);
            const response = await axios.post(apiUrlLogin, { username, password }, { withCredentials: true });

            console.log("Respuesta del servidor (login): ", response);

            // Verificar si hay cookies en la respuesta
            const tokenCookie = response.headers['set-cookie']?.find(cookie => cookie.startsWith('jwtToken='));
            if (!tokenCookie) {
                throw new Error('No token found in response');
            }

            // Extraccion de la coocke
            const token = tokenCookie.split(';')[0].split('=')[1];
            console.log("Token recibido (login): ", token);

            await AsyncStorage.setItem('token', token);


            const nameDecoded = jwtDecode(token);
            console.log("Name Decoded: ", nameDecoded.name);
            await AsyncStorage.setItem('tokenDecoded', nameDecoded.name);




            return response.data;
        } catch (error) {
            console.error('Error en login: ', error);
            showErrorMessage(error);
            throw new Error(error.response?.data || 'Login failed');
        }
    },

    AuthRegister: async (name, username, password) => {
        try {
            console.log("apiUrlRegister: ", apiUrlRegister);

            console.log("Datos a enviar: ", { name, username, password });

            const response = await axios.post(apiUrlRegister, { name, username, password });

            console.log("Respuesta del servidor (register): ", response);

            return response.data;
        } catch (error) {
            console.error('Error en registro: ', error);
            showErrorMessage(error);
            throw new Error(error.response?.data || 'Registration failed');
        }
    },

};

export default authApi;
