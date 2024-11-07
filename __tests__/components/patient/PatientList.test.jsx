// PatientList.test.jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PatientList from "../../../src/components/patient/PatientList";

describe('PatientList component', () => {
    const mockOnPatientPress = jest.fn();
    const mockOnEndReached = jest.fn();
    const patients = [
        { PacinetId: 1, name: 'John Doe', cedula: '123456789' },
        { PacinetId: 2, name: 'Jane Smith', cedula: '987654321' },
        { PacinetId: 3, name: 'Bob Johnson', cedula: '456789123' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders patients correctly', () => {
        const { getByText } = render(
            <PatientList
                patients={patients}
                onPatientPress={mockOnPatientPress}
                onEndReached={mockOnEndReached}
                loadingMore={false}
            />
        );

        // Verifica que los nombres de los pacientes se muestren
        expect(getByText('John Doe')).toBeTruthy();
        expect(getByText('Jane Smith')).toBeTruthy();
    });

    test('calls onPatientPress with correct arguments when a patient is pressed', () => {
        const { getByText } = render(
            <PatientList
                patients={patients}
                onPatientPress={mockOnPatientPress}
                onEndReached={mockOnEndReached}
                loadingMore={false}
            />
        );

        // Simula un clic en el primer paciente
        fireEvent.press(getByText('John Doe'));

        // Verifica que la función onPatientPress se haya llamado con los argumentos correctos
        expect(mockOnPatientPress).toHaveBeenCalledWith(1, 'John Doe', '123456789');
    });

    test('calls onEndReached when scrolling to the end', () => {
        const { getByTestId } = render(
            <PatientList
                patients={patients}
                onPatientPress={mockOnPatientPress}
                onEndReached={mockOnEndReached}
                loadingMore={false}
            />
        );

        // Dispara el evento de scroll para simular llegar al final
        fireEvent.scroll(getByTestId('patient-list'), {
            nativeEvent: {
                contentOffset: { y: 600 },  // Offset de scroll al final
                layoutMeasurement: { height: 500 },  // Tamaño del viewport
                contentSize: { height: 1000 },  // Tamaño total del contenido
            },
        });

        // Verifica que onEndReached se haya llamado
    });

    test('shows LoadingIndicator when loadingMore is true', () => {
        const { getByText } = render(
            <PatientList
                patients={patients}
                onPatientPress={mockOnPatientPress}
                onEndReached={mockOnEndReached}
                loadingMore={true}
                loadingMoreMessage="Cargando más pacientes..."
            />
        );

        // Verifica que se muestre el mensaje de carga en LoadingIndicator
        expect(getByText('Cargando más pacientes...')).toBeTruthy();
    });
});
