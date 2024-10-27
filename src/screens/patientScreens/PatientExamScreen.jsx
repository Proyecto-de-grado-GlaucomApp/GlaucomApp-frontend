import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getExamById } from "../../services/examsApi";
import { mapApiExamById } from "../../utils/mappers/examMapperApi";
import DataDisplay from "../../components/home/DataDisplay";

const PatientExamScreen = () => {
    const route = useRoute();
    const { examId, patientId } = route.params;

    const [examData, setExamData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExamData = async () => {
            try {
                const response = await getExamById(examId, patientId);
                console.log("API response:", response); // Verifica los datos obtenidos de la API

                const mappedData = mapApiExamById(response);
                console.log("Mapped exam data:", mappedData); // Verifica los datos después de mapeo

                setExamData(mappedData); // Cambié `mappedData.exams` a `mappedData` si es un objeto directo
            } catch (error) {
                console.error("Error fetching exam data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExamData();
    }, [examId, patientId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    console.log("Exam data state:", examData);

    return (
        <View style={styles.container}>
            <Image source={{ uri: examData?.urlImage }} style={styles.logo} />
            <View style={styles.dataContainer}>
                <DataDisplay title="Relación de distancias:" value={examData?.distanceRatio} />
                <DataDisplay title="Relación de perímetros:" value={`${examData?.perimeterRatio}%`} />
                <DataDisplay title="Relación de áreas:" value={examData?.areaRatio} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 20,
    },
    dataContainer: {
        marginTop: 20,
        alignItems: 'flex-start',
    },
});

export default PatientExamScreen;
