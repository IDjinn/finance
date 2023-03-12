import { View, Text } from "react-native";
import React, { Suspense } from "react";
import {
  Column,
  Container,
  CreditCardsContainerText,
  CreditCardsLimitResume,
  IncomingIcon,
  OutgoingIcon,
  Test,
  TotalBalanceContainer,
  TotalBalanceInfoText,
  TotalBalanceValue,
  TotalBalanceWelcomeText,
  TotalContainer,
  TotalContainerText,
  TotalIncomingOutgoingContainer,
  TotalIncomingValue,
  TotalOutgoingValue,
} from "./Styles";
import Card from "../../components/cards/Index";
import { WalletContext } from "../../providers/WalletProvider";
import { balanceToString, percentageOfLimitUsage } from "../../util/money";
import { CreditCardsContext } from "../../providers/CreditCardsProvider";
import CreditCard from "../../components/CreditCard";
import { Centrify } from "../../util/styled/theme";
import MultiProgressBar from "../../components/MultiProgressBar";

export default function Main() {
  const [progressData, setProgressData] = React.useState([
    { progress: 50, color: "rgb(255, 193, 2)" },
    { progress: 30, color: "rgb(55, 106, 255)" },
    { progress: 20, color: "rgb(229, 232, 249)" },
  ]);

  return (
    <Container>
      <WalletContext.Consumer>
        {(wallet) => (
          <TotalBalanceContainer>
            <TotalBalanceInfoText>Saldo em contas</TotalBalanceInfoText>
            <TotalBalanceValue>
              {balanceToString(wallet.currentBalance)}
            </TotalBalanceValue>
            <TotalIncomingOutgoingContainer>
              <TotalContainer>
                <IncomingIcon />
                <Column>
                  <TotalContainerText>Receitas</TotalContainerText>
                  <TotalIncomingValue>
                    {balanceToString(wallet.incomings)}
                  </TotalIncomingValue>
                </Column>
              </TotalContainer>
              <TotalContainer>
                <OutgoingIcon />
                <Column>
                  <TotalContainerText>Despesas</TotalContainerText>
                  <TotalOutgoingValue>
                    {balanceToString(wallet.incomings)}
                  </TotalOutgoingValue>
                </Column>
              </TotalContainer>
            </TotalIncomingOutgoingContainer>
          </TotalBalanceContainer>
        )}
      </WalletContext.Consumer>
      <Card>
        <Test>Money</Test>
        <Test>awsdsqadasd</Test>
      </Card>
      <CreditCardsContext.Consumer>
        {({ creditCards, limit, usedLimit }) => (
          <Card>
            <CreditCardsContainerText>Credit Cards</CreditCardsContainerText>
            <CreditCardsLimitResume>
              Você usou {balanceToString(usedLimit)} de seu limite de{" "}
              {balanceToString(limit)}{" "}
            </CreditCardsLimitResume>
            <MultiProgressBar data={progressData} />
            <Centrify>
              {creditCards.map((creditCard) => (
                <CreditCard key={creditCard.id} creditCard={creditCard} />
              ))}
            </Centrify>
          </Card>
        )}
      </CreditCardsContext.Consumer>
      <Card>
        <Test>Outgoing</Test>
      </Card>
      <Card>
        <Test>Monthly budget</Test>
      </Card>
      <Card>
        <Test>Monthly budget</Test>
      </Card>
      <Card>
        <Test>Monthly budget</Test>
      </Card>
      <Card>
        <Test>Monthly budget</Test>
      </Card>
    </Container>
  );
}
