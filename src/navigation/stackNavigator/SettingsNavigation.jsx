import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingScreen from "../../screens/settingScreens/SettingScreen";

const Stack = createStackNavigator();

const SettingsNavigation = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Setting" component={SettingScreen} options={{headerTitle: 'Configuración', headerLeft: null}}/>
        </Stack.Navigator>
    );
};

export default SettingsNavigation




