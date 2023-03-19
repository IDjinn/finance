import {
  Cash,
  Container,
  TotalBalance,
  TotalBalanceContainer,
  WalletCard,
} from "./Styles";
import { Text } from "react-native";
import type { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { balanceToString, BalanceValue, CashIcon } from "../../util/Money";
import { useEffect, useState } from "react";
import { TabRouteParams } from "../../util/Navigator";

export type WalletRouteParamList = {
  action?: "add-account" | "none";
};

type WalletRoute = RouteProp<TabRouteParams, "Wallet">;

export default function Wallet() {
  const [value, setValue] = useState(0);
  const route = useRoute<WalletRoute>();

  if (__DEV__) {
    useEffect(() => {
      const interval = setInterval(() => {
        const negative = Math.floor(Math.random() * 10) >= 7;
        setValue(negative ? -Math.random() : Math.random());
      }, 1000);

      return () => clearInterval(interval);
    }, []);
  }

  return (
    <Container>
      <Cash />
      <TotalBalanceContainer>
        <TotalBalance>TOTAL EM CONTAS</TotalBalance>
        <BalanceValue value={value}>{balanceToString(value)}</BalanceValue>
      </TotalBalanceContainer>
      <WalletCard></WalletCard>
    </Container>
  );
}
