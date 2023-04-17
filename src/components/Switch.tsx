import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type ButtonProps = {
  title: string;
  index: number;
  onPress: (index: number) => void;
  isActive: boolean;
};

const Button = ({ title, index, onPress, isActive }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(index)}>
      <ButtonText isActive={isActive}>{title}</ButtonText>
    </TouchableOpacity>
  );
};

type SwitchProps = {
  buttons: string[];
  onButtonPress: (title: string) => void;
};

const Switch = ({ buttons, onButtonPress }: SwitchProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const translateX = useSharedValue(0);
  const buttonWidth = 200;

  const handleButtonPress = (index: number) => {
    setActiveIndex(index);

    translateX.value = withTiming(index * buttonWidth, { duration: 200 });

    onButtonPress(buttons[index]);
  };

  const activeIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Container>
      <ButtonsContainer>
        {buttons.map((title, index) => (
          <Button
            key={title}
            title={title}
            index={index}
            onPress={handleButtonPress}
            isActive={activeIndex === index}
          />
        ))}
        <ActiveIndicator
          style={[StyleSheet.absoluteFill, activeIndicatorStyle]}
        />
      </ButtonsContainer>
    </Container>
  );
};

const Container = styled.View`
  width: 300px;
  height: 50px;
  border-radius: 25px;
  background-color: #f0f0f0;
  overflow: hidden;
`;

const ButtonsContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

const ButtonText = styled.Text<{ isActive: boolean }>`
  font-size: 16px;
  color: ${({ isActive }) => (isActive ? "#ffffff" : "#000000")};
`;

const ActiveIndicator = styled(Animated.View)`
  width: 100px;
  height: 50px;
  background-color: #000000;
`;

export default Switch;
