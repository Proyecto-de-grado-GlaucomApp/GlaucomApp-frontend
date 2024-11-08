import React from 'react';
import { render } from '@testing-library/react-native';
import LoadingIndicator from '../../../src/components/shared/LoadingIndicator';

describe('LoadingIndicator component', () => {
    test('renders correctly with a message', () => {
        const { getByText, getByTestId } = render(
            <LoadingIndicator message="Cargando más pacientes..." />
        );

        // Verifica que el mensaje se muestra
        expect(getByText('Cargando más pacientes...')).toBeTruthy();

        // Verifica que el ActivityIndicator esté presente
        const activityIndicator = getByTestId('activity-indicator');
        expect(activityIndicator).toBeTruthy();
    });
});
