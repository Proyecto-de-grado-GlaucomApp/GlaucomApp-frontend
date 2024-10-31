import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { useBackHome } from "../../hooks/useBackHome";
import PrimaryButton from "../../components/shared/PrimaryButton";
import authApi from "../../services/authApi";

const SettingScreen = ({ navigation }) => {

    useBackHome(navigation);

    const handleLogout = async () => {
        try {
            await authApi.logOut();
            Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            Alert.alert("Error", "No se pudo cerrar la sesión. Inténtalo de nuevo.");
        }
    };

    return (
        <View style={styles.container}>
            <PrimaryButton title="Cerrar Sesión" onPress={handleLogout} />
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
