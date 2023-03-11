import { ViewProps } from "react-native/types";
import WalletProvider from "./WalletProvider";

import { ThemeProvider } from "styled-components";
import theme from "../util/styled/theme";
import CreditCardsProvider from "./CreditCardsProvider";
import AccountsProvider from "./AccountsProvider";

export default function AppProviders({ children }: ViewProps) {
  return (
    <ThemeProvider theme={theme}>
      <AccountsProvider>
        <WalletProvider>
          <CreditCardsProvider>{children}</CreditCardsProvider>
        </WalletProvider>
      </AccountsProvider>
    </ThemeProvider>
  );
}
