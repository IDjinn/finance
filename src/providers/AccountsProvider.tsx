import { createContext, useState } from "react";
import { ViewProps } from "react-native/types";

type AccountsData = {};

export const AccountsContext = createContext<AccountsData>(
  {} as AccountsData
);

const AccountsProvider = ({ children }: ViewProps) => {
  const [accounts, setAccountsData] = useState({});

  return (
    <AccountsContext.Provider value={accounts}>
      {children}
    </AccountsContext.Provider>
  );
};

export default AccountsProvider;
