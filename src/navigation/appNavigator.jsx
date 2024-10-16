// src/navigation/AppNavigator.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from "./tabNavigator/TabNavigation";
import AuthNavigation from "./stackNavigator/AuthNavigation";


const Stack = createStackNavigator();

const AppNavigator = () => {
    // Aquí puedes gestionar el estado de autenticación del usuario
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Este efecto simularía una verificación de autenticación al abrir la app
    useEffect(() => {
        // Aquí iría la lógica para verificar si el usuario está autenticado
        // Por ejemplo, revisando si hay un token guardado en el dispositivo
        // Por ahora, lo dejamos en `false` para que muestre el login primero
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
