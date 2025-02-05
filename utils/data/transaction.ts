import { DeepReadonly, GUID, UTCDate } from "../readonly";
import { Balance } from "./balance";
import { Entity } from "./entity";

export type TransactionType = "income" | "expense";

export type Money = number;

export type Transaction = DeepReadonly<Entity & {
    id: GUID;
    accountId: GUID;
    timestamp: UTCDate;
    type: TransactionType;
    balance: Balance;
    category?: TransactionCategory;
    description?: string;
}>;

export type TransactionCategory = {
    id: GUID;
    name: string;
};
