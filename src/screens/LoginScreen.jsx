import React from 'react';
import {StyleSheet, View} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import FormikInputField from '../components/FormikInputField';
import HeaderMain from "../components/HeaderMain";
import TextLink from "../components/TextLink";
import {Formik} from 'formik';
import {loginSchema} from '../validationSchemas/login';


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
                        <HeaderMain />

                        <FormikInputField
                            name='email'
                            placeholder='Email'
                            iconName="mail"
                        />
                        <FormikInputField
                            name='password'
                            placeholder='Password'
                            iconName="eye"
                            secureTextEntry={true}
                        />

                        <PrimaryButton title="Iniciar Sesión" onPress={() => navigation.navigate('HomeNavigation')} />
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


