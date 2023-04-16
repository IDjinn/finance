import styled from "styled-components/native";
import {
  FontEnum,
  GlobalBorder,
  GlobalText,
  GlobalView,
} from "../../util/styled/theme";
import { Switch } from "@rneui/base";
import PressableButton from "../../components/PressableButton";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 5%;
  padding-horizontal: 5%;
`;

export const NewIncomingHeader = styled(GlobalText)`
  font-size: 18px;
  font-family: ${FontEnum.GraphikRegular};
`;

export const NewIncomingContainer = styled(GlobalView)`
  width: 100%;
  flex: 1;
  flex-direction: column;
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
`;


export const NewIncomingForm = styled.View`
  flex: 1;
  margin-horizontal: 10px;
`;

export const MonthSelector = styled.View`
  width: 95%;
`;


export const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SwitchText = styled(GlobalText)`
  margin-left: 15px;
`;

export const DateContainer = styled(PressableButton)`
  flex-direction: row;
  align-items: center;
`;

export const DateText = styled(GlobalText)``;

export const NewIncomingValueContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const NewIncomingValueText = styled(GlobalText)`
  margin-right: 5px;
`;

export const CategoriesContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
