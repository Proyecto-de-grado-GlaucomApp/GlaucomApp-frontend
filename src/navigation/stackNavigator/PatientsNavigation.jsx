import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PatientScreen from "../../screens/patientScreens/patientSreen";
import PatientDetailScreen from "../../screens/patientScreens/PatientDetailScreen";
import PatientExamScreen from "../../screens/patientScreens/PatientExamScreen";
import ViewImageScreen from "../../screens/homeScreens/ViewImageScreen";

const Stack = createStackNavigator();

const PatientsNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Patient" component={PatientScreen} options={{headerShown : false}       }/>
            <Stack.Screen name="PatientDetail" component={PatientDetailScreen} options={{headerTitle: 'Detalles del Paciente'}}/>
            <Stack.Screen name="PatientExam" component={PatientExamScreen} options={{headerTitle: 'Detalles del Examen'}}/>
            <Stack.Screen name="ViewImage" component={ViewImageScreen} options={{headerTitle: 'Visualizar imagen'}}/>

        </Stack.Navigator>
    );
};

export default PatientsNavigation
