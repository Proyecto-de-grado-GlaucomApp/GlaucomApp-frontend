import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

// Función para seleccionar imagen desde la galería
export const pickImage = async (navigation) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
        Alert.alert("Permiso requerido", "Necesitas habilitar permisos para acceder a la galería.");
        return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
        navigation.navigate('Analyze', { imageUri: result.assets[0].uri });
    }else if (result.canceled) {
        Alert.alert('Cancelado', 'Imagen Cancelada');
    }
    else {
        Alert.alert('Error', 'No se pudo seleccionar la imagen.');
    }
};

// Función para tomar una foto con la cámara
export const takePhoto = async (navigation) => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
        Alert.alert("Permiso requerido", "Necesitas habilitar permisos para usar la cámara.");
        return;
    }

    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
        navigation.navigate('Analyze', { imageUri: result.assets[0].uri });
    } else if (result.canceled) {
        Alert.alert('Cancelado', 'Foto Cancelada');
    } else {
        Alert.alert('Error', 'No se pudo tomar la foto.');
    }
};

// Función para seleccionar archivo desde servicios en la nube
export const pickDocument = async (navigation) => {
    let result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets.length > 0) {
        navigation.navigate('Analyze', { imageUri: result.assets[0].uri });
    } else {
        Alert.alert('Error', 'No se pudo seleccionar el archivo.');
    }
};
