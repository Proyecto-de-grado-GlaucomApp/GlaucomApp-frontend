import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

/**
 * Downloads an image from a remote URI and saves it locally.
 * If the provided URI is not a remote URL, it uses the URI directly.
 *
 * @async
 * @function downloadImage
 * @param {string} imageUri - The URI of the image to download. Can be a remote URL or a local URI.
 * @param {function} setLocalImageUri - Function to update the state with the downloaded image URI.
 * @param {function} setLoading - Function to mark the loading state as completed.
 * @returns {Promise<void>} Returns a promise that handles image downloading or error handling.
 */
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
