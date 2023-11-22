import { View } from "react-native";

import { styles } from "./styles";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

interface Props {
  total: number;
  current: number;
}

export function ProgressBar({ total, current }: Props) {
  const percentage = Math.round((current / total) * 100);
  const sharedProgress = useSharedValue(percentage);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`,
    };
  });

  useEffect(() => {
    sharedProgress.value = withTiming(percentage, {
      duration: 1000,
    });
  }, [current]);

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.progress, animatedStyle]} />
    </View>
  );
}
