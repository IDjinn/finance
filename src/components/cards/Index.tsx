import { View, Text, ViewProps } from "react-native";
import React from "react";
import styled from "styled-components/native";

export const Container = styled.View<CardProps>`
  width: 90%;
  min-height: ${(props) => (props.height ? props.height : "120px")}
  margin-bottom: 15px;
  padding: 20px;

  background-color: ${(props) => props.theme.colors.variants.background.light};
  box-shadow: ${(props) => props.theme.boxShadow}
  border-color: ${(props) => props.theme.borderColor}
  border-radius: ${(props) => props.theme.borderRadius}
  border-style: ${(props) => props.theme.borderStyle}
  border-width: ${(props) => props.theme.borderWidth}
`;

export interface CardProps extends ViewProps {
  height?: number;
}

export default function Card(props: CardProps) {
  return <Container {...props}>{props.children}</Container>;
}
