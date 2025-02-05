import { Money } from "./transaction";

export type Balance = Readonly<{
    balance: Money;
    currency: string;
}>;