import React from "react";
import {
  Column,
  Container,
  IncomingIcon,
  TransactionsContainer,
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
import { useNavigation } from "@react-navigation/native";
import { AppStackPages } from "../../navigator/AppNavigator";
import { TransactionsContext } from "../../providers/TransactionsProvider";

export default function Main() {
  const navigation = useNavigation();
  const addIncoming = () => {
    navigation.navigate(AppStackPages.Incoming);
  };

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
                <IncomingIcon onPress={addIncoming} />
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
      <TransactionsContext.Consumer>
        {({ all }) => <TransactionsContainer transactions={all} />}
      </TransactionsContext.Consumer>
      <Card>
        <Test>Outgoing</Test>
      </Card>
      <Card>
        <Test>Monthly budget</Test>
      </Card>
    </Container>
  );
}
