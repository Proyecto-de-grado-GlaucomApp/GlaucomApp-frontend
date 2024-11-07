import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ResultMessage = ({ success }) => (
    <View style={styles.resultContainer}>
        <View testID={success ? "success-icon" : "error-icon"}>
            <MaterialIcons
                name={success ? "check-circle" : "cancel"}
                size={50}
                color={success ? "green" : "red"}
            />
        </View>
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
