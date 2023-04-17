import {
  CategoriesContainer,
  Container,
  DateContainer,
  DateText,
  NewIncomingContainer,
  NewIncomingForm,
  NewIncomingHeader,
  NewIncomingValueContainer,
  NewIncomingValueText,
  SwitchContainer,
  SwitchText,
} from "./Styles";
import { Text, ToastAndroid } from "react-native";
import { useTransactions } from "../../hooks/useTransactions";
import { useReducer } from "react";
import { DateTime } from "ts-luxon";
import MoneyInput from "../../components/MoneyInput";
import Icon from "react-native-vector-icons/Feather";
import styled from "styled-components/native";
import { useTheme } from "styled-components";
import { Switch } from "@rneui/base";
import DateTimePicker from "@react-native-community/datetimepicker";
import PressableButton from "../../components/PressableButton";
import RecentTransactions from "../../components/RecentTransactions";
import { TransactionsContext } from "../../providers/TransactionsProvider";

type NewIncoming = {
  value: number;
  alreadyReceived: boolean;
  showDatePicker: boolean;
  timestamp: DateTime;
  description?: string;
  category: "idk";
  attachments: [];
};

const initialState: NewIncoming = {
  value: 0,
  showDatePicker: false,
  alreadyReceived: true,
  timestamp: DateTime.now(),
  category: "idk",
  attachments: [],
};

type ActionSetValue = {
  type: "SET_VALUE";
  payload: number;
};

type ActionAlreadyReceived = {
  type: "SET_ALREADY_RECEIVED";
  payload: boolean;
};

type ActionSetTimestamp = {
  type: "SET_TIMESTAMP";
  payload: DateTime;
};

type ActionSetDescription = {
  type: "SET_DESCRIPTION";
  payload?: string;
};

type ActionSetVisibilityDatePicker = {
  type: "SET_SHOW_DATEPICKER";
  payload: boolean;
};

type Action =
  | ActionSetValue
  | ActionAlreadyReceived
  | ActionSetTimestamp
  | ActionSetDescription
  | ActionSetVisibilityDatePicker;

function newTransationReducer(state: NewIncoming, action: Action): NewIncoming {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, value: action.payload };
    case "SET_ALREADY_RECEIVED":
      return { ...state, alreadyReceived: action.payload };
    case "SET_TIMESTAMP":
      return { ...state, timestamp: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_SHOW_DATEPICKER":
      return { ...state, showDatePicker: action.payload };
  }
}

const IconContainer = styled(PressableButton)`
  width: 45px;
  height: 45px;

  position: absolute;
  bottom: 15px;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: green;
  border-radius: 45px;
`;

const Incomings = styled(RecentTransactions)`
  width: 100%;
  height: 40%;
`;

export default function Incoming() {
  const theme = useTheme();
  const [newIncoming, dispatchNewIncoming] = useReducer(
    newTransationReducer,
    initialState
  );

  const submit = () => {
    ToastAndroid.show("ok: " + JSON.stringify(newIncoming), 100);
  };

  return (
    <Container>
      <TransactionsContext.Consumer>
        {({ incomings }) => <Incomings transactions={incomings} />}
      </TransactionsContext.Consumer>
      <NewIncomingContainer>
        <NewIncomingHeader>Nova Receita</NewIncomingHeader>
        <NewIncomingForm>
          <NewIncomingValueContainer>
            <NewIncomingValueText>Valor</NewIncomingValueText>
            <MoneyInput
              value={newIncoming.value}
              onChangeValue={(value) =>
                value &&
                dispatchNewIncoming({
                  type: "SET_VALUE",
                  payload: value,
                })
              }
            />
          </NewIncomingValueContainer>
          <SwitchContainer>
            <Switch
              style={{ alignSelf: "flex-start" }}
              color={theme.colors.secondary}
              value={newIncoming.alreadyReceived}
              onValueChange={(value) =>
                dispatchNewIncoming({
                  type: "SET_ALREADY_RECEIVED",
                  payload: value,
                })
              }
            />
            <SwitchText>Já recebido</SwitchText>
          </SwitchContainer>
          <DateContainer
            onPress={() =>
              dispatchNewIncoming({
                type: "SET_SHOW_DATEPICKER",
                payload: !newIncoming.showDatePicker,
              })
            }
          >
            {newIncoming.showDatePicker && (
              <DateTimePicker
                mode={"date"}
                value={newIncoming.timestamp.toJSDate()}
                onChange={(event, date) => {
                  dispatchNewIncoming({
                    type: "SET_SHOW_DATEPICKER",
                    payload: false,
                  });
                  if (event.type == "set") {
                    dispatchNewIncoming({
                      type: "SET_TIMESTAMP",
                      payload: DateTime.fromJSDate(date ?? new Date()),
                    });
                  }
                }}
              />
            )}
            <DateText>{newIncoming.timestamp?.toFormat("dd/MM/yyyy")}</DateText>
          </DateContainer>
          <CategoriesContainer>
            <Text>TODO: categories</Text>
          </CategoriesContainer>
          <IconContainer onPress={submit}>
            <Icon name={"check"} color={"#fff"} size={24} />
          </IconContainer>
        </NewIncomingForm>
      </NewIncomingContainer>
    </Container>
  );
}
