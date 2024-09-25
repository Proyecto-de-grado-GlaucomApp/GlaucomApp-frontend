import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

export const downloadImage = async (imageUri, setLocalImageUri, setLoading) => {
    try {
        if (imageUri && (imageUri.startsWith('http://') || imageUri.startsWith('https://'))) {
            const fileUri = FileSystem.documentDirectory + 'downloadedImage.jpg';
            const { uri } = await FileSystem.downloadAsync(imageUri, fileUri);
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
