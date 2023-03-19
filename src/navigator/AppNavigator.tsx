import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Wallet from "../screens/Wallet/Index";
import MainNavigator from "./MainNavigator";

export const AppStackPages = Object.freeze({
  TabNavigator: "TabNavigator",
  Wallet: 'Wallet'
});

const Stack = createStackNavigator();
export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={AppStackPages.TabNavigator}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={AppStackPages.TabNavigator}
        component={MainNavigator}
      />
    </Stack.Navigator>
  );
}
