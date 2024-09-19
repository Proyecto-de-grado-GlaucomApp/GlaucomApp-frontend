import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../../../assets/images/logo.png')} style={styles.logo}/>
                <View style={styles.logoTextContainer}>
                    <Text style={styles.title}>GlaucomApp</Text>
                    <Text style={styles.subtitle}>Hola de nuevo</Text>
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
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#FFFFFF',
    },
});

export default Header;
