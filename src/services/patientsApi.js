import axios from 'axios';

export async function getPatients() {
    try {
        const apiUrl = process.env.EXPO + '/patients';
        const response = await axios.get(apiUrl);
        console.log('Fetched Patients:', response.data);
        return response.data; // Retorna los datos directamente
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
}

export async function getPatientById(id) {
    try {
        const apiUrl = process.env.EXPO + '/patients/' + id;
        const response = await axios.get(apiUrl);
        return response.data; // Devuelve los datos directamente
    } catch (error) {
        console.error('Error fetching patient by id:', error);
        throw error;
    }
}
