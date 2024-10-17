import React from 'react';
import { View, Text } from 'react-native';
import {useNavigateBackToHome} from "../../hooks/useNavigateBackToHomeHook";

const SettingScreen = ({ navigation }) => {

    useNavigateBackToHome(navigation);

    return (
        <View>
            <Text>Settings</Text>
        </View>
    );
}

export default SettingScreen;
