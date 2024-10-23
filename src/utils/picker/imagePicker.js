import * as ImagePicker from "expo-image-picker";
import {Alert} from "react-native";
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