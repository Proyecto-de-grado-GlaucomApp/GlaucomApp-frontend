// utils/dataMapper.js
export const mapApiResponseToViewData = (responseData) => {
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
