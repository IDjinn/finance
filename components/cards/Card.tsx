import React from "react";
import styled from 'styled-components/native';
import Animated, { FadeInLeft, FadeOutRight, LinearTransition } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import { Constants } from "@/utils/constants";

const sharedLayout = LinearTransition.duration(Constants.SLOW_ANIMATION_MILLIS).delay(Constants.SLOW_ANIMATION_MILLIS);
const sharedAnimations = {
    entering: FadeInLeft,
    exiting: FadeOutRight,
};

const Container = styled(Animated.View).attrs({
    layout: sharedLayout,
    entering: sharedAnimations.entering,
    exiting: sharedAnimations.exiting,
})`
    display: flex;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    margin: 10px;
    box-shadow: 0px 10px 15px rgba(0,0,0,0.1);
`;

const Header = styled(Animated.View).attrs({
    layout: sharedLayout,
    entering: sharedAnimations.entering,
    exiting: sharedAnimations.exiting,
})`
    padding: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Text = styled(Animated.Text).attrs({
    layout: sharedLayout,
    entering: sharedAnimations.entering,
    exiting: sharedAnimations.exiting,
})`
    font-size: 12px;
    color: black;
`;
const Title = styled(Animated.Text).attrs({
    layout: sharedLayout,
    entering: sharedAnimations.entering,
    exiting: sharedAnimations.exiting,
})`
    font-size: 20px;
    font-weight: bold;
    color: black;
`;

const Body = styled(Animated.View).attrs({
    layout: sharedLayout,
    entering: sharedAnimations.entering,
    exiting: sharedAnimations.exiting,
})`
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 120px;
`;

interface ScrollViewProps {
    minHeight?: string;
    maxHeight?: string;
}

const ScrollableBody = styled(Animated.ScrollView).attrs({
    layout: sharedLayout,
    entering: sharedAnimations.entering,
    exiting: sharedAnimations.exiting,
}) <ScrollViewProps>`
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: ${(props: ScrollViewProps) => props.minHeight || '120px'};
    max-height: ${(props: ScrollViewProps) => props.maxHeight || 'unset'};
`;

const FlatList = styled(Animated.FlatList)`
    flex: 1;
`;

const Card = {
    Container,
    Header,
    Title,
    Text,
    Body,
    ScrollableBody,
    FlatList
}

export default Card;
