import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import DataDisplay from "../../components/home/DataDisplay";
import { mapApiProcessImage } from "../../utils/mappers/ImageMapperApi";
import Icon from 'react-native-vector-icons/MaterialIcons';


const ResultScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const responseData = route.params?.responseData;


    const viewData = mapApiProcessImage(responseData);

    const handleSave = () => {
        console.log('viewData:', viewData);
        navigation.navigate('SaveResult', {
            imageId: viewData.imageId,
            distanceRatio: viewData.distanceRatio,
            perimeterRatio: viewData.perimeterRatio,
            areaRatio: viewData.areaRatio,
        });
    };

    const handleDiscard = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: viewData?.imageUrl }} style={styles.logo} />

            <View style={styles.dataContainer}>
                <DataDisplay title="Relación de distancias:" value={viewData.distanceRatio} />
                <DataDisplay title="Relación de perímetros:" value={`${viewData.perimeterRatio}%`} />
                <DataDisplay title="Relación de áreas:" value={viewData.areaRatio} />
            </View>

            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={handleSave} style={styles.iconButton}>
                    <Icon name="save" size={30} color="#769BCE" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDiscard} style={styles.iconButton}>
                    <Icon name="cancel" size={30} color="#769BCE" />
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 20,
    },
    dataContainer: {
        marginTop: 20,
        alignItems: 'flex-start',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 30,
        width: '100%',
    },
    iconButton: {
        padding: 10,
    },
});

export default ResultScreen;
