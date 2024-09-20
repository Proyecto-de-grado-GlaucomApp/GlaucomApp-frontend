
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

        const contentType = response.headers.get('content-type');
        let data;
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else if (contentType && contentType.includes('image')) {
            data = await response.blob(); // No lo estamos usando, pero puedes manejarlo si es necesario
        }

        const headers = {
            contentDisposition: response.headers.get('content-disposition'),
            contentType: response.headers.get('content-type'),
            variables: {
                '1-radius': response.headers.get('1-variables-radius'),
                '1-x': response.headers.get('1-variables-x'),
                '1-y': response.headers.get('1-variables-y'),
                '2-radius': response.headers.get('2-variables-radius'),
                '2-x': response.headers.get('2-variables-x'),
                '2-y': response.headers.get('2-variables-y'),
            },
        };

        return { data, headers };

    } catch (error) {
        console.error('Error en postApiLocal:', error);
        throw error;
    }
}
