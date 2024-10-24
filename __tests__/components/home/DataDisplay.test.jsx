import React from 'react';
import { render } from '@testing-library/react-native';
import DataDisplay from "../../../src/components/home/DataDisplay";

describe('DataDisplay component', () => {

    test('renders correctly with given title and value', () => {
        // Renderiza el componente con un título y un valor
        const { getByText } = render(<DataDisplay title="Test Title" value="Test Value" />);

        // Verifica que el título y el valor se renderizan correctamente
        expect(getByText('Test Title')).toBeTruthy();
        expect(getByText('Test Value')).toBeTruthy();
    });

    test('displays different values for title and value', () => {
        // Renderiza el componente con un título y un valor diferentes
        const { getByText } = render(<DataDisplay title="New Title" value="New Value" />);

        // Verifica que los nuevos valores se muestran correctamente
        expect(getByText('New Title')).toBeTruthy();
        expect(getByText('New Value')).toBeTruthy();
    });

    test('handles empty value', () => {
        // Renderiza el componente con un título pero sin valor
        const { getByText } = render(<DataDisplay title="Empty Value" value="" />);

        // Verifica que el título está presente y el valor vacío
        expect(getByText('Empty Value')).toBeTruthy();
        // Aquí podrías verificar cómo se muestra el valor vacío (si es un espacio vacío o un texto por defecto)
    });
});
