import { View, ViewProps } from "react-native";
import React from "react";
import { CreditCardData } from "../providers/CreditCardsProvider";
import ProgressBar from "./ProgressBar";
import { balanceToString, percentageOfLimitUsage } from "../util/money";
import Card, { CardProps } from "./cards/Index";
import styled from "styled-components/native";
import { FontEnum, getColorBrightness, GlobalText } from "../util/styled/theme";

interface CreditCardProps extends ViewProps {
  creditCard: CreditCardData;
}

const LimitContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const CreditCardInfoContainer = styled.View`
  margin-top: 5px;
  flex-direction: row;
  justify-content: space-between;
`;

const CreditCardNumber = styled(GlobalText)`
  font-family: ${FontEnum.GraphikMedium};
`;

const CreditCardNickname = styled(GlobalText)`
  font-size: 12px;
`;
const CreditCardExpireDate = styled(GlobalText)`
  font-size: 12px;
`;

interface ContainerProps extends CardProps {
  color?: string;
}

const Container = styled(Card)<ContainerProps>`
  background-color: ${(props) =>
    props.color ?? props.theme.colors.variants.primary.light};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const LimitValueText = styled(GlobalText)`
  font-family: ${FontEnum.GraphikBlack};
`;
const LimitInfotext = styled(GlobalText)`
  font-size: 10px;
  font-family: ${FontEnum.GraphikLight};
`;

export default function CreditCard({ creditCard }: CreditCardProps) {
  const colorBrightness = getColorBrightness(creditCard.color);
  return (
    <Container color={creditCard.color}>
      <Row>
        <LimitContainer>
          <LimitValueText brightness={colorBrightness}>
            {balanceToString(creditCard.balance.usedLimit)}
          </LimitValueText>
          <LimitInfotext brightness={colorBrightness}>
            Limite usado
          </LimitInfotext>
        </LimitContainer>
        <LimitContainer>
          <LimitValueText brightness={colorBrightness}>
            {balanceToString(creditCard.balance.limit)}
          </LimitValueText>
          <LimitInfotext brightness={colorBrightness}>
            Limite disponpível
          </LimitInfotext>
        </LimitContainer>
      </Row>
      <ProgressBar
        color={creditCard.variantColor}
        progress={percentageOfLimitUsage(
          creditCard.balance.limit,
          creditCard.balance.usedLimit
        )}
      />
      <CreditCardNumber brightness={colorBrightness}>
        {creditCard.id}
      </CreditCardNumber>
      <CreditCardInfoContainer>
        <CreditCardNickname brightness={colorBrightness}>
          {creditCard.nickname.toUpperCase()}
        </CreditCardNickname>
        <CreditCardExpireDate brightness={colorBrightness}>
          {creditCard.expireDate}
        </CreditCardExpireDate>
      </CreditCardInfoContainer>
    </Container>
  );
}
