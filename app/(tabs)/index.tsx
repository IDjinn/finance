import { StyleSheet, Button, useAnimatedValue, View, PixelRatio, TouchableOpacity } from 'react-native';

import { Text } from '@/components/Themed';
import styled from 'styled-components/native';
import Card from '@/components/cards/Card';
import React, { useEffect } from 'react';
import { Easing, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { useFont, listFontFamilies, matchFont } from '@shopify/react-native-skia';
import { DonutChart } from '@/components/charts/donut/DonutChart';

const radius = PixelRatio.roundToNearestPixel(130);
const STROKE_WIDTH = 12;

export default function TabOneScreen() {
  const targetPercentage = (50 / 100);
  const animationState = useSharedValue(0);
  const animatedPercentage = useDerivedValue(() => animationState.value / 100);

  const animateChart = () => {
    animationState.value = 0;
    animationState.value = withTiming(targetPercentage * 100, {
      duration: 1250,
      easing: Easing.inOut(Easing.cubic),
    });
  };

  const fontStyle = {
    fontFamily: 'arial',
    fontSize: 60,
  };
  const smallFontStyle = {
    fontFamily: 'arial',
    fontSize: 25,
  };
  const font = matchFont(fontStyle);
  const smallerFont = matchFont(smallFontStyle);

  if (!font || !smallerFont) {
    console.error('Font not loaded');
    return <View />;
  }

  return (
    <Container>
      <Text style={styles.title}>Finance</Text>
      <Card.Container>
        <Card.Header>
          <Card.Title>Velit </Card.Title>
        </Card.Header>
        <Card.Body>
          <Center>
            <View style={styles.ringChartContainer}>
              <DonutChart
                backgroundColor="white"
                radius={radius}
                strokeWidth={STROKE_WIDTH}
                percentageComplete={animatedPercentage}
                targetPercentage={targetPercentage}
                font={font}
                smallerFont={smallerFont}
                start={Math.PI}
              />
            </View>
            <TouchableOpacity onPress={animateChart} style={styles.button}>
              <Text style={styles.buttonText}>Animate !</Text>
            </TouchableOpacity>
          </Center>
        </Card.Body>
      </Card.Container>

    </Container>
  );
}

const Container = styled.View`
  display: flex;
  padding-top: 30px;
  padding: 20px;
  justify-content: center;
`;

const Center = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  ringChartContainer: {
    width: radius * 2,
    height: radius * 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chart: {
    height: 200,
    width: 200,
  },
  legendContainer: {
    marginTop: 20,
    width: '100%',
  },
  button: {
    marginTop: 40,
    backgroundColor: "orange",
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  legendText: {
    fontSize: 16,
  },
});
