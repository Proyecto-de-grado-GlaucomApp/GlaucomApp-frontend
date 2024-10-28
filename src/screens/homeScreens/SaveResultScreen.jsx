import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import PrimaryButton from "../../components/shared/PrimaryButton";
import { getPatientByCedula, savePatient } from "../../services/patientsApi";
import { mapApiPatientsCedula } from "../../utils/mappers/patientMapperApi";

const SaveResultScreen = ({ navigation }) => {
    const [cedula, setCedula] = useState('');
    const [nombrePaciente, setNombrePaciente] = useState('');
    const [examenNombre, setExamenNombre] = useState('');
    const [pacienteExistente, setPacienteExistente] = useState(null);
    const [showNombreField, setShowNombreField] = useState(false);

    // Verificar si el paciente existe en el sistema
    const verificarPaciente = async () => {
        try {
            const response = await getPatientByCedula(cedula);

            // Verifica si la respuesta contiene un paciente
            if (response && response.PacinetId) {
                setPacienteExistente(true);
                Alert.alert("Paciente encontrado", "Puedes proceder a guardar el examen.");
            } else {
                setPacienteExistente(false);
                Alert.alert(
                    "Paciente no encontrado",
                    "¿Quieres crear un nuevo paciente?",
                    [
                        { text: "Cancelar", onPress: () => setShowNombreField(false), style: "cancel" },
                        { text: "OK", onPress: () => setShowNombreField(true) }
                    ]
                );
            }
        } catch (error) {
            console.error("Error verificando paciente:", error);
            if (error.response?.status === 404) {
                setPacienteExistente(false);
                Alert.alert(
                    "Paciente no encontrado",
                    "¿Quieres crear un nuevo paciente?",
                    [
                        { text: "Cancelar", onPress: () => setShowNombreField(false), style: "cancel" },
                        { text: "OK", onPress: () => setShowNombreField(true) }
                    ]
                );
            } else {
                Alert.alert("Error", "No se pudo verificar el paciente.");
            }
        }
    };


    // Crear un nuevo paciente en caso de no existencia
    const crearPaciente = async () => {
        try {
            const response = await savePatient({ name: nombrePaciente, cedula });
            Alert.alert("Paciente creado", response.message || "El paciente se ha creado exitosamente.");
            setPacienteExistente(true);
            setShowNombreField(false);
        } catch (error) {
            console.error("Error creando paciente:", error);
            Alert.alert("Error", "No se pudo crear el paciente.");
        }
    };

    // Guardar el examen del paciente
    const guardarExamen = () => {
        if (!pacienteExistente) {
            Alert.alert("Error", "Primero debes crear o verificar un paciente.");
            return;
        }
        Alert.alert("Examen guardado", "El examen ha sido guardado exitosamente.");
        navigation.navigate("Home");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Cédula del paciente:</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa la cédula"
                value={cedula}
                onChangeText={setCedula}
                keyboardType="numeric"
            />
            <PrimaryButton title="Verificar Paciente" onPress={verificarPaciente} />

            {showNombreField && (
                <>
                    <Text style={styles.label}>Nombre del nuevo paciente:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa el nombre"
                        value={nombrePaciente}
                        onChangeText={setNombrePaciente}
                    />
                    <PrimaryButton title="Guardar Paciente" onPress={crearPaciente} />
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
                disabled={!pacienteExistente} // Deshabilita si no hay paciente verificado
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
});

export default SaveResultScreen;
