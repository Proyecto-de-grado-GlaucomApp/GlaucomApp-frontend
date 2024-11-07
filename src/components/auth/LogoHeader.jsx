import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const LogoHeader = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../../assets/images/logo.png')}
                    style={styles.logo}
                    testID="logo-image" // Id para para pruebas
                />
                <View style={styles.logoTextContainer}>
                    <Text style={styles.title}>GlauApp</Text>
                    <Text style={styles.subtitle}>Pontificia Universidad Javeriana</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 50,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoTextContainer: {
        marginLeft: 10,
    },
    logo: {
        width: 70,
        height: 60,
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 10.5,
        color: '#FFFFFF',
    },
});

export default LogoHeader;
