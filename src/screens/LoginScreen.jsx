import React from 'react';
import {StyleSheet, View} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import FormikInputField from '../components/FormikInputField';
import Header from "../components/Header";
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
                        <Header />

                        <FormikInputField
                            name='email'
                            placeholder='Email'
                            iconName="person"
                        />
                        <FormikInputField
                            name='password'
                            placeholder='Password'
                            iconName="eye"
                            secureTextEntry={true}
                        />

                        <PrimaryButton title="Iniciar Sesión" onPress={() => navigation.navigate('Home')} />
                        <TextLink title="Registrarse" onPress={() => navigation.navigate('Login')} />

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


