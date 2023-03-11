import * as Font from "expo-font";
import styled from "styled-components/native";

export default {
  colors: {
    primary: "#8A05BE",
    secondary: "#9B49C1",
    background: "#f0f2f5",
    text: "#000",
    textSecondary: "#808080",
    variants: {
      primary: {
        light: "#B462E2",
        dark: "#6D007B",
      },
      secondary: {
        light: "#C57DD4",
        dark: "#813395",
      },
      background: {
        light: "#FAFAFC",
        dark: "#E3E6F0",
      },
      text: {
        light: "#FFF",
        dark: "#2C2C2C",
      },
      textSecondary: {
        light: "#BEBEBE",
        dark: "#4D4D4D",
      },
    },
  },
  borderRadius: "10px",

  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#dcdcdc",
  font: {
    family: "GraphikBlack",
  },
};

export const GlobalText = styled.Text`
  font-family: ${(props) => props.theme.font.family};
`;

export const GlobalBoxShadow = styled.View`
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const GlobalBorder = styled.View`
  border-width: ${({ theme }) => theme.borderWidth};
  border-style: ${({ theme }) => theme.borderStyle};
  border-color: ${({ theme }) => theme.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const GlobalView = styled.View`
  background-color: ${({ theme }) => theme.colors.variants.background.light};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-width: ${({ theme }) => theme.borderWidth};
  border-style: ${({ theme }) => theme.borderStyle};
  border-color: ${({ theme }) => theme.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const loadFonts = async () => {
  console.log("Loading fonts...");
  await Font.loadAsync({
    GraphikBlack: require("../../../assets/fonts/GraphikBlack.otf"),
    GraphikBlackItalic: require("../../../assets/fonts/GraphikBlackItalic.otf"),
    GraphikBold: require("../../../assets/fonts/GraphikBold.otf"),
    GraphikBoldItalic: require("../../../assets/fonts/GraphikBoldItalic.otf"),
    GraphikExtralight: require("../../../assets/fonts/GraphikExtralight.otf"),
    GraphikExtralightItalic: require("../../../assets/fonts/GraphikExtralightItalic.otf"),
    GraphikLight: require("../../../assets/fonts/GraphikLight.otf"),
    GraphikLightItalic: require("../../../assets/fonts/GraphikLightItalic.otf"),
    GraphikMedium: require("../../../assets/fonts/GraphikMedium.otf"),
    GraphikMediumItalic: require("../../../assets/fonts/GraphikMediumItalic.otf"),
    GraphikRegular: require("../../../assets/fonts/GraphikRegular.otf"),
    GraphikRegularItalic: require("../../../assets/fonts/GraphikRegularItalic.otf"),
    GraphikSemibold: require("../../../assets/fonts/GraphikSemibold.otf"),
    GraphikSemiboldItalic: require("../../../assets/fonts/GraphikSemiboldItalic.otf"),
    GraphikSuper: require("../../../assets/fonts/GraphikSuper.otf"),
    GraphikSuperItalic: require("../../../assets/fonts/GraphikSuperItalic.otf"),
    GraphikThin: require("../../../assets/fonts/GraphikThin.otf"),
    GraphikThinItalic: require("../../../assets/fonts/GraphikThinItalic.otf"),
  });
  console.log("Fonts loaded!");
};
