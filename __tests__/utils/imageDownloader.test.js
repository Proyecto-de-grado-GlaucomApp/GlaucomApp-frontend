import { downloadImage } from "../../src/utils/download/imageDownloader";
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

jest.mock('expo-file-system', () => ({
    downloadAsync: jest.fn(),
    documentDirectory: 'mockDirectory/',
}));

jest.mock('react-native', () => ({
    Alert: {
        alert: jest.fn(),
    },
}));

describe('downloadImage', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpiar los mocks después de cada prueba
    });

    test('should download image when imageUri is valid', async () => {
        const mockImageUri = 'https://example.com/image.jpg';
        const mockFileUri = 'mockDirectory/downloadedImage.jpg';
        const setLocalImageUri = jest.fn();
        const setLoading = jest.fn();

        // Mock del comportamiento exitoso de downloadAsync
        FileSystem.downloadAsync.mockResolvedValue({ uri: mockFileUri });

        await downloadImage(mockImageUri, setLocalImageUri, setLoading);

        // Verificar que downloadAsync se haya llamado con los argumentos correctos
        expect(FileSystem.downloadAsync).toHaveBeenCalledWith(mockImageUri, mockFileUri);

        // Verificar que setLocalImageUri se haya llamado con la URI local correcta
        expect(setLocalImageUri).toHaveBeenCalledWith(mockFileUri);

        // Verificar que setLoading se haya llamado con el valor false (indicando que la carga terminó)
        expect(setLoading).toHaveBeenCalledWith(false);
    });

    test('should not download image if imageUri is not a URL', async () => {
        const mockImageUri = 'file://some-local-image.jpg';
        const setLocalImageUri = jest.fn();
        const setLoading = jest.fn();

        await downloadImage(mockImageUri, setLocalImageUri, setLoading);

        // Verificar que setLocalImageUri se haya llamado con la misma URI de la imagen local
        expect(setLocalImageUri).toHaveBeenCalledWith(mockImageUri);

        // Verificar que setLoading se haya llamado con el valor false (indicando que la carga terminó)
        expect(setLoading).toHaveBeenCalledWith(false);
    });

    test('should show error alert if download fails', async () => {
        const mockImageUri = 'https://example.com/image.jpg';
        const setLocalImageUri = jest.fn();
        const setLoading = jest.fn();

        // Mock del error en downloadAsync
        FileSystem.downloadAsync.mockRejectedValue(new Error('Download failed'));

        // Espiar y capturar los errores de consola
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await downloadImage(mockImageUri, setLocalImageUri, setLoading);

        // Verificar que Alert.alert se haya llamado con el mensaje de error
        expect(Alert.alert).toHaveBeenCalledWith('Error', 'No se pudo descargar la imagen.');

        // Verificar que setLoading se haya llamado con el valor false (indicando que la carga terminó)
        expect(setLoading).toHaveBeenCalledWith(false);

        // Permitir que console.error sea llamado y no fallar la prueba
        expect(consoleSpy).toHaveBeenCalled();  // Esto permitirá que el error se registre

        // Limpiar el spy
        consoleSpy.mockRestore();
    });

});
