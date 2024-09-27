import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getPatients, getPatientById } from '../../services/patients/getApi'; // Asegúrate de que getPatientById esté importado
import { mapApiPatients, mapApiPatientsById } from "../../utils/dataMapper";

const PatientScreen = ({ navigation }) => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await getPatients();
                const mappedPatients = mapApiPatients(response);
                setPatients(mappedPatients.patients);
            } catch (error) {
                console.error('Error fetching patients:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, []); // Solo se ejecuta una vez al montar el componente

    // Función para manejar la navegación y obtención de detalles del paciente
    const handlePress = async (patientId) => {
        try {
            const response = await getPatientById(patientId); // Llamar a la API para obtener detalles del paciente por ID
            const mappedPatient = mapApiPatientsById(response); // Mapeamos los datos del paciente
            navigation.navigate('PatientDetail', { patient: mappedPatient }); // Navegar a la pantalla de detalles
        } catch (error) {
            console.error('Error fetching patient details:', error);
        }
    };

    // Renderizar cada paciente
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handlePress(item.id)}>
            <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {loading ? (  // Mostrar el indicador de carga mientras esperamos la respuesta
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={patients}
                    keyExtractor={item => item.id.toString()}  // Asegúrate de que el id sea string
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        fontSize: 18,
    },
});

export default PatientScreen;
