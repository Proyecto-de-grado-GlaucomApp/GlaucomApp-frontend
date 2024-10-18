// ResultScreen.js
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { mapApiResponseToViewData } from '../../utils/dataMapper';
import DataDisplay from "../../components/home/DataDisplay";

const ResultScreen = () => {
    const route = useRoute();
    const responseData = route.params?.responseData;

    const viewData = mapApiResponseToViewData(responseData);

    return (
        <View style={styles.container}>
            <Image source={{ uri: viewData?.imageUrl }} style={styles.logo} />

            <View style={styles.dataContainer}>
                <DataDisplay title="Diagnóstico:" value={viewData.diagnosticMessage} />
                <DataDisplay title="Porcentaje de glaucoma:" value={`${viewData.glaucomaLikelihoodPercentage}%`} />
                <DataDisplay title="Estado:" value={viewData.ddlsStage} />
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

export default ResultScreen;
