import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import PrimaryButton from '../../components/shared/PrimaryButton';
import InputField from '../../components/auth/InputField';
import LogoHeader from "../../components/auth/LogoHeader";
import TextLink from "../../components/auth/TextLink";
import { Formik } from 'formik';
import { registerSchema } from '../../validationSchemas/register';
import authApi from '../../services/authApi'; // Importa el servicio actualizado

const initialValues = {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
};

export default function RegisterScreen({ navigation }) {
    const handleRegister = async (values) => {
        // Verificación de contraseñas
        if (values.password !== values.confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden");
            return;
        }

        // Crea el objeto para enviar
        const user = {
            name: values.name,
            username: values.username,
            password: values.password,
        };

        try {
            const message = await authApi.AuthRegister(user.name, user.username, user.password); // Llama al servicio
            Alert.alert("Éxito", message);
            navigation.navigate('Login'); // Redirige al Home después del registro exitoso
        } catch (error) {
            Alert.alert("Error", error.message); // Muestra el error
        }
    };

    return (
        <Formik
            validationSchema={registerSchema}
            initialValues={initialValues}
            onSubmit={handleRegister}
        >
            {({ handleSubmit }) => {
                return (
                    <View style={styles.container}>
                        <LogoHeader />

                        <InputField
                            name='name'
                            placeholder='Usuario'
                            iconName="person"
                        />
                        <InputField
                            name='username'
                            placeholder='Email'
                            iconName="mail"
                        />
                        <InputField
                            name='password'
                            placeholder='Contraseña'
                            iconName="eye"
                            secureTextEntry={true}
                        />
                        <InputField
                            name='confirmPassword'
                            placeholder='Confirmar Contraseña'
                            iconName="eye"
                            secureTextEntry={true}
                        />

                        <PrimaryButton title="Registrarse" onPress={handleSubmit} />
                        <TextLink title="Iniciar Sesión" onPress={() => navigation.navigate('Login')} />
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
