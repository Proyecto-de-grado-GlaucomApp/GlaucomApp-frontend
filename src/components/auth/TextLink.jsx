import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const TextLink = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default TextLink;
