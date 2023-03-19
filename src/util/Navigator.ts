import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { AccountsRouteParamList } from "../screens/Accounts/Index";
import { WalletRouteParamList } from "../screens/Wallet/Index";

export const TabPages = Object.freeze({
  Welcome: "Welcome",
  Wallet: "Wallet",
  Accounts: "Accounts",
});
export type TabRouteParams = {
  [TabPages.Wallet]: WalletRouteParamList;
  [TabPages.Accounts]: AccountsRouteParamList;
};

export type TabNavigation = MaterialTopTabNavigationProp<TabRouteParams>;
