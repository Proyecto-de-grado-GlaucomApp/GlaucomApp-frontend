
export async function getApiLocal() {
    try {
        const apiUrl = 'http://192.168.1.3:8000';
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data

    } catch (error) {
        throw error
    }
}

export async function postApiLocal(imageUri) {
    try {
        const apiUrl = 'http://192.168.1.3:8000/uploadfiles/';
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

        // Procesamos la respuesta como JSON
        return await response.json();

    } catch (error) {
        console.error('Error en postApiLocal:', error);
        throw error;
    }
}
