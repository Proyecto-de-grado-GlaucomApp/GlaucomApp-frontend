import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InputField from '../InputField';
import { Formik } from 'formik';

describe('InputField component', () => {
    const initialValues = { password: '' };

    const renderInputField = (props = {}) => {
        return render(
            <Formik initialValues={initialValues} onSubmit={jest.fn()}>
                <InputField name="password" placeholder="Password" iconName="eye" secureTextEntry {...props} />
            </Formik>
        );
    };

    test('renders correctly', () => {
        const { getByPlaceholderText } = renderInputField();
        expect(getByPlaceholderText('Password')).toBeTruthy();
    });

    test('displays the correct icon based on password visibility', () => {
        const { getByTestId, getByPlaceholderText } = renderInputField();
        const input = getByPlaceholderText('Password');
        const iconButton = getByTestId('toggle-password-visibility');

        // Initially, the icon should be 'eye-off' because secureTextEntry is true
        expect(iconButton.props.name).toBe('eye-off');

        // Toggle the icon by clicking the button
        fireEvent.press(iconButton);

        // After toggling, the icon should change to 'eye'
        expect(iconButton.props.name).toBe('eye');
    });

    test('changes text input value when typing', () => {
        const { getByPlaceholderText } = renderInputField();
        const input = getByPlaceholderText('Password');

        fireEvent.changeText(input, 'newpassword');

        // Check if the input has the correct value
        expect(input.props.value).toBe('newpassword');
    });

    test('shows error text when meta.error exists', () => {
        const { getByText } = renderInputField({
            meta: { error: 'Password is required', touched: true }
        });

        expect(getByText('Password is required')).toBeTruthy();
    });
});
