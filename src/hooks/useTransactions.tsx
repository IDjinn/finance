import { useContext } from "react";
import { TransactionsContext } from "../providers/TransactionsProvider";

export const useTransactions = () => useContext(TransactionsContext);
