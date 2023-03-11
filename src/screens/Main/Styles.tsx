import styled from "styled-components/native";
import { GlobalText, GlobalView } from "../../util/styled/theme";

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})``;

export const TotalBalanceContainer = styled(GlobalView)`
  height: 150px;
  width: 97%;
  justify-self: flex-start;
  padding-horizontal: 10px;
  padding-top: 30px;

  margin-bottom: 15px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const TotalBalanceWelcomeText = styled(GlobalText)`
  font-size: 18px;
  font-weight: bold;
`;

export const Test = styled(GlobalText)`
`;
