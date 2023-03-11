import { createContext, useEffect, useState } from "react";
import { ViewProps } from "react-native/types";

type WalletData = {
  currentBalance: number;
  futureBalance: number;
  incomings: number;
  outgoings: number;
};

export const WalletContext = createContext<WalletData>({} as WalletData);

const WalletProvider = ({ children }: ViewProps) => {
  const [walletData, setWalletData] = useState({
    currentBalance: 0,
    futureBalance: 0,
    incomings: 0,
    outgoings: 0,
  });

  if (__DEV__) {
    useEffect(() => {
      const interval = setInterval(() => {
        setWalletData((prevState) => {
          return { ...prevState, currentBalance: prevState.currentBalance + (Math.random() * 100) };
        });
      }, 1000);

      return () => clearInterval(interval);
    }, []);
  }

  return (
    <WalletContext.Provider value={walletData}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
