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

export const mapApiProcessImage = (responseDataImage) => {
    if (!responseDataImage) {
        return {
            imageUrl: '',
            imageId: '',
            distanceRatio: 0,
            perimeterRatio: 0,
            areaRatio: 0,
            neuroretinalRimPerimeter: 0,
            neuroretinalRimArea: 0,
            excavationPerimeter: 0,
            excavationArea: 0,
            state: '',
            ddlStage: 0,
        };
    }

    return {
        imageUrl: responseDataImage.imageUrl || '',
        imageId: responseDataImage.imageId || '',
        distanceRatio: responseDataImage.distanceRatio || 0,
        perimeterRatio: responseDataImage.perimeterRatio || 0,
        areaRatio: responseDataImage.areaRatio || 0,
        neuroretinalRimPerimeter: responseDataImage.neuroretinalRimPerimeter || 0,
        neuroretinalRimArea: responseDataImage.neuroretinalRimArea || 0,
        excavationPerimeter: responseDataImage.excavationPerimeter || 0,
        excavationArea: responseDataImage.excavationArea || 0,
        state: responseDataImage.state || '',
        ddlStage: responseDataImage.ddlStage || 0,
    };
};