import React from 'react';
import StackNavigator from "./src/navigation/StackNavigation";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  return (
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
  );
}

