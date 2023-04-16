import { View, Text, SectionList, ViewProps } from "react-native";
import React, { useEffect, useState } from "react";
import { IncomingIcon } from "../screens/Main/Styles";
import { BalanceValue, balanceToString } from "../util/Money";

import { IncomingTransaction } from "../providers/TransactionsProvider";
import { useTransactions } from "../hooks/useTransactions";
import { DateTime } from "ts-luxon";
import styled from "styled-components/native";
import { GlobalView, GlobalText } from "../util/styled/theme";


const MAX_TRANSACTIONS_SHOWN = 5;
interface Section {
  title: string;
  data: IncomingTransaction[];
}
interface IncomingPaginatorSettings {
  currentMonth: string;
  data: Section[];
}
export const TransactionsContainer = styled(GlobalView)`
  flex: 1;
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
`;

export const TransactionsContainerHeader = styled(GlobalText)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const SelectedMonthText = styled(GlobalText)``;

export const IncomingTransactions = styled.View``;

export const Transaction = styled(GlobalView)`
  width: 100%;
  height: 60px;
  align-items: center;
  padding-horizontal: 10px;
  padding-vertical: 5px;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const TransactionFrom = styled(GlobalText)`
  flex: 1;
  margin-horizontal: 5px;
`;

export const TransactionTargetAccount = styled(GlobalText)``;

export const TransactionTimestamp = styled(GlobalText)``;

export default function IncomingsList(props: ViewProps) {
  const transactions = useTransactions();
  const [settings, setSettings] = useState<IncomingPaginatorSettings>({
    currentMonth: "04/04",
    data: [],
  });

  useEffect(() => {
    const selectedMonthDateTime = DateTime.fromFormat(
      settings.currentMonth,
      "MM/yy"
    );
    const incomings = transactions.incomings
      .filter((t) => t.timestamp.toMillis() >= selectedMonthDateTime.toMillis())
      .sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis())
      .slice(0, MAX_TRANSACTIONS_SHOWN);

    const data: Section[] = [];
    for (const incoming of incomings) {
      const section = data.find(
        (x) => x.title == incoming.timestamp.toFormat("MM/yy")
      );
      if (section) {
        section.data.push(incoming);
        continue;
      }

      data.push({
        title: incoming.timestamp.toFormat("MM/yy"),
        data: [incoming],
      });
    }

    setSettings({
      currentMonth: settings.currentMonth,
      data,
    });
  }, [transactions.incomings]);
  return (
    <TransactionsContainer {...props}>
      <TransactionsContainerHeader>
        Transferências Recentes
      </TransactionsContainerHeader>
      <SectionList
        sections={settings.data}
        keyExtractor={(item, index) => item.id + index}
        renderSectionHeader={({ section: { title: month } }) => (
          <SelectedMonthText>{month}</SelectedMonthText>
        )}
        renderItem={({ item: t }) => {
          return (
            <Transaction>
              <IncomingIcon size={35} />
              <BalanceValue value={t.amount}>
                {balanceToString(t.amount)}
              </BalanceValue>
              <TransactionFrom>
                {t.from} para {t.targetAccount?.nickname}
              </TransactionFrom>
              <TransactionTimestamp>
                {t.timestamp.toFormat("dd/MM/yy")}
              </TransactionTimestamp>
            </Transaction>
          );
        }}
      />
    </TransactionsContainer>
  );
}
