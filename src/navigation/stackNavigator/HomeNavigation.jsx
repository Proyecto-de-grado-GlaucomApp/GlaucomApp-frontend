import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "../../screens/homeScreens/HomeScreen";
import AnalyzeScreen from "../../screens/homeScreens/AnalyzeScreen";
import LoadingScreen from "../../screens/homeScreens/LoadingScreen";
import ResultScreen from "../../screens/homeScreens/ResultScreen";
import SaveResultScreen from "../../screens/homeScreens/SaveResultScreen";
import ViewImageScreen from "../../screens/homeScreens/ViewImageScreen";

const Stack = createStackNavigator();



const HomeNavigation = () => {


    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Analyze" component={AnalyzeScreen} options={{headerTitle: 'Analizar Imagen'}}/>
            <Stack.Screen name="Loading" component={LoadingScreen} options={{headerShown: false,}}/>
            <Stack.Screen name="Result" component={ResultScreen} options={{headerTitle: 'Resultado'}}/>
            <Stack.Screen name="SaveResult" component={SaveResultScreen} options={{headerTitle: 'Guardar Resultado'}}/>
            <Stack.Screen name="ViewImage" component={ViewImageScreen} options={{headerTitle: 'Visualizar imagen'}}/>

        </Stack.Navigator>
    );
};

export default HomeNavigation




