import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PatientScreen from "../screens/patientScreens/patientSreen";

const Stack = createStackNavigator();

const PatientsNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Patient" component={PatientScreen} />
        </Stack.Navigator>
    );
};

export default PatientsNavigation




