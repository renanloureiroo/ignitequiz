import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
} from "react-native";

import { styles } from "./styles";
import { THEME } from "../../styles/theme";

import { LevelBars } from "../LevelBars";
import { QUIZZES } from "../../data/quizzes";
import Animated, { FadeInUp } from "react-native-reanimated";

type Props = TouchableOpacityProps & {
  data: (typeof QUIZZES)[0];
  index: number;
};

const TouchableAnimated = Animated.createAnimatedComponent(TouchableOpacity);
export function QuizCard({ data, index, ...rest }: Props) {
  const Icon = data.svg;

  return (
    <TouchableAnimated
      style={styles.container}
      {...rest}
      entering={FadeInUp.delay(index * 50)}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {Icon && <Icon size={24} color={THEME.COLORS.GREY_100} />}
        </View>

        <LevelBars level={data.level} />
      </View>

      <Text style={styles.title}>{data.title}</Text>
    </TouchableAnimated>
  );
}
