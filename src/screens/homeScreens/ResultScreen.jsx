import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {mapApiProcessImage} from "../../utils/mappers/ImageMapperApi";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Table, Row, Rows} from 'react-native-table-component';

const ResultScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const responseData = route.params?.responseData;

    const viewData = mapApiProcessImage(responseData);

    const glaucomaProbability = "0.3%";
    const narrowestRimWidth = "0.2";

    const handleSave = () => {
        navigation.navigate('SaveResult', {
            imageId: viewData.imageId,
            distanceRatio: viewData.distanceRatio,
            perimeterRatio: viewData.perimeterRatio,
            areaRatio: viewData.areaRatio,
            neuroretinalRimPerimeter: viewData.neuroretinalRimPerimeter,
            neuroretinalRimArea: viewData.neuroretinalRimArea,
            excavationPerimeter: viewData.excavationPerimeter,
            excavationArea: viewData.excavationArea,
            state: viewData.state,
            ddlStage: viewData.ddlStage
        });
    };

    const handleDiscard = () => {
        navigation.navigate('Home');
    };

    // Datos de la tabla
    const tableHead = ['', 'Perímetro', 'Área'];
    const tableData = [
        [<Text style={styles.boldText}>Excavación</Text>, viewData.excavationPerimeter, viewData.excavationArea],
        [<Text style={styles.boldText}>Nervio</Text>, viewData.neuroretinalRimPerimeter, viewData.neuroretinalRimArea]
    ];

    const metricRatiosHead = ['Distancia', 'Perímetro', 'Área'];
    const metricRatiosData = [
        [viewData.distanceRatio, viewData.perimeterRatio, viewData.areaRatio]
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.containerImage}>
                    <Image source={{uri: viewData?.imageUrl}} style={styles.image}/>
                </View>

                <View style={styles.containerInfo}>
                    <View style={styles.iconHint}>
                        <Icon name="lightbulb" size={30} color="#6ABB6E"/>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.stageText}>Etapa DDLS <Text
                            style={styles.stageNumber}>{viewData.ddlStage}</Text></Text>
                        <Text style={styles.probabilityText}>Probabilidad de glaucoma: <Text
                            style={styles.probabilityValue}>{glaucomaProbability}</Text></Text>
                    </View>

                    <Text style={styles.descriptionText}>
                        El narrowest rim width es {narrowestRimWidth}, como consecuencia, según la relación de
                        distancias el paciente posee {viewData.state} riesgo.
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
                            <Row data={metricRatiosHead} style={styles.tableHeader} textStyle={styles.tableHeaderText}/>
                            <Rows data={metricRatiosData} textStyle={styles.tableDataText}/>
                        </Table>
                    </View>

                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={handleSave} style={styles.iconButton}>
                            <Icon name="save" size={30} color="#769BCE"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDiscard} style={styles.iconButton}>
                            <Icon name="cancel" size={30} color="#769BCE"/>
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
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '50%',
        marginTop: 20,
        alignSelf: 'center',
    },
    iconButton: {
        padding: 10,
    },
    boldText: {
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
});

export default ResultScreen;
