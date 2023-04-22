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

export const NewOutoingHeader = styled(GlobalText)`
  font-size: 18px;
  font-family: ${FontEnum.GraphikRegular};
`;

export const NewOutoingContainer = styled(GlobalView)`
  width: 100%;
  flex: 1;
  flex-direction: column;
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
`;

export const NewOutoingForm = styled.View`
  flex: 1;
  margin-horizontal: 10px;
`;

export const MonthSelector = styled.View`
  width: 95%;
`;

export const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;

  height: 15%;
`;

export const SwitchText = styled(GlobalText)`
  margin-left: 15px;
`;

export const DateContainer = styled(PressableButton)`
  flex-direction: row;
  align-items: center;

  height: 15%;
`;

export const DateText = styled(GlobalText)`
  margin-right: 10px;
  flex: 9;
`;

export const NewOutoingValueContainer = styled.View`
  flex-direction: row;
  align-items: center;

  height: 15%;
`;

export const NewOutoingValueText = styled(GlobalText)`
  margin-right: 5px;
`;

export const CategoriesContainer = styled.View`
  flex-direction: row;
  align-items: center;

  height: 15%;
`;

export const Divisor = styled.View`
  border-bottom-width: 2px;
  border-color: gray;
`;
