import React from 'react';
import StackNavigator from "./src/navigation/StackNavigation";
import TabNavigator from "./src/navigation/TabNavigation";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  return (
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
  );
}

