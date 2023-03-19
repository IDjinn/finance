import { View, Text } from "react-native";
import React, { Suspense } from "react";
import {
  Column,
  Container,
  IncomingIcon,
  OutgoingIcon,
  Test,
  TotalBalanceContainer,
  TotalBalanceInfoText,
  TotalBalanceValue,
  TotalContainer,
  TotalContainerText,
  TotalIncomingOutgoingContainer,
  TotalIncomingValue,
  TotalOutgoingValue,
} from "./Styles";
import Card from "../../components/cards/Index";
import { WalletContext } from "../../providers/WalletProvider";
import { balanceToString } from "../../util/Money";
import CreditCardsListCard from "../../components/cards/CreditCardsListContainer";
import WalletMoneyCard from "../../components/cards/WalletMoney";
import { NavigationProp } from "@react-navigation/native";

export default function Main() {
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
        <WalletMoneyCard />
      </Card>
      <Card>
        <CreditCardsListCard />
      </Card>
      <Card>
        <Test>Outgoing</Test>
      </Card>
      <Card>
        <Test>Monthly budget</Test>
      </Card>
    </Container>
  );
}
