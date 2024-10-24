import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../../../src/screens/authScreens/LoginScreen';
import authApi from '../../../src/services/authApi';
import { Alert } from 'react-native';

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
})); // Mock de AsyncStorage directamente
jest.mock('../../../src/services/authApi'); // Mock de la API de autenticación

describe('LoginScreen Integration Test', () => {
    const mockNavigate = jest.fn(); // Mock de la navegación

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders all components correctly', () => {
        const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={{ navigate: mockNavigate }} />);

        // Verificar que los componentes se renderizan correctamente
        expect(getByPlaceholderText('Email')).toBeTruthy();
        expect(getByPlaceholderText('Password')).toBeTruthy();
        expect(getByText('Iniciar Sesión')).toBeTruthy();
        expect(getByText('Registrarse')).toBeTruthy();
    });

    test('navigates to Home screen after successful login', async () => {
        authApi.login.mockResolvedValueOnce(); // Simular login exitoso

        const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={{ navigate: mockNavigate }} />);

        // Simular ingreso de credenciales y pulsar el botón de iniciar sesión
        fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
        fireEvent.press(getByText('Iniciar Sesión'));

        // Esperar que la función login sea llamada y se navegue a la pantalla Home
        await waitFor(() => {
            expect(authApi.login).toHaveBeenCalledWith('test@example.com', 'password123');
            expect(mockNavigate).toHaveBeenCalledWith('Home');
        });
    });

    test('displays error alert on failed login', async () => {
        const mockError = { message: 'Invalid credentials' };
        authApi.login.mockRejectedValueOnce(mockError); // Simular error en login

        const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={{ navigate: mockNavigate }} />);

        // Simular ingreso de credenciales y pulsar el botón de iniciar sesión
        fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpassword');
        fireEvent.press(getByText('Iniciar Sesión'));

        // Simular el comportamiento del alert
        const alertSpy = jest.spyOn(Alert, 'alert');

        // Verificar que se muestra un mensaje de error
        await waitFor(() => {
            expect(authApi.login).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
            expect(alertSpy).toHaveBeenCalledWith('Error', 'Invalid credentials');
        });
    });

    test('navigates to Register screen when "Registrarse" is pressed', () => {
        const { getByText } = render(<LoginScreen navigation={{ navigate: mockNavigate }} />);

        // Simular la pulsación del enlace de registrarse
        fireEvent.press(getByText('Registrarse'));

        // Verificar que se navega a la pantalla de registro
        expect(mockNavigate).toHaveBeenCalledWith('Register');
    });
});
