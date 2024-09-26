import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';


const PatientDetailScreen = ({ route }) => {
    const { patient } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{patient.name}</Text>
            <Text style={styles.subtitle}>C.C {patient.cedula} </Text>
            <View style={styles.imagePlaceholder}>
                <Image source={{ uri: patient.image }} style={{ width: '100%', height: '100%' }} />
                <Text>hola</Text>
                <Text>hola</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
    },
    imagePlaceholder: {
        height: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PatientDetailScreen;

