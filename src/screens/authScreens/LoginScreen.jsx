import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import PrimaryButton from '../../components/shared/PrimaryButton';
import InputField from '../../components/auth/InputField';
import LogoHeader from "../../components/auth/LogoHeader";
import TextLink from "../../components/auth/TextLink";
import { Formik } from 'formik';
import { loginSchema } from '../../validationSchemas/login';
import authApi from '../../services/authApi';

const initialValues = {
    username: '',
    password: '',
};

export default function LoginScreen({ navigation }) {
    const handleLogin = async (values) => {
        try {
            await authApi.login(values.username, values.password);
            navigation.navigate('Home'); // Navegar a la pantalla principal después de autenticarse
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <Formik validationSchema={loginSchema} initialValues={initialValues} onSubmit={handleLogin}>
            {({ handleSubmit }) => {
                return (
                    <View style={styles.container}>
                        <LogoHeader />

                        <InputField
                            name='username'
                            placeholder='Email'
                            iconName="mail"
                        />
                        <InputField
                            name='password'
                            placeholder='Password'
                            iconName="eye"
                            secureTextEntry={true}
                        />

                        <PrimaryButton title="Iniciar Sesión" onPress={handleSubmit} />
                        <TextLink title="Registrarse" onPress={() => navigation.navigate('Register')} />
                    </View>
                );
            }}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#769BCE',
        padding: 20,
        justifyContent: 'center',
    },
});
