import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, StyleSheet, useColorScheme } from "react-native";
import WorkNLifeLogo from "@/assets/images/WorkNLife-OG.svg";
import WorkNLifeLogoWhite from "@/assets/images/WorkNLife-OG-white.svg";

export default function Splash() {
  const router = useRouter();
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const isLoggedIn = false; // à remplacer par ton vrai état

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) router.replace("/(tabs)");
      else router.replace({ pathname: "/auth/login" });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#000" : "#fff" }]}>
      {isDark ? <WorkNLifeLogoWhite width={280} height={150} />  : <WorkNLifeLogo width={280} height={150} />}
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
