import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MainHeader = () => (
    <View style={styles.header}>
        <Text style={styles.welcomeText}>HOLA DE NUEVO</Text>
        <Text style={styles.nameText}>LEONARDO</Text>
    </View>
);

const styles = StyleSheet.create({
    header: {
        alignItems: 'flex-start',
        backgroundColor: '#769BCE',
        paddingVertical: 50,
        paddingHorizontal: 20,
    },
    welcomeText: {
        fontSize: 16,
        color: '#ffffff',
    },
    nameText: {
        fontSize: 35,
        color: '#FFDD00',
        fontWeight: 'semibold',
    },
});

export default MainHeader;
