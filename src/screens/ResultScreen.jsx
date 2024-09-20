import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ResultScreen = ({ onPress, imageSource, text }) => (
    <View style={styles.header}>
        <Image source={require('../../assets/images/img.png')} style={styles.logo}/>
    </View>
);

const styles = StyleSheet.create({
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});


export default ResultScreen;