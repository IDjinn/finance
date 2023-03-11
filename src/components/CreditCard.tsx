import { View, Text, ViewProps } from "react-native";
import React from "react";
import { CreditCardData } from "../providers/CreditCardsProvider";
import ProgressBar from "./ProgressBar";
import { percentageOfLimitUsage } from "../util/money";

export interface CreditCardProps extends ViewProps {
  creditCard: CreditCardData;
}

export default function CreditCard({ creditCard }: CreditCardProps) {
  return (
    <View>
      <ProgressBar
        progress={percentageOfLimitUsage(
          creditCard.balance.limit,
          creditCard.balance.usedLimit
        )}
      />
      <Text>{creditCard.nickname}</Text>
    </View>
  );
}
