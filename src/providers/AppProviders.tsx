import { ViewProps } from "react-native/types";
import WalletProvider from "./WalletProvider";

import { ThemeProvider } from "styled-components";
import theme from "../util/styled/theme";

export default function AppProviders({ children }: ViewProps) {
  return (
    <ThemeProvider theme={theme}>
      <WalletProvider>{children}</WalletProvider>
    </ThemeProvider>
  );
}
