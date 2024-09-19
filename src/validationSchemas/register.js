import * as yup from "yup";

export const registerSchema = yup.object().shape({
    user: yup
        .string()
        .required('Ingresa un usuario'),
    email: yup
        .string()
        .email('Ingresa un correo valido')
        .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Ingresa un correo valido')
        .required('Ingresa un correo'),
    password: yup
        .string()
        .required('Ingresa una contraseña')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(16, 'La contraseña debe tener como maximo 16 caracteres')
        .matches(/[a-z]/, 'La contraseña debe tener al menos una minuscula')
        .matches(/[A-Z]/, 'La contraseña debe tener al menos una mayuscula')
        .matches(/[0-9]/, 'La contraseña debe tener al menos un número')
        .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'La contraseña debe tener al menos un caracter especial'),
    confirmPassword: yup
        .string()
        .required('Confirma tu contraseña')
        .oneOf([yup.ref('password')], 'Las contraseña no coinciden'),
})