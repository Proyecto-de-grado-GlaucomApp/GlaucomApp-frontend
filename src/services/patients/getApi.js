export async function getPatients() {
    try {
        const apiUrl = process.env.EXPO + '/patients';
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('Fetched Patients:', data);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getPatientById(id) {
    try {
        const apiUrl = process.env.EXPO + '/patients/' + id;
        const response = await fetch(apiUrl);
        return await response.json()

    } catch (error) {
        throw error
    }
}

