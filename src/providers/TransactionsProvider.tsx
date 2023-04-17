import { createContext, useEffect, useState } from "react";
import { useAccounts } from "../hooks/useAccounts";
import { Account } from "./AccountsProvider";
import { DateTime } from "ts-luxon";

export type IncomingTransaction = {
  id: string;
  amount: number;
  from: string;
  timestamp: DateTime;
  targetAccount: Account;
};

export type OutgoingTransaction = {
  id: string;
  amount: number;
  timestamp: DateTime;
  to: string;
  fromAccount: Account;
};

export type Transactions = {
  incomings: IncomingTransaction[];
  outgoings: OutgoingTransaction[];

  all: (IncomingTransaction | OutgoingTransaction)[];
};

export const TransactionsContext = createContext<Transactions>(
  {} as Transactions
);

export default function TransactionsProvider({ children }: any) {
  const { accounts } = useAccounts();
  const [transactionsData, setTransactionsData] = useState<Transactions>({
    incomings: [],
    outgoings: [],
    all: [],
  });

  useEffect(() => {
    const createTransaction = () => {
      const rand = Math.floor(Math.random() * 10) <= 5;
      if (rand) {
        return {
          id: (Math.random() * 100000).toString(),
          amount: Math.random() * 10000,
          from: "Lucas Souza Romero",
          timestamp: DateTime.now().plus({
            days: -Math.floor(29 + Math.random() * 100),
          }),
          targetAccount:
            accounts[Math.floor(Math.random() * accounts.length)],
        } as IncomingTransaction;
      }
      return {
        id: (Math.random() * 100000).toString(),
        amount: Math.random() * 10000,
        to: "Lucas Souza Romero",
        timestamp: DateTime.now().plus({
          days: -Math.floor(20 + Math.random() * 100),
        }),
        fromAccount: accounts[0],
      } as OutgoingTransaction;
    };

    const transactions = new Array(100).fill(null).map(createTransaction);
    setTransactionsData({
      incomings: transactions.filter(
        (t) => "from" in t
      ) as IncomingTransaction[],
      outgoings: transactions.filter((t) => "to" in t) as OutgoingTransaction[],
      all: transactions,
    });
  }, [accounts]);

  return (
    <TransactionsContext.Provider value={transactionsData}>
      {children}
    </TransactionsContext.Provider>
  );
}
