import React, { FC, ReactNode } from "react";

import {
    AnimatedProp,
    Canvas,
    Path,
    SkFont,
    Skia,
    Text,
} from "@shopify/react-native-skia";
import { StyleSheet, View } from "react-native";
import DonutPath from "./DonutPath";
import { SharedValue, useDerivedValue } from "react-native-reanimated";

export interface DonutData {
    percentage: number;
    color: string;
    label: string;
}

type Props = {
    n: number;
    gap: number;
    radius: number;
    strokeWidth: number;
    outerStrokeWidth: number;
    decimals: SharedValue<number[]>;
    colors: string[];
    totalValue: SharedValue<number>;
    font: SkFont;
    smallFont: SkFont;
    children?: ReactNode;
};
export interface Data {
  value: number;
  percentage: number;
  color: string;
}


const DonutChart: FC<Props> = ({
    n,
    gap,
    decimals,
    colors,
    totalValue,
    strokeWidth,
    outerStrokeWidth,
    radius,
    font,
    smallFont,
    
    children,
}) => {
    const array = Array.from({ length: n });
    const innerRadius = radius - outerStrokeWidth / 2;

    const path = Skia.Path.Make();
    path.addCircle(radius, radius, innerRadius);

    const targetText = useDerivedValue(
        () => `$${Math.round(totalValue.value)}`,
        [],
    );

    const fontSize = font.measureText('$00');
    const smallFontSize = smallFont.measureText('Total Spent');

    const textX = useDerivedValue(() => {
        const _fontSize = font.measureText(targetText.value);
        return radius - _fontSize.width / 2;
    }, []);

    return (
        <View style={styles.container}>
            <Canvas style={styles.container}>
                <Path
                    path={path}
                    color="#f4f7fc"
                    style="stroke"
                    strokeJoin="round"
                    strokeWidth={outerStrokeWidth}
                    strokeCap="round"
                    start={0}
                    end={1}
                />
                {array.map((_, index) => {
                    return (
                        <DonutPath
                            key={index}
                            radius={radius}
                            strokeWidth={strokeWidth}
                            outerStrokeWidth={outerStrokeWidth}
                            color={colors[index]}
                            decimals={decimals}
                            index={index}
                            gap={gap}
                        />
                    );
                })}
                  {children}
            </Canvas>
        </View>
    );
};

export default DonutChart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});