import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import PatientItem from "./PatientItem";

const PatientList = ({ patients, onPatientPress }) => {
    const renderItem = ({ item }) => (
        <PatientItem
            name={item.name}
            onPress={() => onPatientPress(item.id)}
        />
    );

    return (
        <FlatList
            data={patients}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default PatientList;
