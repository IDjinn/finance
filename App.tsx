import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/navigator/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import AppProviders from "./src/providers/AppProviders";
import React, { useCallback, useEffect, useState } from "react";
import { loadFonts } from "./src/util/styled/theme";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const loadApp = useCallback(async () => {
    await loadFonts();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadApp();
  }, [loadApp]);

  if (isLoading) return <></>;

  return (
    <AppProviders>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </AppProviders>
  );
}
