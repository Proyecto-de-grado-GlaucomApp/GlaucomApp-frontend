import React from 'react';
import {View, StyleSheet} from 'react-native';
import PrimaryButton from "../components/PrimaryButton";

const ImageScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {/* Aquí puedes añadir tu imagen o cualquier otro contenido */}
            </View>

            <View style={styles.buttonContainer}>
                <PrimaryButton title="Realizar análisis" onPress={() => navigation.navigate('Login')}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    imageContainer: {
        width: '100%',
        height: '70%',
        backgroundColor: '#d9d9d9',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    buttonContainer: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
    },

});

export default ImageScreen;
