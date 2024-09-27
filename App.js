import React from 'react';
import StackNavigator from "./src/navigation/stackNavigator/StackNavigation";
import TabNavigator from "./src/navigation/tabNavigator/TabNavigation";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  return (
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
  );
}

