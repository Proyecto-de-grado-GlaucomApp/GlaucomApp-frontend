import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PrimaryButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#F0ECE3',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignItems: 'center',
        marginHorizontal:70,
    },
    text: {
        color: '#4E4E4E',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PrimaryButton;
