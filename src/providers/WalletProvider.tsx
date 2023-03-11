import { createContext, useState } from "react";
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

  return (
    <WalletContext.Provider value={walletData}>
      {children}
    </WalletContext.Provider>
  );
};


export default WalletProvider;