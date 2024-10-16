import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { mapApiResponseToViewData } from '../../utils/dataMapper';

const ResultScreen = () => {
    const route = useRoute();
    const responseData = route.params?.responseData;

    const viewData = mapApiResponseToViewData(responseData);

    return (
        <View style={styles.container}>
            <Image source={{ uri: viewData?.imageUrl }} style={styles.logo} />

            <View style={styles.dataContainer}>
                <Text style={styles.title}>Diagnostico:</Text>
                <Text style={styles.dataText}>{viewData.diagnosticMessage}</Text>

                <Text style={styles.title}>Porcentaje de glaucoma:</Text>
                <Text style={styles.dataText}>{viewData.glaucomaLikelihoodPercentage}%</Text>

                <Text style={styles.title}>Estado:</Text>
                <Text style={styles.dataText}>{viewData.ddlsStage}</Text>

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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dataText: {
        fontSize: 16,
        marginBottom: 5,
    },
});
export default ResultScreen;
