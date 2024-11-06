import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PrimaryButton from '../../components/shared/PrimaryButton';
import InputField from '../../components/auth/InputField';
import LogoHeader from "../../components/auth/LogoHeader";
import TextLink from "../../components/auth/TextLink";
import { Formik } from 'formik';
import { registerSchema } from '../../validationSchemas/register';
import authApi from '../../services/authApi';

const initialValues = {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
};

export default function RegisterScreen({ navigation }) {
    const handleRegister = async (values) => {
        if (values.password !== values.confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden");
            return;
        }

        const user = {
            name: values.name,
            username: values.username,
            password: values.password,
        };

        try {
            const message = await authApi.AuthRegister(user.name, user.username, user.password);
            Alert.alert("Éxito", message);
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollContainer}
            enableOnAndroid={true}
            extraScrollHeight={0} // No se añadirá espacio adicional
            enableAutomaticScroll={false} // Desactiva el desplazamiento automático al abrir el teclado
            keyboardShouldPersistTaps="handled"
        >
            <Formik
                validationSchema={registerSchema}
                initialValues={initialValues}
                onSubmit={handleRegister}
            >
                {({ handleSubmit }) => (
                    <View style={styles.container}>
                        <LogoHeader />
                        <InputField name='name' placeholder='Usuario' iconName="person" />
                        <InputField name='username' placeholder='Email' iconName="mail" />
                        <InputField name='password' placeholder='Contraseña' iconName="eye" secureTextEntry={true} />
                        <InputField name='confirmPassword' placeholder='Confirmar Contraseña' iconName="eye" secureTextEntry={true} />

                        <PrimaryButton title="Registrarse" onPress={handleSubmit} />
                        <TextLink title="Iniciar Sesión" onPress={() => navigation.navigate('Login')} />
                    </View>
                )}
            </Formik>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#769BCE',
        padding: 20,
        justifyContent: 'center',
    },
});
