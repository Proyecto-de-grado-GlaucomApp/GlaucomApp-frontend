import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TextLink from "../../src/components/auth/TextLink";

describe('TextLink component', () => {
    const mockOnPress = jest.fn(); // Función simulada para el evento onPress

    beforeEach(() => {
        jest.clearAllMocks(); // Limpia todos los mocks antes de cada prueba
    });

    test('renders correctly with given title', () => {
        const { getByText } = render(<TextLink title="Click Me" onPress={mockOnPress} />);

        // Verifica que el texto se renderiza correctamente
        expect(getByText('Click Me')).toBeTruthy();
    });

    test('calls onPress when pressed', () => {
        const { getByText } = render(<TextLink title="Click Me" onPress={mockOnPress} />);

        // Encuentra el texto y simula un clic
        const link = getByText('Click Me');
        fireEvent.press(link);

        // Verifica que la función onPress se haya llamado
        expect(mockOnPress).toHaveBeenCalled();
    });

    test('does not call onPress when not pressed', () => {
        render(<TextLink title="Click Me" onPress={mockOnPress} />);

        // Verifica que la función onPress no se llame si no se presiona el enlace
        expect(mockOnPress).not.toHaveBeenCalled();
    });
});
