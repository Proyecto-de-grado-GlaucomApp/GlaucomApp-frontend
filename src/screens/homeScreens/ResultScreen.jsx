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
            <Image source={{ uri: viewData?.imagen }} style={styles.logo} />

            <View style={styles.dataContainer}>
                <Text style={styles.title}>Descripción:</Text>
                <Text style={styles.dataText}>{viewData.descripcion}</Text>

                <Text style={styles.title}>Porcentaje del semáforo:</Text>
                <Text style={styles.dataText}>{viewData.porcentaje_semaforo}%</Text>

                <Text style={styles.title}>Áreas:</Text>
                {viewData.areas.map((area, index) => (
                    <Text key={index} style={styles.dataText}>
                        {area.nombre}: {area.valor}
                    </Text>
                ))}

                <Text style={styles.title}>Perímetros:</Text>
                {viewData.perimetro.map((perimetro, index) => (
                    <Text key={index} style={styles.dataText}>
                        {perimetro.nombre}: {perimetro.valor}
                    </Text>
                ))}

                <Text style={styles.dataText}>Tiempo de procesamiento: {viewData.processing_time.toFixed(2)} segundos</Text>
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
