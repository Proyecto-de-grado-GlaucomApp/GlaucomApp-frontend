import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ImageSelector from "../../../src/components/home/ImageSelector";

describe('ImageSelector component', () => {
    const mockOnPress = jest.fn();
    const mockImageSource = { uri: 'https://example.com/sample-image.jpg' };
    const mockText = 'Upload Image';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly with given imageSource and text', () => {
        const { getByText, getByTestId } = render(
            <ImageSelector onPress={mockOnPress} imageSource={mockImageSource} text={mockText} />
        );

        // Verifica que el texto se renderiza correctamente
        expect(getByText(mockText)).toBeTruthy();

        // Verifica que la imagen se renderiza correctamente
        const image = getByTestId('upload-image');
        expect(image.props.source).toEqual(mockImageSource);
    });

    test('calls onPress when pressed', () => {
        const { getByRole } = render(
            <ImageSelector onPress={mockOnPress} imageSource={mockImageSource} text={mockText} />
        );

        // Encuentra el componente TouchableOpacity y simula un clic
        const button = getByRole('button');
        fireEvent.press(button);

        // Verifica que la función onPress se haya llamado
        expect(mockOnPress).toHaveBeenCalled();
    });

    test('does not call onPress when not pressed', () => {
        render(<ImageSelector onPress={mockOnPress} imageSource={mockImageSource} text={mockText} />);

        // Verifica que la función onPress no se llame si no se presiona el botón
        expect(mockOnPress).not.toHaveBeenCalled();
    });
});
