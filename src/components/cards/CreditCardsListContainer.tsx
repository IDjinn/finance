import React from "react";
import { Card } from "react-native-paper";
import styled, { useTheme } from "styled-components";
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
import { useCreditCards } from "../../hooks/useCreditCards";

const ColoredIcon = styled(Icon)`
  color: ${(props) => props.theme.colors.variants.text.light};
`;

const IconView = styled.View`
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
`;
export const CreditCardsLimitResume = styled(GlobalText)`
  font-size: 12px;
`;

export const AddCreditCardButton = styled(PressableButton)`
  align-items: center;
  justify-content: center;
`;

export const AddCreditCardIcon = () => (
  <IconView>
    <ColoredIcon name={"plus"} />
  </IconView>
);

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
      {({ creditCards, usedLimit, limit }) => (
        <>
          <CreditCardsContainerText>Credit Cards</CreditCardsContainerText>
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
      )}
    </CreditCardsContext.Consumer>
  );
}
