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


