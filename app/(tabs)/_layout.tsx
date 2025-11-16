import { Tabs } from "expo-router";
import React from "react";
import { FontAwesome } from '@expo/vector-icons';
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="commandes"
        options={{
          title: 'Repas',
          tabBarIcon: ({ color }) => <FontAwesome name="cutlery" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="convoiturage"
        options={{
          title: 'Convoiturage',
          tabBarIcon: ({ color }) => <FontAwesome name="car" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="loisirs"
        options={{
          title: 'Loisirs',
          tabBarIcon: ({ color }) => <FontAwesome name="gamepad" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome name="cog" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
