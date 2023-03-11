import { View, Text } from "react-native";
import React from "react";
import {
  Container,
  Test,
  TotalBalanceContainer,
  TotalBalanceWelcomeText,
} from "./Styles";
import Card from "../../components/cards/Index";
import { useWallet } from "../../hooks/useWallet";

export default function Main() {
  const wallet = useWallet();

  return (
    <Container>
      <TotalBalanceContainer>
        <TotalBalanceWelcomeText>Hello Lucas</TotalBalanceWelcomeText>
        <Text>Saldo em conta {wallet.currentBalance}</Text>
      </TotalBalanceContainer>
      <Card>
        <Text>Money</Text>
      </Card>
      <Card>
        <Text>Credit Cards</Text>
      </Card>
      <Card>
        <Text>Outgoing</Text>
      </Card>
      <Card>
        <Text>Monthly budget</Text>
      </Card>
    </Container>
  );
}
