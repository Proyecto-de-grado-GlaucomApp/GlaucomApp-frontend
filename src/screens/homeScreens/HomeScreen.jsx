import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import MainHeader from '../../components/shared/MainHeader';
import ImageSelector from '../../components/home/ImageSelector';
import { useBackExit } from "../../hooks/useBackExit";
import { pickImage } from "../../utils/picker/imagePicker";
import { pickDocument } from "../../utils/picker/documentPicker";
import { takePhoto } from "../../utils/picker/cameraPicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
    const [nameDecode, setNameDecode] = useState("");

    useBackExit();

    useEffect(() => {
        const getToken = async () => {
            const tokenDecoded = await AsyncStorage.getItem('tokenDecoded');
            if (tokenDecoded) {
                // Dividir el nombre completo por los espacios y tomar solo el primer valor
                const firstName = tokenDecoded.split(" ")[0];
                setNameDecode(firstName);
            }
        };
        getToken();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <MainHeader title="¡Hola De Nuevo!" subtitle={nameDecode} />
            <View style={styles.containerSecond}>
                <ImageSelector
                    onPress={() => pickImage(navigation)}
                    imageSource={require('../../../assets/icons/frame.png')}
                    text="Subir desde galería"
                />
                <ImageSelector
                    onPress={() => pickDocument(navigation)}
                    imageSource={require('../../../assets/icons/frame.png')}
                    text="Subir desde una aplicación"
                />
                <ImageSelector
                    onPress={() => takePhoto(navigation)}
                    imageSource={require('../../../assets/icons/frame.png')}
                    text="Tomar una Foto"
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerSecond: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
});

export default HomeScreen;
