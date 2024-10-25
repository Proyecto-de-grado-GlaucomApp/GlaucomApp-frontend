// PatientList.jsx
import React from 'react';
import { FlatList } from 'react-native';
import PatientItem from "./PatientItem";
import LoadingIndicator from "../shared/LoadingIndicator";

const PatientList = ({ patients, onPatientPress, onEndReached, loadingMore, loadingMoreMessage }) => {
    const renderItem = ({ item }) => (
        <PatientItem
            name={item.name}
            onPress={() => onPatientPress(item.PacinetId)}
        />
    );

    return (
        <FlatList
            data={patients}
            keyExtractor={item => item.PacinetId.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loadingMore ? <LoadingIndicator message={loadingMoreMessage} /> : null}
        />
    );
};

export default PatientList;
