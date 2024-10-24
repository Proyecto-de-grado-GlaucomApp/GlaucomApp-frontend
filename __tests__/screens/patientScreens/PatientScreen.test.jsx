import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import PatientScreen from '../../../src/screens/patientScreens/patientSreen';
import { getPatients, getPatientById } from '../../../src/services/patientsApi';
import { mapApiPatients, mapApiPatientsById } from '../../../src/utils/mappers/patientMapperApi';

// Mocks de las funciones de API
jest.mock('../../../src/services/patientsApi', () => ({
    getPatients: jest.fn(),
    getPatientById: jest.fn(),
}));

jest.mock('../../../src/utils/mappers/patientMapperApi', () => ({
    mapApiPatients: jest.fn(),
    mapApiPatientsById: jest.fn(),
}));

describe('PatientScreen Integration Test', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks(); // Limpiar los mocks antes de cada prueba
    });

    jest.useFakeTimers(); // Activa el temporizador simulado

    test('renders loading indicator while fetching patients', async () => {
        getPatients.mockResolvedValue([]); // Simulando una respuesta vacía
        mapApiPatients.mockReturnValue({ patients: [] });

        const { getByText } = render(
            <NavigationContainer>
                <PatientScreen navigation={{ navigate: mockNavigate }} />
            </NavigationContainer>
        );

        // Run all timers and wait for loading to complete
        jest.runAllTimers();

        await waitFor(() => {
            // Verificar que el indicador de carga se muestra
            expect(getByText('Cargando pacientes...')).toBeTruthy();
        });
    });


    test('renders patient list after fetching patients', async () => {
        const patientsApiResponse = [{ id: 1, name: 'Paciente 1' }, { id: 2, name: 'Paciente 2' }];
        getPatients.mockResolvedValue(patientsApiResponse);
        mapApiPatients.mockReturnValue({ patients: patientsApiResponse });

        const { getByText } = render(
            <NavigationContainer>
                <PatientScreen navigation={{ navigate: mockNavigate }} />
            </NavigationContainer>
        );

        // Esperar a que se complete la carga
        await waitFor(() => {
            expect(getByText('Paciente 1')).toBeTruthy();
            expect(getByText('Paciente 2')).toBeTruthy();
        });
    });

    test('navigates to PatientDetail when a patient is pressed', async () => {
        const patientsApiResponse = [{ id: 1, name: 'Paciente 1' }];
        getPatients.mockResolvedValue(patientsApiResponse);
        mapApiPatients.mockReturnValue({ patients: patientsApiResponse });

        const patientDetailApiResponse = { id: 1, name: 'Paciente 1', details: 'Detalles del paciente' };
        getPatientById.mockResolvedValue(patientDetailApiResponse);
        mapApiPatientsById.mockReturnValue(patientDetailApiResponse);

        const { getByText } = render(
            <NavigationContainer>
                <PatientScreen navigation={{ navigate: mockNavigate }} />
            </NavigationContainer>
        );

        await waitFor(() => {
            // Simula presionar el paciente
            fireEvent.press(getByText('Paciente 1'));
        });

        // Verifica que se navega a la pantalla de detalles del paciente
        expect(mockNavigate).toHaveBeenCalledWith('PatientDetail', { patient: patientDetailApiResponse });
    });
});
