import React from 'react';
import { render } from '@testing-library/react-native';
import LogoHeader from '../../../src/components/auth/LogoHeader';

describe('LogoHeader component', () => {
    test('renders the logo image', () => {
        const { getByTestId } = render(<LogoHeader />);

        // Verifica que la imagen del logo esté presente en el componente
        const logoImage = getByTestId('logo-image');
        expect(logoImage).toBeTruthy();
    });

    test('renders the title with correct text', () => {
        const { getByText } = render(<LogoHeader />);

        // Verifica que el título tenga el texto correcto
        const titleText = getByText('GlauApp');
        expect(titleText).toBeTruthy();
    });

    test('renders the subtitle with correct text', () => {
        const { getByText } = render(<LogoHeader />);

        // Verifica que el subtítulo tenga el texto correcto
        const subtitleText = getByText('Pontificia Universidad Javeriana');
        expect(subtitleText).toBeTruthy();
    });
});
