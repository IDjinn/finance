import * as Font from "expo-font";
import styled from "styled-components/native";

export const FontEnum = Object.freeze({
  GraphikBlack: "GraphikBlack",
  GraphikBlackItalic: "GraphikBlackItalic",
  GraphikBold: "GraphikBold",
  GraphikBoldItalic: "GraphikBoldItalic",
  GraphikExtralight: "GraphikExtralight",
  GraphikExtralightItalic: "GraphikExtralightItalic",
  GraphikLight: "GraphikLight",
  GraphikLightItalic: "GraphikLightItalic",
  GraphikMedium: "GraphikMedium",
  GraphikMediumItalic: "GraphikMediumItalic",
  GraphikRegular: "GraphikRegular",
  GraphikRegularItalic: "GraphikRegularItalic",
  GraphikSemibold: "GraphikSemibold",
  GraphikSemiboldItalic: "GraphikSemiboldItalic",
  GraphikSuper: "GraphikSuper",
  GraphikSuperItalic: "GraphikSuperItalic",
  GraphikThin: "GraphikThin",
  GraphikThinItalic: "GraphikThinItalic",
});

export default {
  colors: {
    primary: "#8A05BE",
    secondary: "#9B49C1",
    background: "#f0f2f5",
    text: {
      color: "#000",
      fontFamily: FontEnum.GraphikRegular,
    },
    textSecondary: {
      color: "#808080",
      fontFamily: FontEnum.GraphikLight,
    },
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
    family: FontEnum.GraphikRegular,
  },
};

export const Centrify = styled.View`
  align-items: center;
  justify-content: center;
`;

export interface ColorBrightness {
  brightness?: "light" | "dark" | "unknown";
}
export const GlobalText = styled.Text<ColorBrightness>`
  font-family: ${(props) => props.theme.font.family};
  color: ${(props) => {
    switch (props.brightness) {
      case "dark":
        return props.theme.colors.variants.text.light;
      case "light":
        return props.theme.colors.text.color;
      default:
        return props.theme.colors.text.color;
    }
  }};
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
    [FontEnum.GraphikBlack]: require("../../../assets/fonts/GraphikBlack.otf"),
    [FontEnum.GraphikBlackItalic]: require("../../../assets/fonts/GraphikBlackItalic.otf"),
    [FontEnum.GraphikBold]: require("../../../assets/fonts/GraphikBold.otf"),
    [FontEnum.GraphikBoldItalic]: require("../../../assets/fonts/GraphikBoldItalic.otf"),
    [FontEnum.GraphikExtralight]: require("../../../assets/fonts/GraphikExtralight.otf"),
    [FontEnum.GraphikExtralightItalic]: require("../../../assets/fonts/GraphikExtralightItalic.otf"),
    [FontEnum.GraphikLight]: require("../../../assets/fonts/GraphikLight.otf"),
    [FontEnum.GraphikLightItalic]: require("../../../assets/fonts/GraphikLightItalic.otf"),
    [FontEnum.GraphikMedium]: require("../../../assets/fonts/GraphikMedium.otf"),
    [FontEnum.GraphikMediumItalic]: require("../../../assets/fonts/GraphikMediumItalic.otf"),
    [FontEnum.GraphikRegular]: require("../../../assets/fonts/GraphikRegular.otf"),
    [FontEnum.GraphikRegularItalic]: require("../../../assets/fonts/GraphikRegularItalic.otf"),
    [FontEnum.GraphikSemibold]: require("../../../assets/fonts/GraphikSemibold.otf"),
    [FontEnum.GraphikSemiboldItalic]: require("../../../assets/fonts/GraphikSemiboldItalic.otf"),
    [FontEnum.GraphikSuper]: require("../../../assets/fonts/GraphikSuper.otf"),
    [FontEnum.GraphikSuperItalic]: require("../../../assets/fonts/GraphikSuperItalic.otf"),
    [FontEnum.GraphikThin]: require("../../../assets/fonts/GraphikThin.otf"),
    [FontEnum.GraphikThinItalic]: require("../../../assets/fonts/GraphikThinItalic.otf"),
  });
  console.log("Fonts loaded!");
};

export function getColorBrightness(
  color: string
): "light" | "dark" | "unknown" {
  if (!color) {
    return "unknown";
  }

  if (!/^#[0-9A-Fa-f]{6}$/i.test(color)) {
    return "unknown";
  }

  const red = parseInt(color.substr(1, 2), 16);
  const green = parseInt(color.substr(3, 2), 16);
  const blue = parseInt(color.substr(5, 2), 16);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

  return brightness >= 128 ? "light" : "dark";
}
