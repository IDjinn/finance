import { Container } from "./Styles";

import type { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { Text } from "react-native";
import { TabRouteParams } from "../../util/Navigator";

export type AccountsRouteParamList = {
  action?: "add-account" | "none";
};

type AccountsRoute = RouteProp<TabRouteParams, "Accounts">;

export default function Accounts() {
  const route = useRoute<AccountsRoute>();

  return (
    <Container>
      <Text>{route.params?.action}</Text>
    </Container>
  );
}
