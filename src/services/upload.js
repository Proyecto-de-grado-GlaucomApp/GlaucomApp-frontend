export async function postApiLocal(imageUri) {
    try {
        const apiUrl = process.env.EXPO + '/uploadfiles/';

        console.log('apiUrl:  ', apiUrl);

        const formData = new FormData();
        const filename = imageUri.split('/').pop();
        const fileType = filename.split('.').pop();

        formData.append('file', {
            uri: imageUri,
            name: filename,
            type: `image/${fileType}`
        });

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Error en postApiLocal:', error);
        throw error;
    }
}
