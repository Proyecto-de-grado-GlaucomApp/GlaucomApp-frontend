import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useBackHome} from "../../hooks/useBackHome";
import PrimaryButton from "../../components/shared/PrimaryButton";

const SettingScreen = ({ navigation }) => {

    useBackHome(navigation);

    return (
        <View style={styles.container}>
            <PrimaryButton title="Cerrar Sesión" />
        </View>
    );
}

export default SettingScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});
