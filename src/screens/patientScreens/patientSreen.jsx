import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { getPatients, getPatientById } from '../../services/patients/getApi';
import { mapApiPatients, mapApiPatientsById } from '../../utils/dataMapper';
import { useBackHome } from '../../hooks/useBackHome';
import LoadingIndicator from "../../components/shared/LoadingIndicator";
import PatientList from "../../components/patient/PatientList";

const PatientScreen = ({ navigation }) => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useBackHome(navigation);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await getPatients();
                const mappedPatients = mapApiPatients(response);
                setPatients(mappedPatients.patients);
            } catch (error) {
                console.error('Error fetching patients:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    const handlePress = async (patientId) => {
        try {
            const response = await getPatientById(patientId);
            const mappedPatient = mapApiPatientsById(response);
            navigation.navigate('PatientDetail', { patient: mappedPatient });
        } catch (error) {
            console.error('Error fetching patient details:', error);
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <LoadingIndicator text="Cargando pacientes..." />
            ) : (
                <PatientList patients={patients} onPatientPress={handlePress} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
});

export default PatientScreen;
