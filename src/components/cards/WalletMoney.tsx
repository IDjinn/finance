import { View, Text } from "react-native";
import React from "react";
import { AccountsContext } from "../../providers/AccountsProvider";
import styled from "styled-components/native";
import { balanceToString, BalanceValue, CashIcon } from "../../util/Money";
import {
  Centrify,
  FontEnum,
  getColorBrightness,
  GlobalText,
} from "../../util/styled/theme";
import PressableButton from "../PressableButton";
import { useTheme } from "styled-components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Column, Row } from "../../screens/Main/Styles";
import { TabNavigation, TabPages } from "../../util/Navigator";

const WalletBalanceContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const AccountNameContainer = styled.View`
  flex-direction: row;
`;

const SpacedRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Div = styled.View`
  border-radius: 1px;
  border-width: 1px;
  border-style: ${({ theme }) => theme.borderStyle};
  border-color: ${({ theme }) => theme.borderColor};

  margin-vertical: 10px;
`;

const TotalText = styled(GlobalText)`
  font-family: ${FontEnum.GraphikMedium}
  font-size: 14px;
`;
const AccountTotalText = styled(GlobalText)`
  font-family: ${FontEnum.GraphikMedium}
  font-size: 12px;
`;

const BankStatementButton = styled(PressableButton)`
  background-color: ${({ theme }) => theme.colors.primary}
  width: 145px;
  height: 45px;
  padding-horizontal: 12px;
  padding-vertical: 5px;
  justify-items: center;
  align-items: center;
  
  border-radius: 100px;
  margin-top: 20px;
  padding-vertical: 10px;
`;

const BankStatementButtonText = styled(GlobalText)`
  font-size: 14px;
  font-family: ${FontEnum.GraphikRegular};
  text-align: center;
  text-align-vertical: center;
`;

const AddAccountButton = styled(PressableButton)`
  background-color: ${({ theme }) => theme.colors.primary}
  width: 145px;
  height: 45px;
  padding-horizontal: 12px;
  padding-vertical: 5px;
  justify-items: center;
  align-items: center;
  
  border-radius: 100px;
  margin-top: 20px;
  padding-vertical: 10px;
`;

const AddAccountButtonText = styled(GlobalText)`
  font-size: 14px;
  font-family: ${FontEnum.GraphikRegular};
  text-align: center;
  text-align-vertical: center;
`;

const WalletButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center
  justify-content: space-between;
`;

const TotalBalanceValue = styled(BalanceValue)`
  font-size: 16px;
  font-weight: bold;
`;

export default function WalletMoneyCard() {
  const [isAddingAccount, setIsAddingAccount] = React.useState(false);
  const [isLoadingStatement, setIsLoadingStatement] = React.useState(false);
  const navigation = useNavigation<TabNavigation>();
  const theme = useTheme();

  const addAccountHandler = () => {
    setIsAddingAccount(true);
    navigation.navigate(TabPages.Accounts, { action: "add-account" });
    setIsAddingAccount(false);
  };

  const makeStatemant = () => {
    setIsLoadingStatement(true);
    setIsLoadingStatement(false);
  };

  return (
    <AccountsContext.Consumer>
      {({ accounts, totalBalance, totalDebt, balance }) => (
        <>
          <WalletBalanceContainer>
            <Row>
              <CashIcon />
              <Text>Carteira</Text>
            </Row>
            <TotalBalanceValue value={balance}>
              {balanceToString(balance)}
            </TotalBalanceValue>
          </WalletBalanceContainer>
          <Div />
          <SpacedRow>
            <TotalText>Total</TotalText>
            <TotalText>{balanceToString(totalBalance)}</TotalText>
          </SpacedRow>
          {accounts.map((account) => (
            <SpacedRow key={account.nickname}>
              <AccountTotalText>{account.nickname}</AccountTotalText>
              <BalanceValue value={account.balance}>
                {balanceToString(account.balance)}
              </BalanceValue>
            </SpacedRow>
          ))}
          <WalletButtonsContainer>
            <BankStatementButton
              isLoading={isLoadingStatement}
              onPress={makeStatemant}
              activityIndicatorColor={theme.colors.variants.primary.light}
            >
              <BankStatementButtonText brightness="dark">
                Extrato
              </BankStatementButtonText>
            </BankStatementButton>
            <AddAccountButton
              isLoading={isAddingAccount}
              onPress={addAccountHandler}
              activityIndicatorColor={theme.colors.variants.primary.light}
            >
              <AddAccountButtonText brightness="dark">
                Adicionar conta
              </AddAccountButtonText>
            </AddAccountButton>
          </WalletButtonsContainer>
        </>
      )}
    </AccountsContext.Consumer>
  );
}
