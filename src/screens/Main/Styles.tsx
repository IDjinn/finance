import React from "react";
import styled from "styled-components/native";
import { FontEnum, GlobalText, GlobalView } from "../../util/styled/theme";
import Icon from "react-native-vector-icons/Feather";
import PressableButton, {
  PressableButtonProps,
} from "../../components/PressableButton";
import RecentTransactions from "../../components/RecentTransactions";

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
})``;

export const TotalBalanceContainer = styled(GlobalView)`
  height: 150px;
  width: 97%;
  justify-self: flex-start;
  padding-horizontal: 15px;
  align-items: center;
  justify-content: center;

  margin-bottom: 15px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const TotalBalanceWelcomeText = styled(GlobalText)`
  font-size: 18px;
  font-family: ${FontEnum.GraphikBlack};
`;

export const TotalBalanceInfoText = styled(GlobalText)`
  font-size: 16px;
  margin-top: 20px;
`;
export const TotalBalanceValue = styled(GlobalText)`
  font-size: 22px;
  font-family: ${FontEnum.GraphikBold};
  margin-bottom: 10px;
`;

export const TotalIncomingOutgoingContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TotalContainer = styled.View`
  margin-horizontal: 15px;
  flex-direction: row;
`;

export const IconView = styled(PressableButton)`
  width: ${({ size }) => size ?? 45}px;
  height:  ${({ size }) => size ?? 45}px;;
  border-radius: 45px;
  background-color: ${(props) => props.theme.colors.primary}

  margin-horizontal: 5px;
  align-items: center;
  justify-content: center;
`;

export const Row = styled.View`
  flex-direction: row;
`;
export const Column = styled.View`
  flex-direction: column;
`;

export const ColoredIcon = styled(Icon)`
  color: ${(props) => props.theme.colors.variants.text.light};
`;

export const IncomingIcon = ({ onPress, size, disabled }: any) => (
  <IconView
    style={{ backgroundColor: "green" }}
    onPress={onPress ?? (() => {})}
    size={size}
    disabled={disabled}
  >
    <ColoredIcon name={"log-in"} />
  </IconView>
);

export const OutgoingIcon = ({ onPress, size, disabled }: any) => (
  <IconView
    style={{ backgroundColor: "red" }}
    onPress={onPress ?? (() => {})}
    size={size}
    disabled={disabled}
  >
    <ColoredIcon name={"log-out"} />
  </IconView>
);

export const TotalContainerText = styled(GlobalText)``;
export const TotalIncomingValue = styled(GlobalText)`
  color: green;
`;
export const TotalOutgoingValue = styled(GlobalText)`
  color: red;
`;

export const Test = styled(GlobalText)``;

export const TransactionsContainer = styled(RecentTransactions)`
  width: 90%;
`;
