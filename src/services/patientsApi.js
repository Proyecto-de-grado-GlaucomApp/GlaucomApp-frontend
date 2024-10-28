import axios from 'axios';
import showErrorMessage from "../utils/messages/errorMessages";
import AsyncStorage from "@react-native-async-storage/async-storage";


export async function getPatients(startIndex = 0, endIndex = 15) {
    try {
        const apiUrl = `http://192.168.1.3:8000/mobile/clinical_history/get/pacients?startIndex=${startIndex}&endIndex=${endIndex}`;
        const token = await AsyncStorage.getItem('token');

        console.log('URL:', apiUrl);
        console.log('Token:', token);

        if (!token) {
            throw new Error('No token found. Please log in again.');
        }
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const response = await axios.get(apiUrl, { headers });
        console.log('Fetched Patients:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching patients:', error);
        showErrorMessage(error);
        throw error;
    }
}

export async function getPatientByCedula(cedula) {
    try {
        const apiUrl = `http://192.168.1.3:8000/mobile/clinical_history/get/pacient?cedula=${cedula}`;
        const token = await AsyncStorage.getItem('token');

        console.log('URL:', apiUrl);
        console.log('Token:', token);

        if (!token) {
            throw new Error('No token found. Please log in again.');
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const response = await axios.get(apiUrl, { headers });
        console.log('Fetched Patient by Cedula:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching patient by cedula:', error);
        if (error.response && error.response.status === 404) {
            return { status: 404 };
        }
        showErrorMessage(error);
        throw error;
    }
}



export async function deletePatient(patientId) {
    try {
        const apiUrl = `http://192.168.1.3:8000/mobile/clinical_history/delete/pacient/${patientId}`;
        const token = await AsyncStorage.getItem('token');

        console.log('URL:', apiUrl);
        console.log('Token:', token);

        if (!token) {
            throw new Error('No token found. Please log in again.');
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const response = await axios.delete(apiUrl, { headers });
        console.log('Deleted Patient:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting patient:', error);
        showErrorMessage(error);
        throw error;
    }
}


export const savePatient = async ({ name, cedula }) => {
    const pacienteData = {
        name,
        cedula
    };

    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('No token found. Please log in again.');
        }

        const response = await axios.post("http://192.168.1.3:8000/mobile/clinical_history/save/pacient", pacienteData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 201) {
            console.log("Paciente guardado:", response.data);
            return response.data; // Suponiendo que el servidor devuelve el paciente creado
        } else {
            throw new Error(`Error al guardar el paciente: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error en guardarPaciente:", error);

        // Imprimir información del error
        if (error.response) {
            console.error("Respuesta del servidor:", error.response.data);
            console.error("Código de estado:", error.response.status);
        } else {
            console.error("Error sin respuesta del servidor:", error.message);
        }

        showErrorMessage(error);
        throw error;
    }
};
