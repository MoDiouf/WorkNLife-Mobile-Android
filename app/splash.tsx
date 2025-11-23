import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { View, StyleSheet, useColorScheme, Animated } from "react-native";
import WorkNLifeLogo from "@/assets/images/WorkNLife-OG.svg";
import WorkNLifeLogoWhite from "@/assets/images/WorkNLife-OG-white.svg";

export default function Splash() {
  const router = useRouter();
  const theme = useColorScheme();
  const isDark = theme === "dark";

  // Animation values
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  const isLoggedIn = false; // à remplacer par ton vrai état

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        if (isLoggedIn) router.replace("/(tabs)");
        else router.replace("/auth/login");
      }, 600);
    });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#000" : "#fff" }]}>
      <Animated.View style={{ opacity, transform: [{ scale }] }}>
        {isDark ? (
          <WorkNLifeLogoWhite width={380} height={250} />
        ) : (
          <WorkNLifeLogo width={380} height={350} />
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
