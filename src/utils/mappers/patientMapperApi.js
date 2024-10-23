export const mapApiPatients = (responseDataPatients) => {
    if (!responseDataPatients || !Array.isArray(responseDataPatients.patients)) {
        return {
            patients: [],
        };
    }

    return {
        patients: responseDataPatients.patients.map((patient) => ({
            id: patient.id,
            name: patient.name,
        })),
    };
};


export const mapApiPatientsById = (responseData) => {
    if (!responseData || typeof responseData !== 'object') {
        return {
            id: '',
            name: 'No hay datos disponibles.',
            cedula: 'No disponible',
            images: [],
        };
    }

    return {
        id: responseData.id || '',
        name: responseData.name || 'Nombre no disponible',
        cedula: responseData.cedula || 'Cédula no disponible',
        images: Array.isArray(responseData.images)
            ? responseData.images.map((image) => ({
                id: image.id || '',
                url: image.url || '',
                date: image.date || 'Fecha no disponible',
                name: image.name || '',
            }))
            : [],
    };
};

