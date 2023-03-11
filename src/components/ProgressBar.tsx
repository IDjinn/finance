import React, { useRef, useEffect } from "react";
import styled from "styled-components/native";
import { Animated } from "react-native";

interface ProgressBarProps {
  progress: number;
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
  background-color: ${props => props.theme.colors.primary};
  border-radius: 5px;
`;

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const animation = useRef(new Animated.Value(0)).current;

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
    <Container>
      <Bar style={{ width }} />
    </Container>
  );
};

export default ProgressBar;
