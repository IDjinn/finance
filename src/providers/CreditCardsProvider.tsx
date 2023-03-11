import { createContext, useState } from "react";
import { ViewProps } from "react-native/types";

export type CreditCardData = {
  id: string;
  bank: string;
  flag: string;
  nickname: string;
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
  const [creditCards, setCreditCardsData] = useState<CreditCardsData>({
    limit: 100_000,
    usedLimit: 10_000,
    creditCards: [
      {
        id: "sadawsdsa",
        nickname: "bb",
        flag: "master-card",
        bank: "banco-do-brasil",
        balance: {
          usedLimit: 500,
          limit: 3_000,
          debt: 200.5,
          invoice: "03/03",
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
