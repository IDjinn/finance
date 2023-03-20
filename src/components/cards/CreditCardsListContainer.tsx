import React from "react";
import { Card } from "react-native-paper";
import styled, { useTheme } from "styled-components/native";
import CreditCardsProvider, {
  CreditCardData,
  CreditCardsContext,
} from "../../providers/CreditCardsProvider";
import { balanceToString, percentageOfLimitUsage } from "../../util/Money";
import { GlobalText, Centrify } from "../../util/styled/theme";
import CreditCard from "../CreditCardDetails";
import MultiProgressBar from "../MultiProgressBar";
import PressableButton from "../PressableButton";
import Icon from "react-native-vector-icons/Feather";

const ColoredIcon = styled(Icon)`
  color: ${(props) => props.theme.colors.variants.text.light};
`;

const AddCreditCardIconContainer = styled.View`
  width: 45px;
  height: 45px;
  border-radius: 45px;
  background-color: ${(props) => props.theme.colors.primary}

  margin-horizontal: 5px;
  align-items: center;
  justify-content: center;
`;
export const CreditCardsContainerText = styled(GlobalText)`
  margin-bottom: 20px;
  font-size: 16px;
`;
export const CreditCardsLimitResume = styled(GlobalText)`
  font-size: 12px;
`;

export const AddCreditCardButton = styled(PressableButton)`
  align-items: center;
  justify-content: center;
`;

export const AddCreditCardIcon = () => (
  <AddCreditCardIconContainer>
    <ColoredIcon name={"plus"} size={20} />
  </AddCreditCardIconContainer>
);

const CreditCardIcon = styled(Icon).attrs({
  name: "credit-card",
  size: 18,
})`
  margin-right: 10px;
`;

const CreditCardsHeaderContainer = styled.View`
  flex-direction: row;
`;

export const AddCreditCardButtonLabel = styled(GlobalText)`
  margin-top: 5px;
  font-size: 10px;
`;

function calculateUsedLimitOfCreditCard(cc: CreditCardData) {
  return {
    color: cc.color,
    progress:
      percentageOfLimitUsage(cc.balance.limit, cc.balance.usedLimit) * 100,
  };
}

export default function CreditCardsListCard() {
  const theme = useTheme();
  return (
    <CreditCardsContext.Consumer>
      {({ creditCards, usedLimit, limit, isLoading }) => {
        return (
          <>
            <CreditCardsHeaderContainer>
              <CreditCardIcon />
              <CreditCardsContainerText>
                Cartões de Crédito
              </CreditCardsContainerText>
            </CreditCardsHeaderContainer>
            <CreditCardsLimitResume>
              Você usou {balanceToString(usedLimit)} de seu limite de{" "}
              {balanceToString(limit)}{" "}
            </CreditCardsLimitResume>
            <MultiProgressBar
              color={theme.colors.variants.background.dark}
              data={creditCards.map(calculateUsedLimitOfCreditCard)}
            />
            <Centrify>
              {creditCards.map((creditCard) => (
                <CreditCard key={creditCard.number} creditCard={creditCard} />
              ))}
              <AddCreditCardButton>
                <AddCreditCardIcon />
                <AddCreditCardButtonLabel>
                  Adicionar cartão
                </AddCreditCardButtonLabel>
              </AddCreditCardButton>
            </Centrify>
          </>
        );
      }}
    </CreditCardsContext.Consumer>
  );
}
