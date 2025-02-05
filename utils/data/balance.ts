import { Money } from "./transaction";

export type Balance = Readonly<{
    value: Money;
    currency: string;
}>;
export const money = (value: number): Money => Number((value * 10).toFixed(0));

export const moneyText = (value: number) =>{
    return (value / 10).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
