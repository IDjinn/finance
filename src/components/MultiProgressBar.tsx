import * as React from "react";
import { View, Animated, Easing } from "react-native";

interface IProgress {
  progress: number;
  color: string;
}

interface ProgressBarProps {
  data: Array<IProgress>;
  barHeight?: number;
  shouldAnimate?: boolean;
  animateDuration?: number;
  color?: string;
}

interface ProgressBarState {
  progressData: IProgress[];
  animatedValue: Animated.Value;
}

class MultiProgressBar extends React.Component<
  ProgressBarProps,
  ProgressBarState
> {
  static defaultProps = {
    barHeight: 8,
    shouldAnimate: true,
    animateDuration: 1000,
  };

  constructor(props: ProgressBarProps) {
    super(props);
    this.state = { progressData: [], animatedValue: new Animated.Value(0) };
  }

  componentDidMount = () => {
    this.updateProgressData();
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      useNativeDriver: false,
      duration: this.props.animateDuration,
      easing: Easing.linear,
    }).start();
  };

  componentDidUpdate = (prevProps: ProgressBarProps) => {
    if (prevProps.data !== this.props.data) {
      this.updateProgressData();
    }
  };

  updateProgressData = () => {
    const totalProgress = this.props.data.reduce(
      (acc, d) => acc + d.progress,
      0
    );
    let data = this.props.data.map((d) => {
      return {
        progress: (d.progress / totalProgress) * 100,
        color: d.color,
      };
    });

    if (totalProgress < 100 && this.props.color) {
      data.push({
        progress: 100,
        color: this.props.color,
      });
    }

    data = data.reverse();
    this.setState({ progressData: data });
  };

  render() {
    const { barHeight, shouldAnimate } = this.props;
    const { progressData } = this.state;

    let animatedValue = this.state.progressData.map((d, i) => {
      return this.state.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", `${d.progress}%`],
      });
    });

    return (
      <View
        style={{
          position: "relative",
          marginTop: 16,
          marginBottom: 16 + (barHeight || 8),
          width: "100%",
        }}
      >
        {progressData.map((d, i) => {
          return (
            <Animated.View
              key={i}
              style={{
                position: "absolute",
                height: barHeight,
                width: shouldAnimate ? animatedValue[i] : `${d.progress}%`,
                backgroundColor: d.color,
                borderRadius: 5,
              }}
            />
          );
        })}
      </View>
    );
  }
}

export default MultiProgressBar;
