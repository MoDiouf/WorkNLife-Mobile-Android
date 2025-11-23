import React from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface Props {
  children: React.ReactNode;
  onPress?: (event?: any) => void;   // 👈 FIX IMPORTANTE
  style?: StyleProp<ViewStyle>;
}

export default function CustomTabButton({ onPress, children, style }: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = (event?: any) => {
    // Animation
    scale.value = withSequence(
      withTiming(0.85, { duration: 100 }),
      withTiming(1, { duration: 120 })
    );
    onPress?.(event); // 👈 On renvoie bien l'event
  };

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        },
        animatedStyle,
        style,
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}
