import { ViewProps } from "react-native/types";
import WalletProvider from "./WalletProvider";

import { ThemeProvider } from "styled-components";
import theme from "../util/styled/theme";
import CreditCardsProvider from "./CreditCardsProvider";
import AccountsProvider from "./AccountsProvider";
import TransactionsProvider from "./TransactionsProvider";

export default function AppProviders({ children }: ViewProps) {
  return (
    <ThemeProvider theme={theme}>
      <AccountsProvider>
        <TransactionsProvider>
          <WalletProvider>
            <CreditCardsProvider>{children}</CreditCardsProvider>
          </WalletProvider>
        </TransactionsProvider>
      </AccountsProvider>
    </ThemeProvider>
  );
}
