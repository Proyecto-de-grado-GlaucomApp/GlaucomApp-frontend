import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getPatients, getPatientById } from '../../services/patientsApi';
import { useBackHome } from '../../hooks/useBackHome';
import LoadingIndicator from "../../components/shared/LoadingIndicator";
import PatientList from "../../components/patient/PatientList";
import { mapApiPatients, mapApiPatientsById } from "../../utils/mappers/patientMapperApi";

const PatientScreen = ({ navigation }) => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [hasMorePatients, setHasMorePatients] = useState(true); // Estado para controlar si hay más pacientes
    const batchSize = 15;

    useBackHome(navigation);

    const fetchPatients = async () => {
        if (!hasMorePatients) return; // Evitar la carga si no hay más pacientes

        setLoadingMore(true);
        try {
            const response = await getPatients(startIndex, startIndex + batchSize);
            console.log('API Response:', response); // Log para verificar los datos
            const mappedPatients = mapApiPatients(response);
            console.log('Mapped Patients:', mappedPatients); // Log para verificar el mapeo

            if (mappedPatients.patients.length < batchSize) {
                setHasMorePatients(false); // No hay más pacientes por cargar
            }

            setPatients(prevPatients => [...prevPatients, ...mappedPatients.patients]);
            setStartIndex(prevIndex => prevIndex + batchSize);
        } catch (error) {
            console.error('Error fetching patients:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            // Cada vez que la pantalla se enfoque, reinicia la lista y vuelve a cargar
            setPatients([]);
            setStartIndex(0);
            setLoading(true);
            setHasMorePatients(true); // Reiniciar el estado de más pacientes
            fetchPatients();
        }, [])
    );

    const handlePress = async (patientId) => {
        try {
            const response = await getPatientById(patientId);
            const mappedPatient = mapApiPatientsById(response);
            navigation.navigate('PatientDetail', { patient: mappedPatient });
        } catch (error) {
            console.error('Error fetching patient details:', error);
        }
    };

    const handleLoadMore = () => {
        if (!loadingMore && hasMorePatients) { // Solo cargar más si hay más pacientes
            fetchPatients();
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <LoadingIndicator message="Cargando pacientes..." />
            ) : (
                <PatientList
                    patients={patients}
                    onPatientPress={handlePress}
                    onEndReached={handleLoadMore}
                    loadingMore={loadingMore}
                    loadingMoreMessage="Cargando más pacientes..."
                />
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
