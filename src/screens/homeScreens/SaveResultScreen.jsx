import React, {useState} from 'react';
import {View, Text, TextInput, Alert, StyleSheet} from 'react-native';
import PrimaryButton from "../../components/shared/PrimaryButton";
import {getPatientByCedula, savePatient} from "../../services/patientsApi";
import {saveExam} from "../../services/examsApi";
import * as yup from 'yup';

const patientSchema = yup.object().shape({
    cedula: yup
        .string()
        .required('Ingresa una cédula')
        .min(4, 'La cédula debe tener al menos 4 dígitos'),

    name: yup
        .string()
        .required('Ingresa un nombre')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(30, 'El nombre debe tener como máximo 30 caracteres')
});

const examSchema = yup.object().shape({
    name: yup
        .string()
        .required('Ingresa un nombre')
        .min(3, 'El nombre debe tener al menos 4 caracteres')
        .max(30, 'El nombre debe tener como máximo 30 caracteres')
});

const SaveResultScreen = ({navigation, route}) => {
    const [cedula, setCedula] = useState('');
    const [nombrePaciente, setNombrePaciente] = useState('');
    const [examenNombre, setExamenNombre] = useState('');
    const [pacienteExistente, setPacienteExistente] = useState(null);
    const [showNombreField, setShowNombreField] = useState(false);
    const [errors, setErrors] = useState({});

    const {imageId, distanceRatio, perimeterRatio, areaRatio, neuroretinalRimPerimeter, neuroretinalRimArea, excavationPerimeter, excavationArea, state, ddlStage} = route.params;

    // Validar campos usando Yup
    const validateField = async (field, value) => {
        try {
            await patientSchema.validateAt(field, {[field]: value});
            setErrors((prevErrors) => ({...prevErrors, [field]: ''}));
        } catch (error) {
            setErrors((prevErrors) => ({...prevErrors, [field]: error.message}));
        }
    };

    const verificarPaciente = async () => {

        if (!cedula.trim()) {
            Alert.alert("Error", "Por favor, ingresa una cédula.");
            return;
        }

        await validateField('cedula', cedula);
        if (errors.cedula) return;

        try {
            const response = await getPatientByCedula(cedula);
            if (response && response.PacinetId) {
                setPacienteExistente(true);
                Alert.alert("Paciente encontrado", "Puedes proceder a guardar el examen.");
            } else {
                setPacienteExistente(false);
                Alert.alert("Paciente no encontrado", "¿Quieres crear un nuevo paciente?", [
                    {text: "No", onPress: () => setShowNombreField(false), style: "cancel"},
                    {text: "Si", onPress: () => setShowNombreField(true)}
                ]);
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo verificar el paciente.");
        }
    };

    const crearPaciente = async () => {
        if (!nombrePaciente.trim()) {
            Alert.alert("Error", "Por favor, ingresa el nombre del paciente.");
            return;
        }

        await validateField('name', nombrePaciente);
        if (errors.name) return;

        try {
            const response = await savePatient({name: nombrePaciente, cedula});
            Alert.alert("Paciente creado", response.message || "El paciente se ha creado exitosamente.");
            setPacienteExistente(true);
            setShowNombreField(false);
        } catch (error) {
            Alert.alert("Error", "No se pudo crear el paciente.");
        }
    };

    const guardarExamen = async () => {

        if (!pacienteExistente) {
            Alert.alert("Error", "Primero debes crear o verificar un paciente.");
            return;
        }

        if (!examenNombre.trim()) {
            Alert.alert("Error", "Por favor, ingresa nombre para el examen.");
            return;
        }


        try {
            const result = await saveExam({
                cedula,
                name: examenNombre,
                urlImage: imageId,
                distanceRatio,
                perimeterRatio,
                areaRatio,
                neuroretinalRimPerimeter,
                neuroretinalRimArea,
                excavationPerimeter,
                excavationArea,
                state,
                ddlStage
            });
            Alert.alert("Examen guardado", "El examen ha sido guardado exitosamente.");
            navigation.navigate("Home");
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar el examen.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Cédula del paciente:</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa la cédula"
                value={cedula}
                onChangeText={(value) => {
                    setCedula(value);
                    validateField('cedula', value);
                }}
                keyboardType="numeric"
            />
            {errors.cedula && <Text style={styles.errorText}>{errors.cedula}</Text>}

            <PrimaryButton title="Verificar Paciente" onPress={verificarPaciente}/>

            {showNombreField && (
                <>
                    <Text style={styles.label}>Nombre del nuevo paciente:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa el nombre"
                        value={nombrePaciente}
                        onChangeText={(value) => {
                            setNombrePaciente(value);
                            validateField('name', value);
                        }}
                    />
                    {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                    <PrimaryButton title="Guardar Paciente" onPress={crearPaciente}/>
                </>
            )}

            <Text style={styles.label}>Nombre del examen:</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa el nombre del examen"
                value={examenNombre}
                onChangeText={setExamenNombre}
            />

            <PrimaryButton
                title="Guardar Examen"
                onPress={guardarExamen}
                disabled={!pacienteExistente}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    errorText: {
        color: '#769BCE',
        fontSize: 14,
        marginTop: 5,
    },
});

export default SaveResultScreen;
