import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PrimaryButton from "../components/PrimaryButton";

const AnalyzeScreen = ({ route, navigation }) => {
    const { imageUri } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {imageUri && (
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.image}
                    />
                )}
            </View>

            <View style={styles.buttonContainer}>
                <PrimaryButton title="Realizar análisis" onPress={() => navigation.navigate('Login')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 50,
    },
    imageContainer: {
        width: '100%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 20,
    },
    buttonContainer: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
    },
});

export default AnalyzeScreen;
