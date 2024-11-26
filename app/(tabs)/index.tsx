import { StyleSheet, Button, useAnimatedValue, View, PixelRatio, TouchableOpacity } from 'react-native';

import { Text } from '@/components/Themed';
import styled from 'styled-components/native';
import Card from '@/components/cards/Card';
import React, { useEffect, useMemo, useState } from 'react';
import Animated, { Easing, FadeInDown, FadeInLeft, FadeInRight, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { useFont, listFontFamilies, matchFont } from '@shopify/react-native-skia';
import DonutChart, { Data } from '@/components/charts/donut/DonutChart';
import { generateRandomNumbers } from '@/utils/random';
import { calculatePercentage } from '@/utils/percentage';
import { Constants } from '@/utils/constants';

const RADIUS = 160;
const STROKE_WIDTH = 30;
const OUTER_STROKE_WIDTH = 46;
const GAP = 0.04;

export default function TabOneScreen() {
  const n = 5;
  const [data, setData] = useState<Data[]>([]);
  const totalValue = useSharedValue(0);
  const decimals = useSharedValue<number[]>([]);
  const colors = ['#fe769c', '#46a0f8', '#c3f439', '#88dabc', '#e43433'];
  const [render, setRender] = useState(false)

  const renderCard = () => {
    setRender(!render)
  }

  const generateData = () => {
    const generateNumbers = generateRandomNumbers(n);
    const total = generateNumbers.reduce(
      (acc, currentValue) => acc + currentValue,
      0,
    );
    const generatePercentages = calculatePercentage(generateNumbers, total);
    const generateDecimals = generatePercentages.map(
      number => Number(number.toFixed(0)) / 100,
    );
    totalValue.value = withTiming(total, { duration: 1000 });
    decimals.value = [...generateDecimals];

    const arrayOfObjects = generateNumbers.map((value, index) => ({
      value,
      percentage: generatePercentages[index],
      color: colors[index],
    }));

    setData(arrayOfObjects);
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
      <TouchableOpacity onPress={renderCard} style={styles.button}>
        <Text style={styles.buttonText}>Render</Text>
      </TouchableOpacity>
      {render && (
        <>
          <Text style={styles.title}>Finance</Text>
          <Card.Container entering={FadeInDown.duration(Constants.MEDIUM_ANIMATION_MILLIS)}>
            <Card.Header>
              <Card.Title entering={FadeInLeft.duration(Constants.SLOW_ANIMATION_MILLIS)}  >Velit </Card.Title>
            </Card.Header>
            <Card.Body>
              <Center>
                <View style={styles.ringChartContainer}>

                  <DonutChart
                    radius={RADIUS}
                    gap={GAP}
                    strokeWidth={STROKE_WIDTH}
                    outerStrokeWidth={OUTER_STROKE_WIDTH}
                    font={font}
                    smallFont={smallerFont}
                    totalValue={totalValue}
                    n={n}
                    decimals={decimals}
                    colors={colors}
                  />
                </View>
                <TouchableOpacity onPress={generateData} style={styles.button}>
                  <Text style={styles.buttonText}>Animate !</Text>
                </TouchableOpacity>
              </Center>
            </Card.Body>
          </Card.Container>
        </>
      )}

    </Container>
  );
}

const Container = styled(Animated.View)`
  display: flex;
  padding-top: 30px;
  padding: 20px;
  justify-content: center;
`

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
    width: RADIUS * 2,
    height: RADIUS * 2,
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
