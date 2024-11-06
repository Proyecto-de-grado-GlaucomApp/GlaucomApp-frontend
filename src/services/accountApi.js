import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import showErrorMessage from "../utils/messages/errorMessages";

export async function deleteAccount() {

    const token = await AsyncStorage.getItem('token');
    if (!token) {
        throw new Error('No token found. Please log in again.');
    }

    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('tokenDecoded');

    try {
        const response = await fetch("http:///192.168.1.3:8000/mobile/auth/closeaccount", {
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
            throw new Error('Error al eliminar la cuenta');
        }

        // Devolver la respuesta cruda
        return responseBody; // Puedes modificar esto si decides cambiar la respuesta del servidor
    } catch (error) {
        console.error("Error en eliminar la cuenta:", error);
        throw error; // Propagar el error para manejo posterior
    }
}

