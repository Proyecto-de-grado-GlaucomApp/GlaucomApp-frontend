import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingScreen from "../screens/settingScreens/SettingScreen";

const Stack = createStackNavigator();

const SettingsNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Setting" component={SettingScreen} />
        </Stack.Navigator>
    );
};

export default SettingsNavigation




