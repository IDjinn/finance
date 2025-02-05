import { TransactionCategory } from "../transaction";

export type MonthExpenseSumary = {
    year: string;
    month: string;
    totalBalance: number;
    totalSpent: number;
    expenses: Expense[];
}

export type Expense = TransactionCategory & {
    total: number;
}

export const MonthlySumarySorter = (a: MonthExpenseSumary, b: MonthExpenseSumary) => {
    if (a.year !== b.year) {
        return a.year < b.year ? -1 : 1;
    }

    return a.month < b.month ? -1 : 1;
}
