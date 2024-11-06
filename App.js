import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/mainNavigator/appNavigator";
import { useFonts } from "expo-font";

export default function App() {
    const [fontsLoaded] = useFonts({
        SansationRegular: require('./assets/fonts/sansation/Sansation_Regular.ttf'),
        SansationBold: require('./assets/fonts/sansation/Sansation_Bold.ttf'),
        SansationLight: require('./assets/fonts/sansation/Sansation_Light.ttf'),
        SansationItalic: require('./assets/fonts/sansation/Sansation_Italic.ttf'),
        SansationBoldItalic: require('./assets/fonts/sansation/Sansation_Bold_Italic.ttf'),
        SansationLightItalic: require('./assets/fonts/sansation/Sansation_Light_Italic.ttf'),
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
