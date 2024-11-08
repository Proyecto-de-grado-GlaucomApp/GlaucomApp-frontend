// MainHeader.test.jsx
import React from 'react';
import { render } from '@testing-library/react-native';
import MainHeader from '../../../src/components/shared/MainHeader';

describe('MainHeader component', () => {
    test('renders title and subtitle correctly', () => {
        const title = 'Bienvenido';
        const subtitle = 'Usuario';

        const { getByText } = render(
            <MainHeader title={title} subtitle={subtitle} />
        );

        // Verifica que el título se muestre
        expect(getByText('Bienvenido')).toBeTruthy();

        // Verifica que el subtítulo se muestre
        expect(getByText('Usuario')).toBeTruthy();
    });

    test('applies correct styles', () => {
        const { getByText } = render(
            <MainHeader title="Bienvenido" subtitle="Usuario" />
        );

        // Verifica los estilos aplicados al título
        const titleText = getByText('Bienvenido');
        expect(titleText.props.style).toEqual(
            expect.objectContaining({
                fontSize: 16,
                color: '#ffffff',
                fontFamily: 'SansationRegular',
            })
        );

        // Verifica los estilos aplicados al subtítulo
        const subtitleText = getByText('Usuario');
        expect(subtitleText.props.style).toEqual(
            expect.objectContaining({
                fontSize: 35,
                color: '#FFDD00',
                fontWeight: 'semibold',
                fontFamily: 'SansationRegular',
            })
        );
    });
});
