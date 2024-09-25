import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Alert} from 'react-native';
import PrimaryButton from "../components/PrimaryButton";
import * as FileSystem from 'expo-file-system';

const AnalyzeScreen = ({route, navigation}) => {
    const {imageUri} = route.params;
    const [localImageUri, setLocalImageUri] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const downloadImage = async () => {
            try {
                if (imageUri && (imageUri.startsWith('http://') || imageUri.startsWith('https://'))) {
                    // Ruta donde se almacenará la imagen descargada
                    const fileUri = FileSystem.documentDirectory + 'downloadedImage.jpg';
                    const {uri} = await FileSystem.downloadAsync(imageUri, fileUri);
                    setLocalImageUri(uri); // Guarda la URI del archivo descargado
                } else {
                    setLocalImageUri(imageUri); // Usa la URI proporcionada si no es una URL
                }
            } catch (error) {
                console.error('Error downloading image:', error);
                Alert.alert('Error', 'No se pudo descargar la imagen.');
            } finally {
                setLoading(false); // Marca la carga como completada
            }
        };

        downloadImage();
    }, [imageUri]);

    const handlePress = () => {
        if (localImageUri) {
            navigation.navigate('Loading', {uri: localImageUri});
        } else {
            Alert.alert('No image URI provided');
        }
    };

    // Mostrar un mensaje de carga si la imagen aún no está disponible
    if (loading) {
        Alert.alert('Cargando imagen...', 'La imagen está siendo cargada. Por favor, espera.');
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {localImageUri ? (
                    <Image
                        source={{uri: localImageUri}}
                        style={styles.image}
                    />) : (
                    <View style={styles.image}/> // En lugar de marcador de posición, solo deja el contenedor vacío
                )}
            </View>

            <View style={styles.buttonContainer}>
                <PrimaryButton title="Realizar análisis" onPress={handlePress}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 50,
    },
    imageContainer: {
        width: '100%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    buttonContainer: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
    },
});

export default AnalyzeScreen;