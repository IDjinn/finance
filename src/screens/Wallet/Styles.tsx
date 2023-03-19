import styled from "styled-components/native";
import Card from "../../components/cards/Index";
import { CashIcon } from "../../util/Money";
import { FontEnum, GlobalText, GlobalView } from "../../util/styled/theme";

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const WalletCard = styled(Card)`
  width: 90%;
  height: 65%;
`;

export const TotalBalanceContainer = styled(GlobalView)`
  width: 90%;
  padding-vertical: 20px;
  padding-horizontal: 10px;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const TotalBalance = styled(GlobalText)`
  font-family: ${FontEnum.GraphikMedium};
`;

export const Cash = styled(CashIcon).attrs({
  size: 28,
})`
  margin-bottom: 25px;
`;
