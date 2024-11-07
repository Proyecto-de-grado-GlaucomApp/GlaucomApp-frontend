import React from 'react';
import { render } from '@testing-library/react-native';
import ResultMessage from "../../../src/components/home/ResultMessage";

describe('ResultMessage component', () => {
    test('renders success message and icon when success is true', () => {
        const { getByText, getByTestId } = render(<ResultMessage success={true} />);

        // Verifica que el mensaje de éxito esté presente
        expect(getByText('Imagen procesada correctamente.')).toBeTruthy();

        // Verifica que el contenedor del ícono de éxito esté presente
        expect(getByTestId('success-icon')).toBeTruthy();
    });

    test('renders error message and icon when success is false', () => {
        const { getByText, getByTestId } = render(<ResultMessage success={false} />);

        // Verifica que el mensaje de error esté presente
        expect(getByText('Error al procesar la imagen.')).toBeTruthy();

        // Verifica que el contenedor del ícono de error esté presente
        expect(getByTestId('error-icon')).toBeTruthy();
    });
});
