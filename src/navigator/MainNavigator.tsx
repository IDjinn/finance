import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Main from "../screens/Main/Index";
import {useTheme} from "styled-components/native";

export const Pages = Object.freeze({
  Welcome: "Welcome",
});


const Tab = createMaterialTopTabNavigator();
export default function MainNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      tabBarPosition={"bottom"}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: null!,
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: theme.colors.variants.background.light,
          borderRadius: 15,
          height: 75,
          elevation: 5,
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.25,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: theme.borderColor,
        },
      }}
    >
      <Tab.Screen name={Pages.Welcome} component={Main} />
    </Tab.Navigator>
  );
}
