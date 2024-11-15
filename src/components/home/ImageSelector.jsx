import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ImageSelector = ({ onPress, imageSource, text }) => (
    <TouchableOpacity style={styles.uploadContainer} onPress={onPress} accessibilityRole="button" >
        <Image source={imageSource} style={styles.uploadIcon} testID="upload-image" />
        <Text style={styles.descriptionText}>{text}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    uploadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#769BCE',
        borderRadius: 20,
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 20,

    },
    uploadIcon: {
        width: 50,
        height: 50,
        marginVertical: 10,
    },
    descriptionText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'SansationRegular',
    },
});

export default ImageSelector;