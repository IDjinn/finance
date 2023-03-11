import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/navigator/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import AppProviders from "./src/providers/AppProviders";

export default function App() {
  return (
    <AppProviders>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </AppProviders>
  );
}
