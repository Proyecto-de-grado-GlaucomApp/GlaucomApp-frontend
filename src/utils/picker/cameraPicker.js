import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

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
        console.log('Foto tomada, URI:', result.assets[0].uri);
        navigation.navigate('Analyze', { imageUri: result.assets[0].uri });
    } else if (result.canceled) {
        Alert.alert('Cancelado', 'Foto Cancelada');
    } else {
        Alert.alert('Error', 'No se pudo tomar la foto.');
    }
};
