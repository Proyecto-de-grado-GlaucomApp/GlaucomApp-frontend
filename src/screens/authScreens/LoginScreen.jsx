import React from 'react';
import {StyleSheet, View} from 'react-native';
import PrimaryButton from '../../components/shared/PrimaryButton';
import InputField from '../../components/auth/InputField';
import LogoHeader from "../../components/auth/LogoHeader";
import TextLink from "../../components/auth/TextLink";
import {Formik} from 'formik';
import {loginSchema} from '../../validationSchemas/login';


const initialValues   = {
    email: '',
    password: '',
};

export default function LoginScreen({navigation}) {


    return (
        <Formik validationSchema={loginSchema} initialValues={initialValues} onSubmit={values => console.log(values)}>
            {({handleSubmit}) => {
                return (
                    <View style={styles.container}>
                        <LogoHeader />

                        <InputField
                            name='email'
                            placeholder='Email'
                            iconName="mail"
                        />
                        <InputField
                            name='password'
                            placeholder='Password'
                            iconName="eye"
                            secureTextEntry={true}
                        />

                        <PrimaryButton title="Iniciar Sesión" onPress={() => navigation.navigate('Home')} />
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


