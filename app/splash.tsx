import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function Splash() {
  const router = useRouter();

  const isLoggedIn = false; // à remplacer par ton vrai état

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) router.replace("/(tabs)");
      else router.replace({pathname: "/auth/login"});
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>WorkNLife</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  text: { fontSize: 32, fontFamily: "DancingScript", color: "#1043B1", },
});
