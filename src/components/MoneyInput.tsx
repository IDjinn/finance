import { View, Text, TextInput, ViewProps } from "react-native";
import React from "react";
import CurrencyInput, { CurrencyInputProps } from "react-native-currency-input";
import styled from "styled-components/native";
import { FontEnum } from "../util/styled/theme";

const FancyCurrencyInput = styled(CurrencyInput)`
  font-size: 20px;
  font-family: ${FontEnum.GraphikBold};
  color: ${({ value }) => value! > 0 ? "green" : "red"};
`;

export interface MoneyInputProps extends ViewProps {
  value: number;
  onChangeValue: (newValue: number) => void;
}
export default function MoneyInput({ value, onChangeValue, ...props }: MoneyInputProps) {
  return (
    <FancyCurrencyInput
      {...props}
      value={value}
      prefix="R$ " // TODO : localized
      delimiter="."
      separator=","
      precision={2}
      onChangeValue={onChangeValue}
    />
  );
}
