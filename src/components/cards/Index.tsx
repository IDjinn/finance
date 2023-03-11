import { View, Text, ViewProps } from "react-native";
import React from "react";
import styled from "styled-components/native";

export const Container = styled.View<CardProps>`
  width: 95%;
  height: ${(props) => (props.height ? props.height : "120px")}
  background-color: white;
  margin-bottom: 15px;
  padding-horizontal: 25px;
  padding-vertical: 15px;

  ${(props) => props.theme.border}
  ${(props) => props.theme.shadow}
`;

interface CardProps extends ViewProps {
  height?: number;
}

export default function Card(props: CardProps) {
  return (
    <Container {...props}>
      <Text>Card</Text>
    </Container>
  );
}
