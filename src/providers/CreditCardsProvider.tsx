import { createContext, useState } from "react";
import { ViewProps } from "react-native/types";
import { useTheme } from "styled-components/native";

export type CreditCardData = {
  id: string;
  bank: string;
  flag: string;
  nickname: string;
  expireDate: string;
  color: string;
  variantColor: string;
  balance: {
    usedLimit: number;
    limit: number;
    debt: number;
    invoice: string;
  };
};

export type CreditCardsData = {
  usedLimit: number;
  limit: number;

  creditCards: CreditCardData[];
};

export const CreditCardsContext = createContext<CreditCardsData>(
  {} as CreditCardsData
);

const CreditCardsProvider = ({ children }: ViewProps) => {
  const theme = useTheme();
  const [creditCards, setCreditCardsData] = useState<CreditCardsData>({
    limit: 100_000,
    usedLimit: 10_000,
    creditCards: [
      {
        id: "123 *** *** 99",
        nickname: "Banco do brasil",
        flag: "master-card",
        bank: "banco-do-brasil",
        color: "#f4bb11",
        variantColor: "#ff630f",
        expireDate: "03/03",
        balance: {
          usedLimit: 500,
          limit: 3_000,
          debt: 200.5,
          invoice: "03/03",
        },
      },
      {
        id: "5555 **** **** 6666",
        nickname: "Nubank",
        flag: "mastercard",
        bank: "Nubank",
        color: theme.colors.primary,
        variantColor: theme.colors.variants.primary.light,
        expireDate: "03/25",
        balance: {
          usedLimit: 1500,
          limit: 5000,
          debt: 250.75,
          invoice: "03/25",
        },
      },
    ],
  });

  return (
    <CreditCardsContext.Provider value={creditCards}>
      {children}
    </CreditCardsContext.Provider>
  );
};

export default CreditCardsProvider;
