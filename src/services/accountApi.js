import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import showErrorMessage from "../utils/messages/errorMessages";

export async function deleteAccount() {


    //await refreshTokenAccount();

    const token = await AsyncStorage.getItem('token');
    if (!token) {
        throw new Error('No token found. Please log in again.');
    }

    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('tokenDecoded');

    try {
        const response = await fetch( process.env.API_URL+"/mobile/auth/closeaccount", {
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


export async function refreshTokenAccount() {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
        throw new Error('No token found. Please log in again.');
    }

    console.log("Token recibido y entro aquí: ", token);

    try {
        const response = await fetch(process.env.API_URL + "/mobile/auth/refresh", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refreshToken: token
            })
        });

        // Leer la respuesta como texto
        const responseBody = await response.text();
        console.log("Respuesta cruda de la API (refresh):", responseBody);
        console.log("Estatus de la respuesta:", response.status);

        /*if (response.ok && response.status === 200) {
            // Si el token es válido y no ha expirado, no es necesario hacer nada más
            console.log("Token refrescado con éxito.");
            return responseBody;
        }*/

        // Si el status es 401 (token expirado), buscar el nuevo token en las cookies
        if (response.ok || response.status === 401 || response.status === 200) {
            // Verificar si hay cookies en la respuesta
            const cookies = response.headers.get('set-cookie');
            if (!cookies) {
                throw new Error('No token received in cookies');
            }

            // Encontrar la cookie jwtToken y extraer su valor
            const tokenCookie = cookies.split(';').find(cookie => cookie.startsWith('jwtToken='));
            if (!tokenCookie) {
                throw new Error('No jwtToken cookie found');
            }

            const newToken = tokenCookie.split('=')[1];
            console.log("Nuevo token recibido: ", newToken);

            // Remover el token antiguo y guardar el nuevo en AsyncStorage
            await AsyncStorage.removeItem('token');
            await AsyncStorage.setItem('token', newToken);
            return newToken; // Puedes devolver el nuevo token si lo necesitas en otras partes del código
        }

        // Si la respuesta no fue exitosa, lanzar un error
        throw new Error('Error al refrescar el token');

    } catch (error) {
        console.error("Error al refrescar el token:", error);
        throw error; // Propagar el error para manejo posterior
    }
}
