import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { postApiLocal } from "../services/upload";
import { MaterialIcons } from '@expo/vector-icons';

const LoadingScreen = ({ navigation }) => {
    const route = useRoute();
    const { uri } = route.params || {};
    const [loading, setLoading] = useState(true);
    const successRef = useRef(null); // Usar useRef para mantener el valor de success

    useEffect(() => {
        if (uri) {
            (async () => {
                await loadRequest(uri);
            })();
        }
    }, [uri]);

    const loadRequest = async (imageUri) => {
        try {
            const respuesta = await postApiLocal(imageUri);
            console.log('Respuesta del servidor:', respuesta);
            // Verifica si hay una imagen en la respuesta
            if (respuesta && respuesta.data) {
                successRef.current = true; // Actualiza el valor de referencia
                console.log('Entro aqui True');
            } else {
                successRef.current = false; // Actualiza el valor de referencia
                console.log('Entro aqui False');
            }
        } catch (error) {
            console.log('Error al enviar la imagen:', error);
            successRef.current = false; // Actualiza el valor de referencia
        } finally {
            setLoading(false);
            setTimeout(() => {
                const success = successRef.current; // Lee el valor actualizado de success
                console.log('success:', success);
                if (success === true) {
                    Alert.alert('Éxito', 'La imagen se procesó correctamente.', [{ text: 'OK', onPress: () => navigation.navigate('Result') }]);
                } else {
                    Alert.alert('Error', 'No se pudo procesar la imagen.', [{ text: 'OK', onPress: () => navigation.navigate('Home') }]);
                }
            }, 3000);
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Procesando imagen...</Text>
                </View>
            ) : (
                <View style={styles.resultContainer}>
                    {successRef.current === true ? (
                        <MaterialIcons name="check-circle" size={50} color="green" />
                    ) : (
                        <MaterialIcons name="cancel" size={50} color="red" />
                    )}
                    <Text>{successRef.current === true ? 'Imagen procesada correctamente.' : 'Error al procesar la imagen.'}</Text>
                </View>
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
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoadingScreen;
