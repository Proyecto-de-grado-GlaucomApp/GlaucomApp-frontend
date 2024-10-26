import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import showErrorMessage from "../utils/messages/errorMessages";

export async function getExams(startIndex = 0, endIndex = 15, pacientId) {
    try {
        const apiUrl = process.env.EXPO +`/mobile/clinical_history/get/exams?startIndex=${startIndex}&endIndex=${endIndex}&pacientId=${pacientId}`;
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
        console.log('Fetched Exams:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching Exams:', error);
        showErrorMessage(error);
        throw error;
    }
}
