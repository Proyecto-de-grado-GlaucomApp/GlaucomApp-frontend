import { useIsFocused } from "@react-navigation/native";
import * as React from "react";
import { BackHandler } from "react-native";

export function useNavigateBackToHome(navigation) {
    const isFocused = useIsFocused();

    React.useEffect(() => {
        const onBackPress = () => {
            if (isFocused) {
                navigation.navigate('HomeNavigation');
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
    }, [isFocused, navigation]);
}
