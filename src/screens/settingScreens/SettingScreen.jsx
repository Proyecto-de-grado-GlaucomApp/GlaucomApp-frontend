import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { useBackHome } from "../../hooks/useBackHome";
import PrimaryButton from "../../components/shared/PrimaryButton";
import authApi from "../../services/authApi";
import { deleteAccount } from "../../services/accountApi";

const SettingScreen = ({ navigation }) => {

    useBackHome(navigation);

    const confirmLogout = () => {
        Alert.alert(
            "Confirmar Cierre de Sesión",
            "¿Estás seguro de que deseas cerrar sesión?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Sí", onPress: handleLogout }
            ]
        );
    };

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

    const confirmDeleteAccount = () => {
        Alert.alert(
            "Confirmar Eliminación de Cuenta",
            "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Sí", onPress: handleDeleteAccount }
            ]
        );
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount();
            Alert.alert("Cuenta Eliminada", "Tu cuenta ha sido eliminada correctamente.");
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            Alert.alert("Error", "No se pudo eliminar la cuenta. Inténtalo de nuevo.");
        }
    };

    return (
        <View style={styles.container}>
            <PrimaryButton title="Cerrar Sesión" onPress={confirmLogout} />
            <PrimaryButton title="Eliminar Cuenta" onPress={confirmDeleteAccount} />
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
