import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing 
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const BANDS_COUNT = 5;

export default function TimelineBackground() {
  const bands = Array.from({ length: BANDS_COUNT }).map((_, i) => ({
    delay: i * 600, // écart entre les bandes
    color: `hsl(${i * 50}, 80%, 60%)`,
  }));

  return (
    <View style={StyleSheet.absoluteFill}>
      {bands.map((band, index) => (
        <AnimatedBand key={index} {...band} />
      ))}
    </View>
  );
}

function AnimatedBand({ delay = 0, color = "#4CAF50" }: any) {
  const progress = useSharedValue(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      progress.value = withRepeat(
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.quad) }),
        -1,
        false
      );
    }, delay);
    return () => clearTimeout(timeout);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: 0 + progress.value * (width / 2),      // mouvement horizontal
    top: height / 2 * progress.value,             // mouvement vertical
    width: width / 3,                             // largeur de la bande
    height: 6,                                    // épaisseur
    backgroundColor: color,
    borderRadius: 3,
    opacity: 0.5 + 0.5 * progress.value,         // léger effet de fondu
    transform: [
      { rotate: "45deg" }                         // inclinaison diagonale
    ]
  }));

  return <Animated.View style={animatedStyle} />;
}
