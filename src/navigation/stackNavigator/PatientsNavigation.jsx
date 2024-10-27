import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PatientScreen from "../../screens/patientScreens/patientSreen";
import PatientDetailScreen from "../../screens/patientScreens/PatientDetailScreen";
import PatientExamScreen from "../../screens/patientScreens/PatientExamScreen";

const Stack = createStackNavigator();

const PatientsNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Patient" component={PatientScreen} options={{headerTitle: 'Pacientes', headerLeft: null}       }/>
            <Stack.Screen name="PatientDetail" component={PatientDetailScreen} options={{headerTitle: 'Detalles del Paciente'}}/>
            <Stack.Screen name="PatientExam" component={PatientExamScreen} options={{headerTitle: 'Detalles del Examen'}}/>
        </Stack.Navigator>
    );
};

export default PatientsNavigation
