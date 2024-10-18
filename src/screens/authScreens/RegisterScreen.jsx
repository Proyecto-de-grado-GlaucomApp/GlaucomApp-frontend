import React from 'react';
import {StyleSheet, View} from 'react-native';
import PrimaryButton from '../../components/shared/PrimaryButton';
import InputField from '../../components/auth/InputField';
import LogoHeader from "../../components/auth/LogoHeader";
import TextLink from "../../components/auth/TextLink";
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
                        <LogoHeader />

                        <InputField
                            name='user'
                            placeholder='user'
                            iconName="person"
                        />
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

                        <InputField
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


