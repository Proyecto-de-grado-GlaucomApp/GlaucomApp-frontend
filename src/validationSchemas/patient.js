import * as yup from 'yup';
export const patientCedulaSchema = yup.object().shape({
    cedula: yup
        .number()
        .required('Ingresa una contraseña')
        .min(4, 'La cedula debe tener al menos 4 digitos'),

    name: yup
        .string()
        .required('Ingresa un nombre')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(30, 'El nombre debe tener como maximo 30 caracteres')
})