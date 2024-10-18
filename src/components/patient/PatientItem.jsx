import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PatientItem = ({ name, onPress }) => {
    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <Text style={styles.text}>{name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        fontSize: 18,
    },
});

export default PatientItem;
