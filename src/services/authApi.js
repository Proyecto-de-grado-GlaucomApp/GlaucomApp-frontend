import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showErrorMessage from "../utils/messages/errorMessages";
import {jwtDecode} from "jwt-decode";

const apiUrlLogin = "http://172.16.1.153:8000/mobile/auth/login";
const apiUrlRegister = "http://172.16.1.153:8000/mobile/auth/register";

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

    logOut: async () => {

        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('No token found. Please log in again.');
        }

        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('tokenDecoded');

        try {
            const response = await fetch("http://172.16.1.153:8000/mobile/auth/logout", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            // Leer la respuesta como texto
            const responseBody = await response.text();
            console.log("Respuesta cruda de la API:", responseBody);


            // Verificar si la respuesta fue exitosa
            if (!response.ok) {
                throw new Error('Error al Cerrar Sesion');
            }

            // Devolver la respuesta cruda
            return responseBody; // Puedes modificar esto si decides cambiar la respuesta del servidor
        } catch (error) {
            console.error("Error al Cerrar Sesion:", error);
            throw error; // Propagar el error para manejo posterior
        }
    }

};

export default authApi;
