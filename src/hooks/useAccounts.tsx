import { useContext } from "react";
import { AccountsContext } from "../providers/AccountsProvider";

export const useAccounts = () => useContext(AccountsContext);