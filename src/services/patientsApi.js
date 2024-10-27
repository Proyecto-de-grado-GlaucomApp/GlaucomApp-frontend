import axios from 'axios';
import showErrorMessage from "../utils/messages/errorMessages";
import AsyncStorage from "@react-native-async-storage/async-storage";


export async function getPatients(startIndex = 0, endIndex = 15) {
    try {
        const apiUrl = process.env.EXPO +`/mobile/clinical_history/get/pacients?startIndex=${startIndex}&endIndex=${endIndex}`;
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

export async function deletePatient(patientId) {
    try {
        const apiUrl = process.env.EXPO +`/mobile/clinical_history/delete/pacient/${patientId}`;
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

