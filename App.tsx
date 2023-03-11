import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/navigator/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";

import { ThemeProvider } from "styled-components";
import theme from "./src/util/styled/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </ThemeProvider>
  );
}
