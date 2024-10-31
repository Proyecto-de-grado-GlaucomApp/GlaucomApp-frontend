import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getPatients} from '../../services/patientsApi';
import {useBackHome} from '../../hooks/useBackHome';
import LoadingIndicator from "../../components/shared/LoadingIndicator";
import PatientList from "../../components/patient/PatientList";
import {mapApiPatients} from "../../utils/mappers/patientMapperApi";
import MainHeader from "../../components/shared/MainHeader";

const PatientScreen = ({navigation}) => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [hasMorePatients, setHasMorePatients] = useState(true);
    const batchSize = 15;

    useBackHome(navigation);

    const fetchPatients = async () => {
        if (!hasMorePatients) return;

        setLoadingMore(true);
        try {
            const response = await getPatients(startIndex, startIndex + batchSize);
            console.log('API Response:', response);
            const mappedPatients = mapApiPatients(response);
            console.log('Mapped Patients:', mappedPatients);

            if (mappedPatients.patients.length < batchSize) {
                setHasMorePatients(false);
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

            setPatients([]);
            setStartIndex(0);
            setLoading(true);
            setHasMorePatients(true);
            fetchPatients();
        }, [])
    );

    const handlePress = async (patientId, patientName, patientCedula) => {
        try {
            console.log('Patient ID:', patientId);
            console.log('Patient Name:', patientName);
            console.log('Patient Cedula:', patientCedula);
            navigation.navigate('PatientDetail', {
                patientId: patientId,
                patientName: patientName,
                patientCedula: patientCedula
            });

        } catch (error) {
            console.error('Error navigating to patient details:', error);
        }
    };


    const handleLoadMore = () => {
        if (!loadingMore && hasMorePatients) {
            fetchPatients();
        }
    };

    return (
        <View style={styles.containerHeader}>
            <MainHeader title="Lista de datos" subtitle="Pacientes"/>
            <View style={styles.containerInfo}>

                {loading ? (
                    <LoadingIndicator message="Cargando pacientes..."/>
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
        </View>
    );
};

const styles = StyleSheet.create({
    containerHeader: {
        flex: 1,
    },
    containerInfo: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
});

export default PatientScreen;
