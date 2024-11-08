import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteAccount } from "../../src/services/accountApi";
import '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Mock de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    removeItem: jest.fn(),
}));

// Mock de fetch
global.fetch = jest.fn();

describe('deleteAccount', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpiar mocks antes de cada prueba

        // Espiar y suprimir logs de consola
        jest.spyOn(console, 'log').mockImplementation();
        jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        // Restaurar los mocks de consola después de cada prueba
        console.log.mockRestore();
        console.error.mockRestore();
    });

    test('should throw error if no token is found', async () => {
        // Mock de AsyncStorage.getItem para devolver null (simulando que no hay token)
        AsyncStorage.getItem.mockResolvedValue(null);

        // Esperar que la función lance un error cuando no haya token
        await expect(deleteAccount()).rejects.toThrow('No token found. Please log in again.');
    });

    test('should delete account successfully when valid token is found', async () => {
        // Mock de AsyncStorage.getItem para devolver un token válido
        const mockToken = 'valid_token';
        AsyncStorage.getItem.mockResolvedValue(mockToken);

        // Mock de AsyncStorage.removeItem para no hacer nada
        AsyncStorage.removeItem.mockResolvedValue();

        // Mock de la respuesta de fetch (simulando una respuesta exitosa de la API)
        const mockResponse = {
            ok: true,
            text: jest.fn().mockResolvedValue('Account deleted successfully'),
        };
        fetch.mockResolvedValue(mockResponse);

        const result = await deleteAccount();

        // Verificar que la función devuelve la respuesta correcta
        expect(result).toBe('Account deleted successfully');

        // Verificar que AsyncStorage.removeItem se haya llamado con los argumentos correctos
        expect(AsyncStorage.removeItem).toHaveBeenCalledWith('token');
        expect(AsyncStorage.removeItem).toHaveBeenCalledWith('tokenDecoded');
    });

    test('should throw error if API returns an error', async () => {
        // Mock de AsyncStorage.getItem para devolver un token válido
        const mockToken = 'valid_token';
        AsyncStorage.getItem.mockResolvedValue(mockToken);

        // Mock de la respuesta de fetch (simulando un error en la API)
        const mockResponse = {
            ok: false,
            text: jest.fn().mockResolvedValue('Error al eliminar la cuenta'),
        };
        fetch.mockResolvedValue(mockResponse);

        // Esperar que la función lance un error cuando la API falla
        await expect(deleteAccount()).rejects.toThrow('Error al eliminar la cuenta');
    });

    test('should throw error if fetch fails (network error)', async () => {
        // Mock de AsyncStorage.getItem para devolver un token válido
        const mockToken = 'valid_token';
        AsyncStorage.getItem.mockResolvedValue(mockToken);

        // Mock de AsyncStorage.removeItem para no hacer nada
        AsyncStorage.removeItem.mockResolvedValue();

        // Mock de fetch para simular un fallo en la red
        fetch.mockRejectedValue(new Error('Network Error'));

        // Esperar que la función lance un error cuando fetch falla
        await expect(deleteAccount()).rejects.toThrow('Network Error');
    });
});
