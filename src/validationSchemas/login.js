import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    username: yup
        .string()
        .email('Ingresa un correo valido')
        .required('Ingresa un correo'),
    password: yup
        .string()
        .required('Ingresa una contraseña'),
})