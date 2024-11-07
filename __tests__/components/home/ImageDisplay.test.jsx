import React from 'react';
import { render } from '@testing-library/react-native';
import ImageDisplay from "../../../src/components/home/ImageDisplay";

describe('ImageDisplay component', () => {
    test('renders image when imageUri is provided', () => {
        const testUri = 'https://example.com/image.jpg';
        const { getByTestId } = render(<ImageDisplay imageUri={testUri} />);

        // Verifica que el componente Image se renderice correctamente con la URI proporcionada
        const image = getByTestId('displayed-image');
        expect(image).toBeTruthy();
        expect(image.props.source).toEqual({ uri: testUri });
    });

    test('renders placeholder when imageUri is not provided', () => {
        const { getByTestId } = render(<ImageDisplay />);

        // Verifica que el contenedor del marcador de posición se muestre cuando no hay URI de imagen
        const placeholder = getByTestId('image-placeholder');
        expect(placeholder).toBeTruthy();
    });
});
