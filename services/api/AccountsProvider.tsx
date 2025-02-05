import { atom, useAtom } from "jotai";
import { createContext, FC, ReactNode, useMemo } from "react";

export interface Account {
    id: string;
    name: string;
    balance: number;
}

export const accounts = atom<Account[]>([]);

export interface AccountsContextType {
    accounts: Account[];
    addAccount: (account: Account) => void;
    deleteAccount: (account: Account) => void;
    updateAccount: (account: Account) => void;
}

export const AccountsContext = createContext<AccountsContextType>({
    accounts: [],
    addAccount: (account: Account) => { },
    deleteAccount: (account: Account) => { },
    updateAccount: (account: Account) => { },
});

export const AccountsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [accountsAtom, setAccounts] = useAtom(accounts);

    const addAccount = (account: Account) => {
        setAccounts((prevAccounts) => [...prevAccounts, account]);
    };

    const deleteAccount = (account: Account) => {
        setAccounts((prevAccounts) => prevAccounts.filter((item) => item.id !== account.id));
    };

    const updateAccount = (account: Account) => {
        setAccounts((prevAccounts) =>
            prevAccounts.map((item) => (item.id === account.id ? account : item))
        );
    };

    return (
        <AccountsContext.Provider
            value={{
                accounts: accountsAtom,
                addAccount,
                deleteAccount,
                updateAccount,
            }}
        >
            {children}
        </AccountsContext.Provider>
    );
};
