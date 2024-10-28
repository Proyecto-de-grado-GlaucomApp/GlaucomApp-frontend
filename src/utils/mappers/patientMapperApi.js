export const mapApiPatients = (responseDataPatients) => {
    if (!responseDataPatients || !Array.isArray(responseDataPatients)) {
        return {
            patients: [],
        };
    }

    return {
        patients: responseDataPatients.map((patient) => ({
            PacinetId: patient.PacinetId,
            name: patient.name,
            cedula: patient.cedula,
        })),
    };
};

export const mapApiPatientsCedula = (responseDataPatients) => {
    // Verificar si la respuesta es 404 o no tiene datos
    if (!responseDataPatients || responseDataPatients.status === 404 || !responseDataPatients.data) {
        return false;
    }

    // Verificar si los datos están vacíos
    const data = responseDataPatients.data;
    if (Array.isArray(data) && data.length === 0) {
        return false;
    }

    return true;
};

