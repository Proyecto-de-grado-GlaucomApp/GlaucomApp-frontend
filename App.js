import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/mainNavigator/appNavigator";
import { useFonts } from "expo-font";

export default function App() {
    const [fontsLoaded] = useFonts({
        SansationRegular: require('./assets/fonts/sansation/Sansation_Regular.ttf'),
        Bold: require('./assets/fonts/sansation/Sansation_Bold.ttf'),
        Light: require('./assets/fonts/sansation/Sansation_Light.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    );
}
