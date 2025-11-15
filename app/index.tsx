import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Attends le splash Expo, puis redirige vers ton écran custom
    setTimeout(() => {
      router.replace("/splash");
    }, 500);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
}
