import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/homeScreens/HomeScreen";
import AnalyzeScreen from "../screens/homeScreens/AnalyzeScreen";
import LoadingScreen from "../screens/homeScreens/LoadingScreen";
import ResultScreen from "../screens/homeScreens/ResultScreen";

const Stack = createStackNavigator();

const HomeNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Analyze" component={AnalyzeScreen} />
            <Stack.Screen name="Loading" component={LoadingScreen} />
            <Stack.Screen name="Result" component={ResultScreen} />
        </Stack.Navigator>
    );
};

export default HomeNavigation




