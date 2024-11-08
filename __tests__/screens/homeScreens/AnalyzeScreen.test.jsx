import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AnalyzeScreen from '../../../src/screens/homeScreens/AnalyzeScreen';
import { Alert } from 'react-native';
import { downloadImage } from '../../../src/utils/download/imageDownloader';

jest.mock('../../../src/utils/download/imageDownloader'); // Mock de la función de descarga

describe('AnalyzeScreen Integration Test', () => {
    const mockNavigate = jest.fn(); // Mock de la navegación
    const mockGoBack = jest.fn(); // Mock de la función de navegación goBack
    const mockAlert = jest.spyOn(Alert, 'alert'); // Mock de Alert.alert

    const mockImageUri = 'http://example.com/image.jpg'; // URI de imagen de prueba

    beforeEach(() => {
        jest.clearAllMocks(); // Limpiar los mocks antes de cada prueba
    });

    test('renders loading state and then displays image after download', async () => {
        // Simulando el comportamiento de la función downloadImage
        downloadImage.mockImplementation((uri, setLocalImageUri, setLoading) => {
            setLoading(true);
            setLocalImageUri(uri); // Simulamos la descarga exitosa inmediatamente
            setLoading(false); // Cambiar el estado de carga
        });

        const { getByText, queryByTestId } = render(
            <AnalyzeScreen route={{ params: { imageUri: mockImageUri } }} navigation={{ navigate: mockNavigate, goBack: mockGoBack }} />
        );

        // Esperamos a que se ejecute la alerta de carga
        await waitFor(() => {
            expect(mockAlert).toHaveBeenCalledWith('Cargando imagen...', 'La imagen está siendo cargada. Por favor, espera.');
        });

        // Verificar que la imagen se ha descargado y se muestra
        await waitFor(() => {
            const image = queryByTestId('displayed-image');
            expect(image).toBeTruthy(); // La imagen debe ser visible después de la descarga
        });

        // Verificar que el botón "Realizar análisis" está presente
        expect(getByText('Realizar análisis')).toBeTruthy();
    });

    test('navigates to Loading screen with image URI on button press', async () => {
        // Simulando la descarga exitosa de la imagen
        downloadImage.mockImplementation((uri, setLocalImageUri, setLoading) => {
            setLoading(true);
            setLocalImageUri(uri); // Imagen descargada
            setLoading(false); // No está más cargando
        });

        const { getByText } = render(
            <AnalyzeScreen route={{ params: { imageUri: mockImageUri } }} navigation={{ navigate: mockNavigate, goBack: mockGoBack }} />
        );

        // Esperar a que la imagen se descargue y se muestre
        await waitFor(() => {
            expect(mockAlert).toHaveBeenCalledWith('Cargando imagen...', 'La imagen está siendo cargada. Por favor, espera.');
        });

        await waitFor(() => {
            expect(mockAlert).toHaveBeenCalledTimes(1); // Solo debe haberse mostrado el alerta de carga
        });

        // Simular que el usuario presiona el botón de "Realizar análisis"
        fireEvent.press(getByText('Realizar análisis'));

        // Verificar que la navegación se realizó con la URI de la imagen
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('Loading', { uri: mockImageUri });
        });
    });

    test('shows error alert if image URI is not provided', async () => {
        const { getByText } = render(
            <AnalyzeScreen route={{ params: {} }} navigation={{ navigate: mockNavigate, goBack: mockGoBack }} />
        );

        // Simular que el usuario presiona el botón de "Realizar análisis" sin URI
        fireEvent.press(getByText('Realizar análisis'));

        // Verificar que se muestra un mensaje de error cuando no hay URI
        await waitFor(() => {
            expect(mockAlert).toHaveBeenCalledWith('No image URI provided');
        });
    });

    test('navigates back when "Seleccionar otra imagen" is pressed', () => {
        const { getByText } = render(
            <AnalyzeScreen route={{ params: { imageUri: mockImageUri } }} navigation={{ navigate: mockNavigate, goBack: mockGoBack }} />
        );

        // Simular que el usuario presiona el botón "Seleccionar otra imagen"
        fireEvent.press(getByText('Seleccionar otra imagen'));

        // Verificar que la navegación hacia atrás ha sido llamada
        expect(mockGoBack).toHaveBeenCalled();
    });
});
