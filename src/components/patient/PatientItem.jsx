import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const PatientItem = ({ name, cedula, onPress }) => {
    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.text}>{name}</Text>
                <Text style={styles.cedula}>C.C. {cedula}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    },
    cedula: {
        fontSize: 14,
        color: '#a9a9a9',
    },
});

export default PatientItem;
