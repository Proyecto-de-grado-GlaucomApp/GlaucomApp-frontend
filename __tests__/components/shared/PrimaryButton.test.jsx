import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PrimaryButton from "../../../src/components/shared/PrimaryButton";

describe('PrimaryButton component', () => {
    const mockOnPress = jest.fn(); // Función simulada para el evento onPress

    beforeEach(() => {
        jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
    });

    test('renders correctly with given title', () => {
        // Renderiza el componente con un título de botón
        const { getByText } = render(<PrimaryButton title="Submit" onPress={mockOnPress} />);

        // Verifica que el título del botón se renderiza correctamente
        expect(getByText('Submit')).toBeTruthy();
    });

    test('calls onPress when button is pressed', () => {
        // Renderiza el componente
        const { getByText } = render(<PrimaryButton title="Submit" onPress={mockOnPress} />);

        // Encuentra el texto del botón y simula el evento de pulsación
        const button = getByText('Submit');
        fireEvent.press(button);

        // Verifica que la función onPress se haya llamado
        expect(mockOnPress).toHaveBeenCalled();
    });

    test('does not call onPress when button is not pressed', () => {
        // Renderiza el componente
        render(<PrimaryButton title="Submit" onPress={mockOnPress} />);

        // Verifica que la función onPress no se haya llamado sin presionar el botón
        expect(mockOnPress).not.toHaveBeenCalled();
    });
});
