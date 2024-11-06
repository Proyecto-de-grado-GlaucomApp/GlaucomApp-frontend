import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Table, Row, Rows } from 'react-native-table-component';
import { mapApiProcessImage } from "../../utils/mappers/ImageMapperApi";

const ResultScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const responseData = route.params?.responseData;

    const viewData = mapApiProcessImage(responseData);

    viewData.state = 2; // Simulando el estado para pruebas

    console.log('Estado recibido en ResultScreen:', responseData);

    const glaucomaProbability = (1 - (viewData.ddlStage/10)) * 100;
    const narrowestRimWidth = "0.2";

    const handleImagePress = () => {
        navigation.navigate('ViewImage', { imageUri: viewData.imageUrl });
    };

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

    const stateInfo = getStateTextAndColor(viewData.state);
    const ddlStageColor = getDdlStageColor(viewData.ddlStage);


    const tableHead = ['', 'Perímetro', 'Área'];
    const tableData = [
        [<Text style={styles.boldText}>Excavación</Text>, `${viewData.excavationPerimeter} mm`, `${viewData.excavationArea} mm`],
        [<Text style={styles.boldText}>Nervio</Text>, `${viewData.neuroretinalRimPerimeter} mm`, `${viewData.neuroretinalRimArea} mm`]
    ];

    const metricRatiosHead = ['Distancia', 'Perímetro', 'Área'];
    const metricRatiosData = [
        [`${viewData.distanceRatio} %`, `${viewData.perimeterRatio} %`, `${viewData.areaRatio} %`]
    ];

    return (
        <View style={styles.container}>
            <View style={styles.containerImage}>
                <TouchableOpacity onPress={handleImagePress} style={styles.imageWrapper}>
                    <Image source={{ uri: viewData?.imageUrl }} style={styles.image} />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.containerInfo}>
                    <View style={styles.iconHint}>
                        <Icon name="lightbulb" size={35} color={stateInfo.color} />
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.stageText}>Etapa DDLS <Text style={[styles.stageNumber, { color: ddlStageColor }]}>{viewData.ddlStage}</Text></Text>
                        <Text style={[styles.probabilityText, { fontStyle: 'italic' }]}>
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
                        <TouchableOpacity onPress={handleSave} style={styles.iconButton}>
                            <Icon name="save" size={30} color="#769BCE" />
                            <Text style={styles.iconLabel}>Guardar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDiscard} style={styles.iconButton}>
                            <Icon name="cancel" size={30} color="#769BCE" />
                            <Text style={styles.iconLabel}>Descartar</Text>
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
        resizeMode: 'contain'
    },
    imageWrapper: {
        width: '100%',
        alignItems: 'center'
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
        fontSize: 22,
        fontWeight: 'bold',
    },
    stageNumber: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    probabilityText: {
        fontSize: 20,
        marginTop: 5,
    },
    probabilityValue: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    descriptionText: {
        fontSize: 14,
        marginTop: 15, // Aumentado
        paddingLeft: 15,
        textAlign: 'justify',
        borderLeftColor: '#4E4E4E',
        borderLeftWidth: 2,
    },
    tableContainer: {
        marginTop: 30, // Aumentado
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
        alignItems: 'center',
    },
    iconLabel: {
        marginTop: 5,
        fontSize: 12,
        color: '#769BCE',
        fontWeight: 'bold',
    },
    boldText: {
        fontWeight: 'bold',
    }
});

export default ResultScreen;
