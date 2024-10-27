import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getExamById, deleteExam } from "../../services/examsApi";
import { mapApiExamById } from "../../utils/mappers/examMapperApi";
import DataDisplay from "../../components/home/DataDisplay";

const PatientExamScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { examId, patientId } = route.params;

    const [examData, setExamData] = useState(null);
    const [loading, setLoading] = useState(true);

    const confirmDeleteExam = () => {
        Alert.alert(
            "Confirmar eliminación",
            "¿Estás seguro de que deseas borrar este examen?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sí, borrar",
                    onPress: async () => {
                        try {
                            await deleteExam(examId, patientId);
                            Alert.alert("Éxito", "Examen eliminado correctamente.");
                            navigation.goBack( );
                        } catch (error) {
                            console.error('Error deleting exam:', error);
                            Alert.alert("Error", "No se pudo eliminar el examen.");
                        }
                    }
                }
            ]
        );
    };

    useEffect(() => {
        const fetchExamData = async () => {
            try {
                const response = await getExamById(examId, patientId);
                const mappedData = mapApiExamById(response);
                setExamData(mappedData);
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

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.deleteIcon} onPress={confirmDeleteExam}>
                <Icon name="delete-outline" size={28} color="#769BCE" />
            </TouchableOpacity>

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
    deleteIcon: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1,
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
