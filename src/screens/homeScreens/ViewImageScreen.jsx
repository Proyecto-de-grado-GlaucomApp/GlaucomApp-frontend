import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import Animated, {useSharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated'

const ViewImageScreen = () => {


    const route = useRoute();
    const {imageUri} = route.params;
    const escalaImg = useSharedValue(1);



    const pinchazoPantalla = Gesture.Pinch().onUpdate((e) => {
        escalaImg.value = e.scale;
    }).onEnd(() => {
        escalaImg.value = withTiming(1);
    })


    const estiloAnimado = useAnimatedStyle(() => ({
        transform: [{scale: escalaImg.value}],
    }));

    return (
        <View style={styles.container}>
            <GestureDetector gesture={pinchazoPantalla}>
                <Animated.Image source={{uri: imageUri}} style={[styles.fullImage, estiloAnimado]}/>
            </GestureDetector>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default ViewImageScreen;
