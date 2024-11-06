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

    // Asegurarse de que los datos estén disponibles antes de usarlos
    const glaucomaProbability = examData ? (1 - (examData.ddlStage / 10)) * 100 : 0;
    const narrowestRimWidth = "0.2";

    if (examData) {
        examData.state = 2;
    }

    const handleImagePress = () => {
        navigation.navigate('ViewImage', { imageUri: examData.urlImage });
    };

    const getStateTextAndColor = (state) => {
        switch (state) {
            case 1:
                return { text: 'En riesgo', color: '#FF0000' }; // Rojo
            case 2:
                return { text: 'Daño por glaucoma', color: '#dfdf19' }; // Amarillo
            case 3:
                return { text: 'Discapacidad por glaucoma', color: '#00FF00' }; // Verde
            default:
                return { text: 'Estado desconocido', color: '#769BCE' }; // Negro por defecto
        }
    };

    const getDdlStageColor = (ddlStage) => {
        switch (ddlStage) {
            case 1:
                return '#FF0000'; // Rojo
            case 2:
                return '#b6b60a'; // Amarillo
            case 3:
                return '#00FF00'; // Verde
            default:
                return '#769BCE';
        }
    };

    const stateInfo = examData ? getStateTextAndColor(examData.state) : {};
    const ddlStageColor = examData ? getDdlStageColor(examData.ddlStage) : '#769BCE';

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

                console.log("mapeado URL verificacion:",mappedData?.urlImage); // Verificar la URL de la imagen

                setExamData(mappedData);

                console.log("Imagen URL verificacion:", examData?.urlImage);
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
        [<Text style={styles.boldText}>Excavación</Text>, `${examData.excavationPerimeter} mm`, `${examData.excavationArea} mm`],
        [<Text style={styles.boldText}>Nervio</Text>, `${examData.neuroretinalRimPerimeter} mm`, `${examData.neuroretinalRimArea} mm`]
    ];

    const metricRatiosHead = ['Distancia', 'Perímetro', 'Área'];
    const metricRatiosData = [
        [`${examData.distanceRatio} %`, `${examData.perimeterRatio} %`, `${examData.areaRatio} %`]
    ];

    return (
        <View style={styles.container}>
            <View style={styles.containerImage}>
                <TouchableOpacity onPress={handleImagePress} style={styles.imageWrapper}>
                    <Image source={{ uri: examData?.urlImage }} style={styles.image} />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.containerInfo}>
                    <View style={styles.iconHint}>
                        <Icon name="lightbulb" size={35} color={stateInfo.color} />
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.stageText}>Etapa DDLS <Text style={[styles.stageNumber, { color: ddlStageColor }]}>{examData.ddlStage}</Text></Text>
                        <Text style={[styles.probabilityText, { fontStyle: 'italic' }]} >
                            Severidad: <Text style={[styles.probabilityValue, { color: ddlStageColor }]}>{glaucomaProbability}%</Text>
                        </Text>
                    </View>

                    <Text style={styles.descriptionText}>
                        El Borde mas estrecho es {narrowestRimWidth}, como consecuencia, según la relación de
                        distancias el paciente posee {stateInfo.text}.
                    </Text>

                    <View style={styles.tableContainer}>
                        <Text style={styles.tableTitle}>Métricas Calculadas</Text>
                        <Table>
                            <Row data={tableHead} style={styles.tableHeader} textStyle={styles.tableHeaderText} />
                            <Rows data={tableData} textStyle={styles.tableDataText} />
                        </Table>
                    </View>

                    <View style={styles.tableContainer}>
                        <Text style={styles.tableTitle}>Relación de Métricas</Text>
                        <Table>
                            <Row data={metricRatiosHead} style={styles.tableHeader} textStyle={styles.tableHeaderText} />
                            <Rows data={metricRatiosData} textStyle={styles.tableDataText} />
                        </Table>
                    </View>

                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={confirmDeleteExam} style={styles.iconButton}>
                            <Icon name="delete" size={30} color="#769BCE" />
                            <Text style={styles.iconLabel}>Eliminar Examen</Text>
                        </TouchableOpacity>
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
    },
    iconHint: {
        marginTop: 10,
        alignSelf: 'center',
    },
    infoContainer: {
        alignItems: 'flex-start',
        marginTop: 15,
    },
    imageWrapper: {
        width: '100%',
        alignItems: 'center'
    },
    stageText: {
        fontSize: 22,
        fontFamily: 'SansationBold',


    },
    stageNumber: {
        fontSize: 22,
        fontFamily: 'SansationBold',


    },
    probabilityText: {
        fontSize: 20,
        marginTop: 5,
        fontFamily: 'SansationRegular',

    },
    probabilityValue: {
        fontSize: 20,
        fontFamily: 'SansationBold',


    },
    descriptionText: {
        fontSize: 14,
        marginTop: 15,
        paddingLeft: 15,
        textAlign: 'justify',
        borderLeftColor: '#4E4E4E',
        borderLeftWidth: 2,
        fontFamily: 'SansationRegular',

    },
    tableContainer: {
        marginTop: 30,
        width: '100%',
    },
    tableTitle: {
        fontSize: 16,
        fontFamily: 'SansationBold',
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
        fontFamily: 'SansationBold',
        color: '#333',
        textAlign: 'center',

    },
    tableDataText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        fontFamily: 'SansationRegular',

    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '50%',
        marginTop: 20,
        alignSelf: 'center',
    },
    iconButton: {
        padding: 10,
        alignItems: 'center',
    },
    iconLabel: {
        marginTop: 5,
        fontSize: 12,
        color: '#769BCE',
        fontFamily: 'SansationBold',


    },
    boldText: {
        fontFamily: 'SansationBold',
    },
});

export default PatientExamScreen;
