import * as React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import styled from "styled-components/native";

export interface PressableButtonProps extends TouchableOpacityProps {
  onPress?: ((event: any) => void) | undefined;
  isLoading?: boolean;
  activityIndicatorColor?: string;
}

const PressableButton = (
  {
    onPress,
    isLoading,
    children,
    activityIndicatorColor,
    ...props
  }: PressableButtonProps = { onPress: () => {}, isLoading: false }
) => {
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      {isLoading ? (
        <ActivityIndicator color={activityIndicatorColor} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default PressableButton;
