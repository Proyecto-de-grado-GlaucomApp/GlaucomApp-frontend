import axios from "axios";

export async function postApiLocal(imageUri) {
    try {
        const apiUrl = process.env.EXPO + '/glaucoma-screening/upload-image';

        console.log('apiUrl:  ', apiUrl);

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
            },
        });

        return response.data;

    } catch (error) {
        console.error('Error en postApiLocal con axios:', error);
        throw error;
    }
}
