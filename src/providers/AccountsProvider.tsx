import { createContext, useState } from "react";
import { ViewProps } from "react-native/types";

type Account = {
  nickname: string;
  balance: number;
  debt: number;
  creditCards: string[];
};

type AccountsData = {
  accounts: Account[];
  totalBalance: number;
  totalDebt: number;
  balance: number;
};

export const AccountsContext = createContext<AccountsData>({} as AccountsData);

const AccountsProvider = ({ children }: ViewProps) => {
  const [accountsData, setAccountsData] = useState({
    totalBalance: 12123,
    totalDebt: 21234,
    balance: 12123,
    accounts: [
      {
        nickname: "nubank",
        balance: 135.93,
        debt: 342,
        creditCards: ["5555 **** **** 6666"],
      },
      {
        nickname: "bb",
        balance: 345.93,
        debt: 678,
        creditCards: ["5555 **** **** 6666"],
      },
    ],
  } as AccountsData);

  return (
    <AccountsContext.Provider value={accountsData}>
      {children}
    </AccountsContext.Provider>
  );
};

export default AccountsProvider;
