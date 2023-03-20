import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Main from "../screens/Main/Index";
import styled, { useTheme } from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Wallet from "../screens/Wallet/Index";
import Accounts from "../screens/Accounts/Index";
import { TabPages, TabRouteParams } from "../util/Navigator";
import { FontEnum } from "../util/styled/theme";

const IonicIcon = styled(Ionicons)`
  font-size: 22px;
  color: ${({ color, theme }) => color?.toString() ?? theme.colors.secondary};
`;
const MaterialCommunityIcon = styled(MaterialCommunityIcons)`
  font-size: 22px;
  color: ${({ color, theme }) => color?.toString() ?? theme.colors.secondary};
`;

const IconContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Tab = createMaterialTopTabNavigator<TabRouteParams>();
export default function MainNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName={TabPages.Welcome}
      tabBarPosition={"bottom"}
      screenOptions={{
        tabBarIconStyle: {
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarIndicatorContainerStyle: {
          left: 40,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          width: 140,
        },
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.primary,
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
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
      <Tab.Screen
        name={TabPages.Wallet}
        component={Wallet}
        options={{
          tabBarLabel: "Carteira",
          tabBarLabelStyle: {
            textTransform: undefined,
          },
          tabBarIcon: (color: string, focused: boolean) => (
            <IconContainer>
              <MaterialCommunityIcon
                size={12}
                name={"card-account-details-outline"}
                color={theme.colors.primary}
              />
            </IconContainer>
          ),
        }}
      />
      <Tab.Screen
        name={TabPages.Welcome}
        component={Main}
        options={{
          tabBarLabel: "Início",
          tabBarLabelStyle: {
            textTransform: undefined,
          },
          tabBarIcon: (color: string, focused: boolean) => {
            return (
              <IconContainer>
                <IonicIcon
                  size={12}
                  name={"home-outline"}
                  color={theme.colors.primary}
                />
              </IconContainer>
            );
          },
        }}
      />
      <Tab.Screen
        name={TabPages.Accounts}
        component={Accounts}
        options={{
          tabBarLabel: "Contas",
          tabBarLabelStyle: {
            textTransform: undefined,
          },
          tabBarIcon: (color: string, focused: boolean) => (
            <IconContainer>
              <MaterialCommunityIcon
                size={12}
                name={"card-account-details-outline"}
                color={theme.colors.primary}
              />
            </IconContainer>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
