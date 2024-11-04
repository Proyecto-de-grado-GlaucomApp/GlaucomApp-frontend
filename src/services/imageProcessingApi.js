import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import showErrorMessage from "../utils/messages/errorMessages";

export async function postUploadImage(imageUri) {
    try {
        const apiUrl = "http://172.16.1.153:8000/mobile/glaucoma-screening/process";

        console.log('apiUrl:  ', apiUrl);


        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('No token found. Please log in again.');
        }
        console.log('token-getItem:  ', token);



        // Confirmar que imageUri es válido
        console.log('URI de la imagen:', imageUri);


        const formData = new FormData();
        const filename = imageUri.split('/').pop();
        const fileType = filename.split('.').pop();

        console.log('Nombre del archivo:', filename);
        console.log('Tipo de archivo:', fileType);

        formData.append('file', {
            uri: imageUri,
            name: filename,
            type: `image/${fileType}`
        });

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
