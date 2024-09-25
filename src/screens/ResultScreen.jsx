import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ResultScreen = () => {
    const route = useRoute();
    const { responseData } = route.params || {};

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/img.png')} style={styles.logo} />

            {responseData ? (
                <View style={styles.dataContainer}>
                    <Text style={styles.title}>Descripción:</Text>
                    <Text style={styles.dataText}>{responseData.descripcion}</Text>

                    <Text style={styles.title}>Porcentaje del semáforo:</Text>
                    <Text style={styles.dataText}>{responseData.porcentaje_semaforo}%</Text>

                    <Text style={styles.title}>Áreas:</Text>
                    {responseData.areas.map((area, index) => (
                        <Text key={index} style={styles.dataText}>
                            {area.nombre}: {area.valor}
                        </Text>
                    ))}

                    <Text style={styles.title}>Perímetros:</Text>
                    {responseData.perimetro.map((perimetro, index) => (
                        <Text key={index} style={styles.dataText}>
                            {perimetro.nombre}: {perimetro.valor}
                        </Text>
                    ))}

                    <Text style={styles.dataText}>Tiempo de procesamiento: {responseData.processing_time.toFixed(2)} segundos</Text>
                </View>
            ) : (
                <Text>No se recibieron datos.</Text>
            )}
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
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    dataContainer: {
        marginTop: 20,
        alignItems: 'center',
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
