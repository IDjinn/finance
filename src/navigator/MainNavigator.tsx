import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Main from "../screens/Main/Index";

export const Pages = Object.freeze({
  Welcome: "Welcome",
});

const Tab = createMaterialTopTabNavigator();
export default function MainNavigator() {
  return (
    <Tab.Navigator tabBarPosition={"bottom"}>
      <Tab.Screen name={Pages.Welcome} component={Main} />
    </Tab.Navigator>
  );
}
