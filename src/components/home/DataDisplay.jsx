import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DataDisplay = ({ title, value }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.dataText}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15, // Espacio entre cada DataDisplay
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        fontFamily: 'SansationRegular',

    },
    dataText: {
        fontSize: 16,
        fontFamily: 'SansationRegular',
    },
});

export default DataDisplay;
