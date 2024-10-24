import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PatientItem from "../../../src/components/patient/PatientItem";

describe('PatientItem component', () => {
    const mockOnPress = jest.fn(); // Función simulada para el evento onPress

    beforeEach(() => {
        jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
    });

    test('renders correctly with given patient name', () => {
        // Renderiza el componente con un nombre de paciente
        const { getByText } = render(<PatientItem name="John Doe" onPress={mockOnPress} />);

        // Verifica que el nombre del paciente se renderiza correctamente
        expect(getByText('John Doe')).toBeTruthy();
    });

    test('calls onPress when pressed', () => {
        // Renderiza el componente
        const { getByText } = render(<PatientItem name="John Doe" onPress={mockOnPress} />);

        // Encuentra el texto y simula el evento de pulsación
        const patientItem = getByText('John Doe');
        fireEvent.press(patientItem);

        // Verifica que la función onPress se haya llamado
        expect(mockOnPress).toHaveBeenCalled();
    });

    test('does not call onPress when not pressed', () => {
        // Renderiza el componente
        render(<PatientItem name="John Doe" onPress={mockOnPress} />);

        // Verifica que la función onPress no se haya llamado sin presionar el componente
        expect(mockOnPress).not.toHaveBeenCalled();
    });
});
