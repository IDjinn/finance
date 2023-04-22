import { View, Text, SectionList, ViewProps } from "react-native";
import React, { useEffect, useState } from "react";
import { IncomingIcon, OutgoingIcon } from "../screens/Main/Styles";
import { BalanceValue, balanceToString } from "../util/Money";

import {
  IncomingTransaction,
  OutgoingTransaction,
} from "../providers/TransactionsProvider";
import { useTransactions } from "../hooks/useTransactions";
import { DateTime } from "ts-luxon";
import styled from "styled-components/native";
import { GlobalView, GlobalText } from "../util/styled/theme";

const MAX_TRANSACTIONS_SHOWN = 5;
interface Section {
  title: string;
  data: (IncomingTransaction | OutgoingTransaction)[];
}
interface TransactionsPaginatorSettings {
  currentMonth: string;
  data: Section[];
}

const TransactionsContainer = styled(GlobalView)`
  flex: 1;
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
`;

const TransactionsContainerHeader = styled(GlobalText)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;


const Transaction = styled(GlobalView)`
  width: 95%;
  height: 60px;
  align-items: center;
  padding-horizontal: 10px;
  padding-vertical: 5px;
  flex-direction: row;
  margin-bottom: 10px;
  align-self: center;
`;

const IconBox = styled.View`
  flex: 1;
`;
const Balance = styled(BalanceValue)`
  flex: 2;
`;

const TransactionFrom = styled(GlobalText)`
  flex: 1.5;
  margin-horizontal: 10px;
`;

const TransactionTimestamp = styled(GlobalText)`
  flex: 1.5;
`;

const MonthSectionContainer = styled.View`
`;

const MonthText = styled(GlobalText)`
  font-size: 16px;
`;

const MonthSectionContainerDiv = styled.View`
  border-color: ${({ theme }) => theme.colors.variants.background.dark};
  border-bottom-width: 1px;
  margin-top: 5px;
  margin-bottom: 10px;
`;

export interface RecentTransactionsCard extends ViewProps {
  transactions: (IncomingTransaction | OutgoingTransaction)[];
}

const safeCastToIncoming = (
  t: IncomingTransaction | OutgoingTransaction
): t is IncomingTransaction =>
  (t as IncomingTransaction)?.targetAccount !== undefined;

export default function RecentTransactions({
  transactions,
  ...props
}: RecentTransactionsCard) {
  const [settings, setSettings] = useState<TransactionsPaginatorSettings>({
    currentMonth: "04/04",
    data: [],
  });

  useEffect(() => {
    const selectedMonthDateTime = DateTime.fromFormat(
      settings.currentMonth,
      "MM/yy"
    );
    const recentTransactions = transactions
      .filter((t) => t.timestamp.toMillis() >= selectedMonthDateTime.toMillis())
      .sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis())
      .slice(0, MAX_TRANSACTIONS_SHOWN);

    const data: Section[] = [];
    for (const transaction of recentTransactions) {
      const section = data.find(
        (x) => x.title == transaction.timestamp.toFormat("MM/yy")
      );
      if (section) {
        section.data.push(transaction);
        continue;
      }

      data.push({
        title: transaction.timestamp.toFormat("MM/yy"),
        data: [transaction],
      });
    }

    setSettings({
      currentMonth: settings.currentMonth,
      data,
    });
  }, [transactions]);

  return (
    <TransactionsContainer {...props}>
      <TransactionsContainerHeader>
        Transferências Recentes
      </TransactionsContainerHeader>
      <SectionList
        sections={settings.data}
        keyExtractor={(item, index) => item.id + index}
        renderSectionHeader={({ section: { title: month } }) => (
          <MonthSectionContainer>
            <MonthText>{month}</MonthText>
            <MonthSectionContainerDiv/>
          </MonthSectionContainer>
        )}
        renderItem={({ item: transaction }) => {
          const isIncoming = safeCastToIncoming(transaction);
          const moneyFrom = isIncoming ? transaction.from : transaction.to;
          const moneyTo = isIncoming
            ? transaction.targetAccount?.nickname
            : transaction.fromAccount?.nickname;

          return (
            <Transaction>
              <IconBox>
                {isIncoming ? (
                  <IncomingIcon size={32} disabled />
                ) : (
                  <OutgoingIcon size={32} disabled />
                )}
              </IconBox>
              <Balance value={transaction.amount} isNegative={!isIncoming}>
                {balanceToString(transaction.amount)}
              </Balance>
              <TransactionFrom>
                {moneyFrom} para {moneyTo}
              </TransactionFrom>
              <TransactionTimestamp>
                {transaction.timestamp.toFormat("dd/MM/yy")}
              </TransactionTimestamp>
            </Transaction>
          );
        }}
      />
    </TransactionsContainer>
  );
}
