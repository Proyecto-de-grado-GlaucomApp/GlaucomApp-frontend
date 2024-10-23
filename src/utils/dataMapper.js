// utils/dataMapper.js
/*export const mapApiResponseToViewData = (responseData) => {
    if (!responseData) {
        return {
            imagen: '',
            descripcion: 'No hay datos disponibles.',
            porcentaje_semaforo: 0,
            areas: [],
            perimetro: [],
            processing_time: 0,
        };
    }

    return {
        imagen: responseData.imagen || '',
        descripcion: responseData.descripcion || 'Descripción no disponible.',
        porcentaje_semaforo: responseData.porcentaje_semaforo || 0,
        areas: responseData.areas.map((area) => ({
            nombre: area.nombre,
            valor: area.valor,
        })),
        perimetro: responseData.perimetro.map((perimetro) => ({
            nombre: perimetro.nombre,
            valor: perimetro.valor,
        })),
        processing_time: responseData.processing_time || 0,
    };
};
*/

export const mapApiResponseToViewData = (responseData) => {
    if (!responseData) {
        return {
            imageUrl: '',
            distanceRatio: 0,
            perimeterRatio: 0,
            areaRatio: 0,
        };
    }

    return {
        imageUrl: responseData.imageUrl || '',
        distanceRatio: responseData.distanceRatio || 0,
        perimeterRatio: responseData.perimeterRatio || 0,
        areaRatio: responseData.areaRatio || 0,
    };
};

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

