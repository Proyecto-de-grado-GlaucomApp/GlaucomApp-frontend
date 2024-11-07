import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageDisplay = ({ imageUri }) => (
    <View style={styles.imageContainer}>
        {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} testID="displayed-image" />
        ) : (
            <View style={styles.imagePlaceholder} testID="image-placeholder" />
        )}
    </View>
);

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f0f0f0',
    },
});

export default ImageDisplay;