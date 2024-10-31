import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, ActivityIndicator, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getExamById, deleteExam } from "../../services/examsApi";
import { mapApiExamById } from "../../utils/mappers/examMapperApi";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Table, Row, Rows } from 'react-native-table-component';

import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

const PatientExamScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { examId, patientId } = route.params;

    const [examData, setExamData] = useState(null);
    const [loading, setLoading] = useState(true);

    const glaucomaProbability = "0.3%";
    const narrowestRimWidth = "0.2";

    const confirmDeleteExam = () => {
        Alert.alert(
            "Confirmar eliminación",
            "¿Estás seguro de que deseas borrar este examen?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sí, borrar",
                    onPress: async () => {
                        try {
                            await deleteExam(examId, patientId);
                            Alert.alert("Éxito", "Examen eliminado correctamente.");
                            navigation.goBack();
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

    // Datos de la tabla
    const tableHead = ['', 'Perímetro', 'Área'];
    const tableData = [
        [<Text style={styles.boldText}>Excavación</Text>, examData.excavationPerimeter, examData.excavationArea],
        [<Text style={styles.boldText}>Nervio</Text>, examData.neuroretinalRimPerimeter, examData.neuroretinalRimArea]
    ];

    const metricRatiosHead = ['Distancia', 'Perímetro', 'Área'];
    const metricRatiosData = [
        [examData.distanceRatio, examData.perimeterRatio, examData.areaRatio]
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity style={styles.deleteIcon} onPress={confirmDeleteExam}>
                    <Icon name="delete-outline" size={28} color="#769BCE" />
                </TouchableOpacity>

                <View style={styles.containerImage}>
                    <Image source={{ uri: examData?.urlImage }} style={styles.image} />
                </View>

                <View style={styles.containerInfo}>
                    <View style={styles.iconHint}>
                        <Icon name="lightbulb" size={30} color="#6ABB6E" />
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.stageText}>Etapa DDLS <Text style={styles.stageNumber}>{examData.ddlStage}</Text></Text>
                        <Text style={styles.probabilityText}>Probabilidad de glaucoma: <Text style={styles.probabilityValue}>{glaucomaProbability}</Text></Text>
                    </View>

                    <Text style={styles.descriptionText}>
                        El narrowest rim width es {narrowestRimWidth}, como consecuencia, según la relación de
                        distancias el paciente posee {examData.state} riesgo.
                    </Text>

                    {/* Tabla de métricas calculadas */}
                    <View style={styles.tableContainer}>
                        <Text style={styles.tableTitle}>Métricas Calculadas (mm)</Text>
                        <Table>
                            <Row data={tableHead} style={styles.tableHeader} textStyle={styles.tableHeaderText} />
                            <Rows data={tableData} textStyle={styles.tableDataText} />
                        </Table>
                    </View>

                    {/* Tabla de relación de métricas */}
                    <View style={styles.tableContainer}>
                        <Text style={styles.tableTitle}>Relación de Métricas (%)</Text>
                        <Table>
                            <Row data={metricRatiosHead} style={styles.tableHeader} textStyle={styles.tableHeaderText} />
                            <Rows data={metricRatiosData} textStyle={styles.tableDataText} />
                        </Table>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    deleteIcon: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1,
    },
    containerImage: {
        alignItems: 'center',
        width: '100%',
    },
    containerInfo: {
        width: '90%',
        paddingHorizontal: 10,
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    iconHint: {
        marginTop: 10,
        alignSelf: 'center',
    },
    infoContainer: {
        alignItems: 'flex-start',
        marginTop: 15,
    },
    stageText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    stageNumber: {
        color: '#4C7A0B',
    },
    probabilityText: {
        fontSize: 16,
        marginTop: 5,
    },
    probabilityValue: {
        color: '#4C7A0B',
    },
    descriptionText: {
        fontSize: 14,
        marginTop: 10,
        paddingLeft: 15,
        textAlign: 'justify',
        borderLeftColor: '#4E4E4E',
        borderLeftWidth: 2,
    },
    tableContainer: {
        marginTop: 20,
        width: '100%',
    },
    tableTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 5,
        borderBottomWidth: 2,
        borderColor: '#4E4E4E',
    },
    tableHeader: {
        height: 40,
        backgroundColor: '#ffffff',
    },
    tableHeaderText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    tableDataText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    boldText: {
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
});

export default PatientExamScreen;
