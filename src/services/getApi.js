export async function getApiLocal() {
    try {
        const apiUrl = process.env.EXPO;
        const response = await fetch(apiUrl);
        return await response.json()

    } catch (error) {
        throw error
    }
}

