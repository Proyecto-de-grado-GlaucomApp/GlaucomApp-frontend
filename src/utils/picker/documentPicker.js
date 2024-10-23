import * as DocumentPicker from "expo-document-picker";
import {Alert} from "react-native";

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