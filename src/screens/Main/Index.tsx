import { View, Text } from "react-native";
import React, { Suspense } from "react";
import {
  Container,
  Test,
  TotalBalanceContainer,
  TotalBalanceWelcomeText,
} from "./Styles";
import Card from "../../components/cards/Index";
import { WalletContext } from "../../providers/WalletProvider";
import { balanceToString, percentageOfLimitUsage } from "../../util/money";
import { CreditCardsContext } from "../../providers/CreditCardsProvider";
import ProgressBar from "../../components/ProgressBar";
import CreditCard from "../../components/CreditCard";

export default function Main() {
  return (
    <Container>
      <WalletContext.Consumer>
        {(wallet) => (
          <TotalBalanceContainer>
            <TotalBalanceWelcomeText>Hello Lucas</TotalBalanceWelcomeText>
            <Text>Saldo em conta {balanceToString(wallet.currentBalance)}</Text>
          </TotalBalanceContainer>
        )}
      </WalletContext.Consumer>
      <Card>
        <Text>Money</Text>
        <Test>awsdsqadasd</Test>
      </Card>
      <CreditCardsContext.Consumer>
        {({ creditCards, limit, usedLimit }) => (
          <Card>
            <ProgressBar progress={percentageOfLimitUsage(limit, usedLimit)} />
            <Text>Credit Cards</Text>
            {creditCards.map((creditCard) => (
              <CreditCard key={creditCard.id} creditCard={creditCard} />
            ))}
          </Card>
        )}
      </CreditCardsContext.Consumer>
      <Card>
        <Text>Outgoing</Text>
      </Card>
      <Card>
        <Text>Monthly budget</Text>
      </Card>
    </Container>
  );
}
