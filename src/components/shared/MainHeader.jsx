import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

const MainHeader = ({ title, subtitle }) => (
    <SafeAreaView style={styles.header}>
        <Text style={styles.nameText}>{subtitle}</Text>
        <Text style={styles.welcomeText}>{title}</Text>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    header: {
        alignItems: 'flex-start',
        backgroundColor: '#769BCE',
        paddingVertical: 50,
        paddingHorizontal: 20,
        borderTopWidth: 20,
        borderColor: '#769BCE',

    },
    welcomeText: {
        fontSize: 16,
        color: '#ffffff',
        fontFamily: 'SansationRegular',

    },
    nameText: {
        fontSize: 35,
        color: '#FFDD00',
        fontWeight: 'semibold',
        fontFamily: 'SansationRegular',

    },
});

export default MainHeader;
