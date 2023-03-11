import { CreditCardData } from "../providers/CreditCardsProvider";

const format = new Intl.NumberFormat("pt-Br", {
  currency: "BRL",
  style: "currency",
});

export const balanceToString = (value: number) => format.format(value);

export const percentageOfLimitUsage = (limit: number, usedLimit: number) => {
  return usedLimit / limit;
};
