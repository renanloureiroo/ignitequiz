import { Text, Dimensions } from "react-native";

import Animated, { Keyframe, runOnJS } from "react-native-reanimated";
import { Option } from "../Option";
import { styles } from "./styles";

import * as Haptics from "expo-haptics";

type QuestionProps = {
  title: string;
  alternatives: string[];
};

type Props = {
  question: QuestionProps;
  alternativeSelected?: number | null;
  setAlternativeSelected?: (value: number) => void;
  onUnmount: () => void;
};

export function Question({
  question,
  alternativeSelected,
  setAlternativeSelected,
  onUnmount,
}: Props) {
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const enteringKeyframe = new Keyframe({
    0: {
      opacity: 0,
      transform: [{ translateX: -SCREEN_WIDTH }, { rotate: "-90deg" }],
    },
    70: {
      opacity: 0.3,
    },
    100: {
      opacity: 1,
      transform: [{ translateX: 0 }, { rotate: "0deg" }],
    },
  });
  const exitingKeyframe = new Keyframe({
    0: {
      opacity: 1,
      transform: [{ translateX: 0 }, { rotate: "0deg" }],
    },
    30: {
      opacity: 0.3,
    },
    100: {
      opacity: 0,
      transform: [{ translateX: SCREEN_WIDTH }, { rotate: "90deg" }],
    },
  });

  return (
    <Animated.View
      style={styles.container}
      entering={enteringKeyframe}
      exiting={exitingKeyframe.withCallback((finished) => {
        "worklet";
        if (finished) {
          runOnJS(onUnmount)();
        }
      })}
    >
      <Text style={styles.title}>{question.title}</Text>

      {question.alternatives.map((alternative, index) => (
        <Option
          key={index}
          title={alternative}
          checked={alternativeSelected === index}
          onPress={async () => {
            await Haptics.selectionAsync();
            setAlternativeSelected && setAlternativeSelected(index);
          }}
        />
      ))}
    </Animated.View>
  );
}
