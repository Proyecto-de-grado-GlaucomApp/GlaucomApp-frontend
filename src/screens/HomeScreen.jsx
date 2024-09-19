import React, { useState } from 'react';
import { View, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Header from '../components/Header';
import SelectionButton from '../components/SelectionButton';

const HomeScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    // Función para seleccionar imagen desde la galería
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permiso requerido", "Necesitas habilitar permisos para acceder a la galería.");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            Alert.alert('Error', 'No se pudo seleccionar la imagen.');
        }
    };

    // Función para tomar una foto con la cámara
    const takePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permiso requerido", "Necesitas habilitar permisos para usar la cámara.");
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            Alert.alert('Error', 'No se pudo tomar la foto.');
        }
    };

    // Función para seleccionar archivo desde servicios en la nube como Google Drive y Dropbox
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: "image/*", // Solo imágenes
            copyToCacheDirectory: true,
        });

        console.log(result); // Verifica el resultado

        if (result) {//=== 'success' && result.assets && result.assets.length > 0) {
            setSelectedImage(result.assets[0].uri);
            // Verifica la accesibilidad del archivo
            const fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri);
            console.log('File Info: ', fileInfo);
        } else {
            Alert.alert('Error', 'No se pudo seleccionar el archivo o el archivo seleccionado no es válido.');
        }
    };

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.containerSecond}>
                <SelectionButton
                    onPress={pickImage}
                    imageSource={require('../../assets/icons/frame.png')}
                    text="Subir desde galería"
                />
                <SelectionButton
                    onPress={pickDocument}
                    imageSource={require('../../assets/icons/frame.png')}
                    text="Seleccionar desde una aplicación"
                />
                <SelectionButton
                    onPress={takePhoto}
                    imageSource={require('../../assets/icons/frame.png')}
                    text="Tomar una Foto"
                />
                {selectedImage && (
                    <Image
                        source={{ uri: selectedImage }}
                        style={styles.previewImage}
                        onError={(error) => console.log('Error al cargar imagen:', error.nativeEvent.error)}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0ECE3',
    },
    containerSecond: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    previewImage: {
        width: '100%',
        height: 200,
        marginTop: 20,
        borderRadius: 10,
    },
});

export default HomeScreen;
