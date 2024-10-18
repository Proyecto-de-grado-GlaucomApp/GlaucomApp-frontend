import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const LoadingIndicator = ({ message }) => (
    <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>{message}</Text>
    </View>
);

const styles = StyleSheet.create({
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoadingIndicator;
