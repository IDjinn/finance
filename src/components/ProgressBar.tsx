import React, { useRef, useEffect } from "react";
import styled from "styled-components/native";
import { Animated, ViewProps } from "react-native";
import { useTheme } from "styled-components/native";

interface ProgressBarProps extends ViewProps {
  progress: number;
  color?: string;
}

const Container = styled.View`
  width: 100%;
  height: 10px;
  background-color: ${(props) => props.theme.colors.variants.background.dark};
  border-radius: 5px;
  overflow: hidden;
`;

const Bar = styled(Animated.View)`
  height: 100%;
  border-radius: 5px;
`;

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color,
  ...props
}) => {
  const animation = useRef(new Animated.Value(0)).current;
  const theme = useTheme();

  useEffect(() => {
    Animated.timing(animation, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const width = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <Container {...props}>
      <Bar style={{ width, backgroundColor: color ?? theme.colors.primary }} />
    </Container>
  );
};

export default ProgressBar;
