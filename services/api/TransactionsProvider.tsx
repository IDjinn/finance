import { Transaction } from "@/utils/data/transaction";
import { atom, useAtom } from "jotai";
import { createContext, FC, Provider, ReactNode, useMemo, useState } from "react";

export const incomes = atom<Transaction[]>([]);
export const expenses = atom<Transaction[]>([]);
export const allTransactions = atom(
    (get) => [...get(incomes), ...get(expenses)]
);

export interface TransactiionsContextType {
    incomes: Transaction[],
    expenses: Transaction[],
    all: Readonly<Transaction[]>
    addIncome: (transaction: Transaction) => void,
    addExpense: (transaction: Transaction) => void,
    deleteTransaction: (transaction: Transaction) => void,
    updateTransaction: (transaction: Transaction) => void,
    reaload(): void,
}


export const TransactionsContext = createContext<TransactiionsContextType>({
    incomes: [],
    expenses: [],
    all: [],
    addIncome: (transaction: Transaction) => { },
    addExpense: (transaction: Transaction) => { },
    deleteTransaction: (transaction: Transaction) => { },
    updateTransaction: (transaction: Transaction) => { },
    reaload: () => { },
});


export const TransactionsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [incomesAtom, setIncomes] = useAtom(incomes);
    const [expensesAtom, setExpenses] = useAtom(expenses);

    const reaload = () => {

    }

    const all = useMemo(() => [...incomesAtom, ...expensesAtom], [incomesAtom, expensesAtom]);
    const addIncome = (transaction: Transaction) => {
        setIncomes((prevIncomes) => [...prevIncomes, transaction]);
    };

    const addExpense = (transaction: Transaction) => {
        setExpenses((prevExpenses) => [...prevExpenses, transaction]);
    };

    const deleteTransaction = (transaction: Transaction) => {
        if (transaction.type === "income") {
            setIncomes((prevIncomes) => prevIncomes.filter((item) => item.id !== transaction.id));
        } else {
            setExpenses((prevExpenses) => prevExpenses.filter((item) => item.id !== transaction.id));
        }
    };

    const updateTransaction = (transaction: Transaction) => {
        if (transaction.type === "income") {
            setIncomes((prevIncomes) =>
                prevIncomes.map((item) => (item.id === transaction.id ? transaction : item))
            );
        } else {
            setExpenses((prevExpenses) =>
                prevExpenses.map((item) => (item.id === transaction.id ? transaction : item))
            );
        }
    };

    return (
        <TransactionsContext.Provider
            value={{
                incomes: incomesAtom,
                expenses: expensesAtom,
                all,
                addIncome,
                addExpense,
                deleteTransaction,
                updateTransaction,
                reaload
            }}
        >
            {children}
        </TransactionsContext.Provider>
    );
}