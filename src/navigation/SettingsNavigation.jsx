import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AnalyzeScreen from "../screens/AnalyzeScreen";
import LoadingScreen from "../screens/LoadingScreen";
import ResultScreen from "../screens/ResultScreen";

const Stack = createStackNavigator();

const SettingsNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Analyze" component={AnalyzeScreen} />
            <Stack.Screen name="Loading" component={LoadingScreen} />
            <Stack.Screen name="Result" component={ResultScreen} />
        </Stack.Navigator>
    );
};

export default SettingsNavigation




