import styled from "styled-components/native";

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})``;

export const TotalBalanceContainer = styled.View`
  height: 150px;
  width: 97%;
  justify-self: flex-start;
  padding-horizontal: 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.colors.primary};
  ${props => props.theme.defaultShadow}

  margin-bottom: 15px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const TotalBalanceWelcomeText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`

export const Test = styled.Text`
  color: red;
`;
