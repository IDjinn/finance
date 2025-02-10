import React from "react";
import { Text } from "../Themed";

import styled from 'styled-components/native';
import Animated from "react-native-reanimated";


const Container = styled(Animated.View)`
    display: flex;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    margin: 10px;
    box-shadow: 0px 10px 15px rgba(0,0,0,0.1);
`;

const Header = styled(Animated.View)`
    padding: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Title = styled(Animated.Text)`
    font-size: 20px;
    font-weight: bold;
    color: black;
`;

const Body = styled(Animated.View)`
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 120px;
`;

const Card = {
    Container,
    Header,
    Title,
    Body
}

export default Card;