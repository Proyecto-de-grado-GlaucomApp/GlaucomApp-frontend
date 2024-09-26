import React from 'react';
import {StyleSheet, View} from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import FormikInputField from '../../components/FormikInputField';
import HeaderMain from "../../components/HeaderMain";
import TextLink from "../../components/TextLink";
import {Formik} from 'formik';
import {registerSchema} from '../../validationSchemas/register';



const initialValues   = {
    user: '',
    email: '',
    password: '',
    confirmPassword: '',
};

export default function RegisterScreen({navigation}) {


    return (
        <Formik validationSchema={registerSchema} initialValues={initialValues} onSubmit={values => console.log(values)}>
            {({handleSubmit}) => {
                return (
                    <View style={styles.container}>
                        <HeaderMain />

                        <FormikInputField
                            name='user'
                            placeholder='user'
                            iconName="person"
                        />
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

                        <FormikInputField
                            name='confirmPassword'
                            placeholder='Confirm Password'
                            iconName="eye"
                            secureTextEntry={true}
                        />

                        <PrimaryButton title="Registrarse" onPress={() => navigation.navigate('Home')} />
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


