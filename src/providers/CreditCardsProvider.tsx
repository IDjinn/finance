import { createContext, useEffect, useState } from "react";
import { ViewProps } from "react-native/types";
import { useTheme } from "styled-components/native";
import Storage from "../data/Storage";

export type CreditCardNumber = string | number;
export type CreditCardData = {
  number: CreditCardNumber;
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
  isLoading: boolean;
  usedLimit: number;
  limit: number;
  creditCards: CreditCardData[];
};

export const CreditCardsContext = createContext<CreditCardsData>(
  {} as CreditCardsData
);

const CreditCardsProvider = ({ children }: ViewProps) => {
  const [creditCards, setCreditCardsData] = useState<CreditCardsData>({
    isLoading: true,
    limit: 8000,
    usedLimit: 2000,
    creditCards: [],
  });

  useEffect(() => {
    (async () => {
      setCreditCardsData({
        isLoading: false,
        limit: 8000,
        usedLimit: 2000,
        creditCards: await Storage.instance.getCreditCards(),
      });
    })();
  }, []);

  return (
    <CreditCardsContext.Provider value={creditCards}>
      {children}
    </CreditCardsContext.Provider>
  );
};

export default CreditCardsProvider;
