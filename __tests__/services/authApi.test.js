import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import showErrorMessage from '../../src/utils/messages/errorMessages';
import authApi from "../../src/services/authApi";
import '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
}));
jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage');
jest.mock('jwt-decode');
jest.mock('../../src/utils/messages/errorMessages');

describe('authApi', () => {

    afterEach(() => {
        jest.clearAllMocks();  // Limpiar mocks después de cada prueba
    });

    describe('login', () => {
        test('should log in and store token', async () => {
            const username = 'testUser';
            const password = 'testPassword';
            const mockToken = 'mockToken';
            const mockDecodedToken = { name: 'Test User' };
            const mockResponse = { data: { message: 'Login successful' }, headers: { 'set-cookie': [`jwtToken=${mockToken}; Path=/`] } };

            axios.post.mockResolvedValue(mockResponse);  // Simula una respuesta exitosa de la API
            jwtDecode.mockReturnValue(mockDecodedToken);  // Simula la decodificación del token
            AsyncStorage.setItem.mockResolvedValue();  // Simula almacenamiento exitoso

            const result = await authApi.login(username, password);

            expect(axios.post).toHaveBeenCalledWith('http://192.168.1.3:8000/mobile/auth/login', { username, password }, { withCredentials: true });
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', mockToken);
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('tokenDecoded', mockDecodedToken.name);
            expect(result).toEqual(mockResponse.data);
        });


        test('should throw error if login request fails', async () => {
            const username = 'testUser';
            const password = 'testPassword';
            const mockError = { response: { data: 'Login failed' } };

            axios.post.mockRejectedValue(mockError);  // Simula un error en la solicitud

            await expect(authApi.login(username, password)).rejects.toThrow('Login failed');
        });

    });

    describe('AuthRegister', () => {
        test('should register successfully', async () => {
            const name = 'Test User';
            const username = 'testUser';
            const password = 'testPassword';
            const mockResponse = { data: { message: 'Registration successful' } };

            axios.post.mockResolvedValue(mockResponse);  // Simula una respuesta exitosa de registro

            const result = await authApi.AuthRegister(name, username, password);

            expect(axios.post).toHaveBeenCalledWith('http://192.168.1.3:8000/mobile/auth/register', { name, username, password });
            expect(result).toEqual(mockResponse.data);
        });

        test('should throw error if registration request fails', async () => {
            const name = 'Test User';
            const username = 'testUser';
            const password = 'testPassword';
            const mockError = { response: { data: 'Registration failed' } };

            axios.post.mockRejectedValue(mockError);  // Simula un error en la solicitud

            await expect(authApi.AuthRegister(name, username, password)).rejects.toThrow('Registration failed');
        });


    });

    describe('logOut', () => {

        test('should throw error if no token is found', async () => {
            AsyncStorage.getItem.mockResolvedValue(null);  // Simula la ausencia de token

            await expect(authApi.logOut()).rejects.toThrow('No token found. Please log in again.');
        });

        test('should throw error if logout request fails', async () => {
            const mockToken = 'mockToken';

            // Mock de AsyncStorage para obtener el token
            AsyncStorage.getItem.mockResolvedValue(mockToken);

            // Simula un error en la solicitud de logout
            global.fetch = jest.fn().mockRejectedValue(new Error('Network Error'));

            await expect(authApi.logOut()).rejects.toThrow('Network Error');
        });

    });

});
