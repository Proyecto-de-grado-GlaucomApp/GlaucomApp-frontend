import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PatientScreen from "../screens/patientScreens/patientSreen";
import PatientDetailScreen from "../screens/patientScreens/PatientDetailScreen";

const Stack = createStackNavigator();

const PatientsNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Patient" component={PatientScreen} options={{headerTitle: 'Pacientes'}}/>
            <Stack.Screen name="PatientDetail" component={PatientDetailScreen} options={{headerTitle: 'Detalles del Paciente'}}/>
        </Stack.Navigator>
    );
};

export default PatientsNavigation




