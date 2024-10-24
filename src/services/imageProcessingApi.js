import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import showErrorMessage from "../utils/messages/errorMessages";

export async function postUploadImage(imageUri) {
    try {
        const apiUrl = process.env.EXPO + '/mobile/glaucoma-screening/process';

        console.log('apiUrl:  ', apiUrl);


        // Recuperar el token del AsyncStorage
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('No token found. Please log in again.');
        }
        console.log('token-getItem:  ', token);

        const formData = new FormData();
        const filename = imageUri.split('/').pop();
        const fileType = filename.split('.').pop();

        formData.append('file', {
            uri: imageUri,
            name: filename,
            type: `image/${fileType}`
        });

        // Realizamos la solicitud POST con axios
        const response = await axios.post(apiUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        return response.data;

    } catch (error) {
        console.error('Error en postApiLocal con axios:', error);
        showErrorMessage(error);
        throw error;
    }
}
