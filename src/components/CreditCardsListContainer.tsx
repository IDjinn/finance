import React from "react";
import { Card } from "react-native-paper";
import styled from "styled-components";
import CreditCardsProvider, {
  CreditCardData,
  CreditCardsContext,
} from "../providers/CreditCardsProvider";
import { balanceToString } from "../util/money";
import { GlobalText, Centrify } from "../util/styled/theme";
import CreditCard from "./CreditCard";
import MultiProgressBar from "./MultiProgressBar";
import PressableButton from "./PressableButton";
import Icon from "react-native-vector-icons/Feather";

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

export default function CreditCardsListContainer() {
  const [progressData, setProgressData] = React.useState([
    { progress: 50, color: "rgb(255, 193, 2)" },
    { progress: 30, color: "rgb(55, 106, 255)" },
    { progress: 20, color: "rgb(229, 232, 249)" },
  ]);

  return (
    <CreditCardsContext.Consumer>
      {({ usedLimit, limit, creditCards }) => (
        <>
          <CreditCardsContainerText>Credit Cards</CreditCardsContainerText>
          <CreditCardsLimitResume>
            Você usou {balanceToString(usedLimit)} de seu limite de{" "}
            {balanceToString(limit)}{" "}
          </CreditCardsLimitResume>
          <MultiProgressBar data={progressData} />
          <Centrify>
            {creditCards.map((creditCard) => (
              <CreditCard key={creditCard.id} creditCard={creditCard} />
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
