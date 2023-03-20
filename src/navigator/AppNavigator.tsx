import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import styled from "styled-components/native";
import PressableButton from "../components/PressableButton";
import Incoming from "../screens/Incoming/Index";
import MainNavigator from "./MainNavigator";
import Icon from "react-native-vector-icons/Ionicons";

export const AppStackPages = Object.freeze({
  TabNavigator: "TabNavigator",
  Incoming: "Receitas",
});

const BackButtonContainer = styled(PressableButton)`
  width: 45px;
  height: 45px;
  background-color: ${({ theme }) => theme.colors.primary}
  margin-left: 10px;
  border-radius: ${({ theme }) => theme.borderRadius};
  align-items: center;
  justify-content: center;
`;

const BackButton = styled(Icon)`
  color: ${({ theme }) => theme.colors.variants.text.light};
`;

const Stack = createStackNavigator();
export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={AppStackPages.TabNavigator}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          borderRadius: 15,
        },
        headerLeft: (props) => (
          <BackButtonContainer onPress={props.onPress}>
            <BackButton name={"arrow-back"} size={18} />
          </BackButtonContainer>
        ),
      }}
    >
      <Stack.Screen
        name={AppStackPages.TabNavigator}
        component={MainNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name={AppStackPages.Incoming} component={Incoming} />
    </Stack.Navigator>
  );
}
