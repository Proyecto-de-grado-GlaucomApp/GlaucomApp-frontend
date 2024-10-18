import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ResultMessage = ({ success }) => (
    <View style={styles.resultContainer}>
        {success ? (
            <MaterialIcons name="check-circle" size={50} color="green" />
        ) : (
            <MaterialIcons name="cancel" size={50} color="red" />
        )}
        <Text>{success ? 'Imagen procesada correctamente.' : 'Error al procesar la imagen.'}</Text>
    </View>
);

const styles = StyleSheet.create({
    resultContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ResultMessage;
