import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import Header from '../../components/Header';
import SelectionButton from '../../components/SelectionButton';
import { pickImage, pickDocument, takePhoto } from '../../utils/imageUtils';
import {useBackHandler} from "../../hooks/useBackHandlerHook";

const HomeScreen = ({ navigation }) => {

    useBackHandler();

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.containerSecond}>
                <SelectionButton
                    onPress={() => pickImage(navigation)}
                    imageSource={require('../../../assets/icons/frame.png')}
                    text="Subir desde galería"
                />
                <SelectionButton
                    onPress={() => pickDocument(navigation)}
                    imageSource={require('../../../assets/icons/frame.png')}
                    text="Subir desde una aplicación"
                />
                <SelectionButton
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
