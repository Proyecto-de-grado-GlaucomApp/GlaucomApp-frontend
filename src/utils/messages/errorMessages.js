import { Alert } from 'react-native';

const showErrorMessage = (error) => {
    if (error.message === 'Network Error') {
        // Manejar error de red
        Alert.alert("Error de Conexión", "No se pudo conectar con el servidor. Verifica tu conexión a internet.");
    } else if (error.response) {
        // Manejar errores del servidor con base en el código de estado HTTP
        switch (error.response.status) {
            case 400:
                Alert.alert("Solicitud Incorrecta", error.response.data.message || 'Parámetros incorrectos.');
                break;
            case 401:
                Alert.alert("No Autorizado", 'Credenciales incorrectas o sesión expirada.');
                break;
            case 403:
                Alert.alert("Prohibido", 'No tienes permiso para acceder a este recurso.');
                break;
            case 404:
                Alert.alert("No Encontrado", 'Recurso no encontrado.');
                break;
            case 500:
                Alert.alert("Error del Servidor", 'Hubo un problema en el servidor. Intenta más tarde.');
                break;
            default:
                Alert.alert("Error", error.response.data.message || 'Ha ocurrido un error desconocido.');
        }
    } else {
        // Manejar errores desconocidos
        Alert.alert("Error", 'Ha ocurrido un error desconocido. Inténtalo de nuevo.');
    }
};

export default showErrorMessage;
