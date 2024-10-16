import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import HomeNavigation from "../stackNavigator/HomeNavigation";
import PatientsNavigation from "../stackNavigator/PatientsNavigation";
import SettingsNavigation from "../stackNavigator/SettingsNavigation";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="HomeNavigation"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'HomeNavigation') {
                        iconName = focused ? 'home' : 'home-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'PatientsNavigation') {
                        iconName = focused ? 'people' : 'people-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'SettingsNaviation') {
                        iconName = focused ? 'settings' : 'settings-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    }
                },
                tabBarActiveTintColor: '#769BCE',
                tabBarInactiveTintColor: '#769BCE',
                tabBarStyle: styles.tabBarStyle,
                headerShown: false
            })}
        >
            <Tab.Screen
                name="PatientsNavigation"
                component={PatientsNavigation}
                options={{
                    tabBarLabel: 'Pacientes',
                }}
            />
            <Tab.Screen
                name="HomeNavigation"
                component={HomeNavigation}
                options={{
                    tabBarLabel: 'Inicio',
                }}
            />
            <Tab.Screen
                name="SettingsNaviation"
                component={SettingsNavigation}
                options={{
                    tabBarLabel: 'Configuracion',
                }}
            />
        </Tab.Navigator>
    );
}




// Estilos desacoplados usando StyleSheet
const styles = StyleSheet.create({
    tabBarStyle: {
        paddingBottom: 10,
        paddingTop: 10,
        height: 70,
    }
});

export default TabNavigator;
