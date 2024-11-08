import { Alert } from 'react-native';
import showErrorMessage from "../../src/utils/messages/errorMessages";

jest.mock('react-native', () => ({
    Alert: {
        alert: jest.fn(),
    },
}));

describe('showErrorMessage', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpiar los mocks después de cada prueba
    });

    test('should show "Network Error" alert for network issues', () => {
        const mockError = new Error('Network Error');

        showErrorMessage(mockError);

        // Verificar que Alert.alert se haya llamado con el mensaje esperado
        expect(Alert.alert).toHaveBeenCalledWith(
            'Error de Conexión',
            'No se pudo conectar con el servidor. Verifica tu conexión a internet.'
        );
    });

    test('should show correct alert for 400 error', () => {
        const mockError = {
            response: {
                status: 400,
                data: { message: 'Parametros incorrectos' },
            },
        };

        showErrorMessage(mockError);

        // Verificar que Alert.alert se haya llamado con el mensaje correcto
        expect(Alert.alert).toHaveBeenCalledWith(
            'Solicitud Incorrecta',
            'Parametros incorrectos'
        );
    });

    test('should show default 400 message when no message in response', () => {
        const mockError = {
            response: {
                status: 400,
                data: {},
            },
        };

        showErrorMessage(mockError);

        // Verificar que Alert.alert se haya llamado con el mensaje por defecto
        expect(Alert.alert).toHaveBeenCalledWith(
            'Solicitud Incorrecta',
            'Parámetros incorrectos.'
        );
    });

    test('should show 401 alert for unauthorized error', () => {
        const mockError = {
            response: {
                status: 401,
            },
        };

        showErrorMessage(mockError);

        // Verificar que Alert.alert se haya llamado con el mensaje correspondiente
        expect(Alert.alert).toHaveBeenCalledWith(
            'No Autorizado',
            'Credenciales incorrectas o sesión expirada.'
        );
    });

    test('should show 403 alert for forbidden error', () => {
        const mockError = {
            response: {
                status: 403,
            },
        };

        showErrorMessage(mockError);

        // Verificar que Alert.alert se haya llamado con el mensaje correspondiente
        expect(Alert.alert).toHaveBeenCalledWith(
            'Prohibido',
            'No tienes permiso para acceder a este recurso.'
        );
    });

    test('should show 404 alert for not found error', () => {
        const mockError = {
            response: {
                status: 404,
            },
        };

        showErrorMessage(mockError);

        // Verificar que Alert.alert se haya llamado con el mensaje correspondiente
        expect(Alert.alert).toHaveBeenCalledWith(
            'No Encontrado',
            'Recurso no encontrado.'
        );
    });

    test('should show 500 alert for internal server error', () => {
        const mockError = {
            response: {
                status: 500,
            },
        };

        showErrorMessage(mockError);

        // Verificar que Alert.alert se haya llamado con el mensaje correspondiente
        expect(Alert.alert).toHaveBeenCalledWith(
            'Error del Servidor',
            'Hubo un problema en el servidor. Intenta más tarde.'
        );
    });

    test('should show default error alert for unhandled status code', () => {
        const mockError = {
            response: {
                status: 999,
                data: { message: 'Un error desconocido' },
            },
        };

        showErrorMessage(mockError);

        // Verificar que Alert.alert se haya llamado con el mensaje correspondiente
        expect(Alert.alert).toHaveBeenCalledWith(
            'Error',
            'Un error desconocido'
        );
    });

    test('should show default error message when no response is provided', () => {
        const mockError = new Error('Some other error');

        showErrorMessage(mockError);

        // Verificar que Alert.alert se haya llamado con el mensaje por defecto
        expect(Alert.alert).toHaveBeenCalledWith(
            'Error',
            'Ha ocurrido un error desconocido. Inténtalo de nuevo.'
        );
    });
});
