import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import PrimaryButton from "../../components/shared/PrimaryButton";
import { downloadImage } from '../../utils/imageService';
import ImageDisplay from "../../components/home/ImageDisplay";

const AnalyzeScreen = ({ route, navigation }) => {
    const { imageUri } = route.params;
    const [localImageUri, setLocalImageUri] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        downloadImage(imageUri, setLocalImageUri, setLoading);
    }, [imageUri]);


    /*
    useEffect(() => {
        setLoading(true); // Asegúrate de que loading esté en true al comenzar
        downloadImage(imageUri, setLocalImageUri, setLoading)
            .then(() => {
                setLoading(false); // Se completó la descarga
            })
            .catch((error) => {
                setLoading(false); // Se completó la descarga con error
                Alert.alert('Error', 'Hubo un problema al descargar la imagen.');
            });
    }, [imageUri]);
    */

    const handlePress = () => {
        if (localImageUri) {
            navigation.navigate('Loading', { uri: localImageUri });
        } else {
            Alert.alert('No image URI provided');
        }
    };

    if (loading) {
        Alert.alert('Cargando imagen...', 'La imagen está siendo cargada. Por favor, espera.');
    }

    return (
        <View style={styles.container}>
            <ImageDisplay imageUri={localImageUri} />
            <View style={styles.buttonContainer}>
                <PrimaryButton title="Realizar análisis" onPress={handlePress} />
                <PrimaryButton title="Seleccionar otra imagen" onPress={() => navigation.goBack()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
    },
});

export default AnalyzeScreen;
