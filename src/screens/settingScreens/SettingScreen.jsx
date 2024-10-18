import React from 'react';
import { View, Text } from 'react-native';
import {useBackHome} from "../../hooks/useBackHome";

const SettingScreen = ({ navigation }) => {

    useBackHome(navigation);

    return (
        <View>
            <Text>Settings</Text>
        </View>
    );
}

export default SettingScreen;
