import { createContext, useState } from "react";
import { ViewProps } from "react-native/types";

type CreditCardsData = {
};

export const CreditCardsContext = createContext<CreditCardsData>(
  {} as CreditCardsData
);

const CreditCardsProvider = ({ children }: ViewProps) => {
  const [creditCards, setCreditCardsData] = useState({
  });

  return (
    <CreditCardsContext.Provider value={creditCards}>
      {children}
    </CreditCardsContext.Provider>
  );
};

export default CreditCardsProvider;
