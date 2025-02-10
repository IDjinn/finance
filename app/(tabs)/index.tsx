import { Platform, View } from 'react-native';
import { Text } from '@/components/Themed';
import { Text as SkiaText } from '@shopify/react-native-skia';
// @ts-ignore
import styled from 'styled-components/native';
import Card from '@/components/cards/Card';
import React, { useEffect, useMemo, useState } from 'react';
import Animated, { FadeInLeft, FadeOutRight, LinearTransition, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { matchFont } from '@shopify/react-native-skia';
import DonutChart, { Data } from '@/components/charts/donut/DonutChart';
import { calculatePercentage } from '@/utils/percentage';
import { Constants } from '@/utils/constants';
import { useApi } from '@/hooks/useApi';
import Icon from '@expo/vector-icons/FontAwesome6';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

const RADIUS = 160;
const STROKE_WIDTH = 30;
const OUTER_STROKE_WIDTH = 46;
const GAP = 0.04;

export default function Home() {
  const api = useApi();
  const decimals = useSharedValue<number[]>([]);
  const colors = ['#e43433', '#dadde3', '#c3f439', '#88dabc', '#e43433'];

  const [data, setData] = useState<Data[]>([]);
  const [expenseSumary, setExpenseSumary] = useState(api.getExpenseCategorySumary()[0]);
  const totalValue = useSharedValue(expenseSumary.totalBalance);
  const [startDate, setStartDate] = useState(new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)));
  const [endDate, setEndDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');
  const n = useMemo(() => expenseSumary.expenses.length + 1, [expenseSumary]);

  useEffect(() => {
    const generateNumbers = expenseSumary.expenses.map(e => e.total);

    if (expenseSumary.totalSpent < expenseSumary.totalBalance) {
      const balance = expenseSumary.totalBalance - expenseSumary.totalSpent;
      generateNumbers.push(balance);
    }

    const generatePercentages = calculatePercentage(generateNumbers, expenseSumary.totalBalance);
    const generateDecimals = generatePercentages.map(number => Number(number.toFixed(0)) / 100);

    totalValue.value = withTiming(expenseSumary.totalBalance, { duration: 1000 });
    decimals.value = generateDecimals;

    setData(generateNumbers.map((value, index) => ({
      value,
      percentage: generatePercentages[index],
      color: colors[index],
    })));
  }, [expenseSumary]);

  const fontStyle = useMemo(() => ({ fontFamily: 'arial', fontSize: 38 }), []);
  const smallFontStyle = useMemo(() => ({ fontFamily: 'arial', fontSize: 21 }), []);
  const font = useMemo(() => matchFont(fontStyle), [fontStyle]);
  const smallerFont = useMemo(() => matchFont(smallFontStyle), [smallFontStyle]);

  if (!font || !smallerFont) {
    console.error('Font not loaded');
    return <View />;
  }

  const targetText = useDerivedValue(() => (expenseSumary.totalSpent / 10).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), []);
  const textX = useDerivedValue(() => {
    const textSize = font.measureText(targetText.value);
    return RADIUS - textSize.width / 2;
  }, [font, targetText]);

  const openAndroidPicker = () => Platform.OS === 'android' && setShowPicker(true);

  const onDateChange = (picker: 'start' | 'end', event: any, selectedDate: any) => {
    const currentDate = selectedDate || (picker === 'start' ? startDate : endDate);
    setShowPicker(Platform.OS === 'ios');
    picker === 'start' ? setStartDate(currentDate) : setEndDate(currentDate);
  };

  return (
    <GestureHandlerRootView>
      <Container>
        <PageTitle>Finance</PageTitle>
        <Card.Container >
          <Card.Header>
            <View>
              {showPicker &&
                (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={startDate}
                    mode={'date'}
                    onChange={(event, selectedDate) => onDateChange('start', event, selectedDate)}
                    maximumDate={new Date()}
                  />
                )
              }
              {Platform.OS === 'android' && (
                <SumaryMonthPickerButton onPress={openAndroidPicker}>
                  <FontAwesomeIcon name='angle-down' size={10} color="#900" />
                </SumaryMonthPickerButton>
              )}
            </View>
            <Text>até</Text>
            <View>
              {showPicker &&
                (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={endDate}
                    mode={'date'}
                    onChange={(event, selectedDate) => onDateChange('end', event, selectedDate)}
                    maximumDate={new Date()}
                  />
                )
              }
              {Platform.OS === 'android' && (
                <SumaryMonthPickerButton onPress={openAndroidPicker}>
                  <FontAwesomeIcon name='angle-down' size={10} color="#900" />
                </SumaryMonthPickerButton>
              )}
            </View>
          </Card.Header>
          <Card.Body>
            <Center>
              <RingChartContainer>
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
                >
                  <SkiaText
                    x={RADIUS - smallerFont.measureText('Total Gasto').width / 2}
                    y={RADIUS + smallerFont.measureText('$$').height * 2.5}
                    font={smallerFont}
                    text={'Total Gasto'}
                    color="black"
                  />
                  <SkiaText
                    x={textX}
                    y={RADIUS + font.measureText('R$00').height / 2}
                    text={targetText}
                    font={font}
                    color="black"
                  />
                </DonutChart>
              </RingChartContainer>
            </Center>
          </Card.Body>
        </Card.Container>

        <CardTransactions>
          <Card.ScrollableBody >
            <Card.Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum voluptatum eligendi ab, vel aperiam dolor! Aspernatur laudantium porro unde hic iste soluta aliquid adipisci cupiditate. Nemo, quidem. Excepturi, nulla voluptatem!</Card.Text>
            <Card.Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum voluptatum eligendi ab, vel aperiam dolor! Aspernatur laudantium porro unde hic iste soluta aliquid adipisci cupiditate. Nemo, quidem. Excepturi, nulla voluptatem!</Card.Text>
            <Card.Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum voluptatum eligendi ab, vel aperiam dolor! Aspernatur laudantium porro unde hic iste soluta aliquid adipisci cupiditate. Nemo, quidem. Excepturi, nulla voluptatem!</Card.Text>
          </Card.ScrollableBody>
        </CardTransactions>


      </Container>
    </GestureHandlerRootView>
  );
}

const PageTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const Container = styled(Animated.View)`
  display: flex;
  padding-top: 30px;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const Center = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FontAwesomeIcon = styled(Icon)`
  margin-left: 10px;
`;

const SumaryMonthPickerButton = styled(Pressable)``;

const RingChartContainer = styled.View`
  width: ${RADIUS * 2}px;
  height: ${RADIUS * 2}px;
`;

const CardTransactions = styled(Card.Container)`
  width: 80%;
  justify-content: center;
  align-items: center;
`
