// src/navigation/AppNavigator.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from "../tabNavigator/TabNavigation";
import AuthNavigation from "../stackNavigator/AuthNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Stack = createStackNavigator();

const AppNavigator = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);



    // simulaciond e autenticacion
    useEffect(async () => {

        const token = await AsyncStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false);
        }
        else {
            setIsAuthenticated(true);
        }

    }, []);

    return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    // Si el usuario está autenticado, mostrar el TabNavigator
                    <Stack.Screen name="Tab" component={TabNavigator} />
                ) : (
                    // Si no está autenticado, mostrar las pantallas de login/registro
                    <Stack.Screen name="Auth" component={AuthNavigation} />
                )}
            </Stack.Navigator>
    );
};

export default AppNavigator;
