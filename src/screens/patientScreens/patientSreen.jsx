import React from 'react';
import { StyleSheet } from 'react-native';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';


const patients = [
    { id: '1', name: 'John Doe', cedula: '12345678' },
    { id: '2', name: 'Jane Smith', cedula: '87654321' },
    { id: '3', name: 'Michael Johnson', cedula: '11223344' },
    { id: '4', name: 'Emily Davis', cedula: '99887766' },
    { id: '5', name: 'William Brown', cedula: '44332211' },
    { id: '6', name: 'John Doe', cedula: '12345678' },
    { id: '7', name: 'Jane Smith', cedula: '87654321' },
    { id: '8', name: 'Michael Johnson', cedula: '11223344' },
    { id: '9', name: 'Emily Davis', cedula: '99887766' },
    { id: '10', name: 'William Brown', cedula: '44332211' },
    { id: '11', name: 'John Doe', cedula: '12345678' },
    { id: '12', name: 'Jane Smith', cedula: '87654321' },
    { id: '13', name: 'Michael Johnson', cedula: '11223344' },
    { id: '14', name: 'Emily Davis', cedula: '99887766' },
    { id: '15', name: 'William Brown', cedula: '44332211' },
    { id: '16', name: 'John Doe', cedula: '12345678' },
    { id: '17', name: 'Jane Smith', cedula: '87654321' },
    { id: '18', name: 'Michael Johnson', cedula: '11223344' },
    { id: '19', name: 'Emily Davis', cedula: '99887766' },
    { id: '20', name: 'William Brown', cedula: '44332211' },
    { id: '21', name: 'John Doe', cedula: '12345678' },
    { id: '22', name: 'Jane Smith', cedula: '87654321' },
    { id: '23', name: 'Michael Johnson', cedula: '11223344' },
    { id: '24', name: 'Emily Davis', cedula: '99887766' },
    { id: '25', name: 'William Brown', cedula: '44332211' },
    { id: '26', name: 'John Doe', cedula: '12345678' },
    { id: '27', name: 'Jane Smith', cedula: '87654321' },
    { id: '28', name: 'Michael Johnson', cedula: '11223344' },
    { id: '29', name: 'Emily Davis', cedula: '99887766' },
    { id: '30', name: 'William Brown', cedula: '44332211' },
    { id: '31', name: 'John Doe', cedula: '12345678' },
    { id: '32', name: 'Jane Smith', cedula: '87654321' },
    { id: '33', name: 'Michael Johnson', cedula: '11223344' },
    { id: '34', name: 'Emily Davis', cedula: '99887766' }
];

const SettingScreen = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('PatientDetail', { patient: item })}>
            <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={patients}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

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


export default SettingScreen;

