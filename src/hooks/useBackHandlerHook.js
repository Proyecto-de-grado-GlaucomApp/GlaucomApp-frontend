import {useIsFocused} from "@react-navigation/native";
import * as React from "react";
import {Alert, BackHandler} from "react-native";

export function useBackHandler() {
    const isFocused = useIsFocused();

    React.useEffect(() => {
        const onBackPress = () => {
            if (isFocused) {
                Alert.alert(
                    "Salir",
                    "¿Estás seguro que quieres salir de la aplicación?",
                    [
                        { text: "Cancelar", style: "cancel" },
                        { text: "Salir", onPress: () => BackHandler.exitApp() }
                    ],
                    { cancelable: true }
                );
                return true;
            }
            return false;
        };

        if (isFocused) {
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
        }

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        };
    }, [isFocused]);
}