import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {pickImage} from '../../../src/utils/picker/imagePicker';
import {pickDocument} from '../../../src/utils/picker/documentPicker';
import {takePhoto} from '../../../src/utils/picker/cameraPicker';
import HomeScreen from "../../../src/screens/homeScreens/HomeScreen";

jest.mock('../../../src/utils/picker/imagePicker', () => ({
    pickImage: jest.fn(),
}));

jest.mock('../../../src/utils/picker/documentPicker', () => ({
    pickDocument: jest.fn(),
}));

jest.mock('../../../src/utils/picker/cameraPicker', () => ({
    takePhoto: jest.fn(),
}));

describe('HomeScreen Integration Test', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks(); // Limpiar los mocks antes de cada prueba
    });

    test('renders all components correctly', () => {
        const {getByText, getAllByRole} = render(
            <NavigationContainer>
                <HomeScreen navigation={{navigate: mockNavigate}}/>
            </NavigationContainer>
        );

        // Verificar que los botones y el encabezado se renderizan correctamente
        expect(getByText('Subir desde galería')).toBeTruthy();
        expect(getByText('Subir desde una aplicación')).toBeTruthy();
        expect(getByText('Tomar una Foto')).toBeTruthy();

        // Verificar que hay tres botones de ImageSelector
        const buttons = getAllByRole('button');
        expect(buttons.length).toBe(3);
    });

    test('calls pickImage when "Subir desde galería" is pressed', () => {
        const {getByText} = render(
            <NavigationContainer>
                <HomeScreen navigation={{navigate: mockNavigate}}/>
            </NavigationContainer>
        );

        // Simular la pulsación del botón 'Subir desde galería'
        fireEvent.press(getByText('Subir desde galería'));

        // Verificar que pickImage fue llamado
        expect(pickImage).toHaveBeenCalledWith({navigate: mockNavigate});
    });

    test('calls pickDocument when "Subir desde una aplicación" is pressed', () => {
        const {getByText} = render(
            <NavigationContainer>
                <HomeScreen navigation={{navigate: mockNavigate}}/>
            </NavigationContainer>
        );

        // Simular la pulsación del botón 'Subir desde una aplicación'
        fireEvent.press(getByText('Subir desde una aplicación'));

        // Verificar que pickDocument fue llamado
        expect(pickDocument).toHaveBeenCalledWith({navigate: mockNavigate});
    });

    test('calls takePhoto when "Tomar una Foto" is pressed', () => {
        const {getByText} = render(
            <NavigationContainer>
                <HomeScreen navigation={{navigate: mockNavigate}}/>
            </NavigationContainer>
        );

        // Simular la pulsación del botón 'Tomar una Foto'
        fireEvent.press(getByText('Tomar una Foto'));

        // Verificar que takePhoto fue llamado
        expect(takePhoto).toHaveBeenCalledWith({navigate: mockNavigate});
    });
});
