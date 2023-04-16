import { createContext, useState, useEffect } from "react";
import { ViewProps } from "react-native/types";
import Storage from "../data/Storage";

export type Account = {
  nickname: string;
  balance: number;
  debt: number;
  creditCards: string[];
};

export type AccountsData = {
  isLoading: boolean;
  accounts: Account[];
  totalBalance: number;
  totalDebt: number;
  balance: number;
};

export const AccountsContext = createContext<AccountsData>({} as AccountsData);

const AccountsProvider = ({ children }: ViewProps) => {
  const [accountsData, setAccountsData] = useState({
    isLoading: true,
    totalBalance: 12123,
    totalDebt: 21234,
    balance: 35.5,
    accounts: [],
  } as AccountsData);

  useEffect(() => {
    (async () => {
      const accounts = await Storage.instance.getAccounts();
      const balance = 567567.32;
      setAccountsData({
        isLoading: false,
        totalBalance: accounts.reduce(
          (prev, account) => account.balance + prev,
          balance
        ),
        totalDebt: accounts.reduce((prev, account) => account.debt + prev, 0),
        balance: balance,
        accounts: accounts,
      });
    })();
  }, []);

  return (
    <AccountsContext.Provider value={accountsData}>
      {children}
    </AccountsContext.Provider>
  );
};

export default AccountsProvider;
