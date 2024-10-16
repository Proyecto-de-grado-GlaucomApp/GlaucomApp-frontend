import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/authScreens/LoginScreen';
import RegisterScreen from "../../screens/authScreens/RegisterScreen";
import TabNavigation from "../tabNavigator/TabNavigation";


const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={TabNavigation} />
        </Stack.Navigator>
    );
};

export default AuthNavigator




