import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MainNavigator from "./MainNavigator";

export const Pages = Object.freeze({
  MAIN: "Main",
});

const Stack = createStackNavigator();
export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={Pages.MAIN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={Pages.MAIN} component={MainNavigator} />
    </Stack.Navigator>
  );
}
