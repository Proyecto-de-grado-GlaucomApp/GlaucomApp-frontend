import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ResultScreen = () => {
    const route = useRoute();
    const { responseData } = route.params || {}; // Obtener los datos de la respuesta

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/img.png')} style={styles.logo} />

            {responseData ? (
                <View style={styles.dataContainer}>
                    <Text style={styles.title}>Resultados del procesamiento:</Text>
                    <Text style={styles.dataText}>Algoritmo Uno - X: {responseData.variables_uno.x}</Text>
                    <Text style={styles.dataText}>Algoritmo Uno - Y: {responseData.variables_uno.y}</Text>
                    <Text style={styles.dataText}>Algoritmo Uno - Radio: {responseData.variables_uno.radius}</Text>

                    <Text style={styles.dataText}>Algoritmo Dos - X: {responseData.variables_dos.x}</Text>
                    <Text style={styles.dataText}>Algoritmo Dos - Y: {responseData.variables_dos.y}</Text>
                    <Text style={styles.dataText}>Algoritmo Dos - Radio: {responseData.variables_dos.radius}</Text>

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
