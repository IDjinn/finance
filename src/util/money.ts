import { CreditCardData } from "../providers/CreditCardsProvider";

const format = new Intl.NumberFormat("pt-Br", {
  currency: "BRL",
  style: "currency",
});

export const balanceToString = (value: number) => format.format(value);

export const percentageOfLimitUsage = (limit: number, usedLimit: number) => {
  return usedLimit / limit;
};

import Icon from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import { GlobalText } from "./styled/theme";
export const CashIcon = styled(Icon).attrs({
  name: "md-cash-outline",
})`
  font-size: ${({size}) => size??24}px;
  color: green;
  margin-right: 10px;
`;

interface BalanceValueProps {
  value: number;
}
export const BalanceValue = styled(GlobalText)<BalanceValueProps>`
  color: ${({ value }) => {
    if (value.toFixed(2) === "0.00") return "blue";
    else if (value > 0) return "green";
    else return "red";
  }};
`;