import React, { use, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Settings() {
  const scheme = useColorScheme();
const isDark = scheme === "dark";

const [userData, setUserData] = useState<any>(null);

const logout = async () => {
  await AsyncStorage.removeItem("mobile_token");
  await AsyncStorage.removeItem("isLogged");
  await AsyncStorage.removeItem("user");
  router.replace("/auth/login");
};

useEffect(() => {
  const checkAuth = async () => {
    const isLogged = await AsyncStorage.getItem("isLogged");
    if (isLogged !== "true") {
      router.replace("/auth/login");
    }
  };
  checkAuth();
}, []);

useEffect(() => {
  const fetchUserData = async () => {
    const raw = await AsyncStorage.getItem("userData");
    const parsed = JSON.parse(raw || "{}");
    setUserData(parsed);
  };
  fetchUserData();
}, []);

if (!userData) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Chargement...</Text>
    </View>
  );
}
//console.log("L'utilsateur",userData);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#0d0d0d" : "#fff" }]}>
      
      {/* Profil */}
      <View style={styles.profileContainer}>
        <Image
          source={
    userData.profile_picture
      ? { uri: `data:image/jpeg;base64,${userData.profile_picture}` }
      : require("../../assets/images/image.png")
  }
          style={styles.avatar}
        />
        <View>
          <Text style={[styles.name, { color: isDark ? "#fff" : "#000" }]}>
            {userData.full_name}
          </Text>
          <Text style={styles.mail}>{userData.email}</Text>
        </View>
      </View>

      {/* Liste paramètres */}
      <View style={[styles.section,{ backgroundColor: isDark ? "#000" : "#fff" }]}>
        <SettingItem icon="person-outline" label="Compte"  isDark={isDark}/>
        <SettingItem icon="notifications-outline" label="Notifications" isDark={isDark}/>
        <SettingItem icon="moon-outline" label="Thème" isDark={isDark}/>
        <SettingItem icon="lock-closed-outline" label="Sécurité" isDark={isDark}/>
        <SettingItem icon="help-circle-outline" label="Aide & Support" isDark={isDark}/>
      </View>

      {/* Déconnexion */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>

    </View>
  );
}

function SettingItem({ icon, label, isDark }: any) {
  return (
    <TouchableOpacity 
      style={[
        styles.item,
        { borderBottomColor: isDark ? "#333" : "#e5e5e5" }
      ]}
    >
      <Ionicons 
        name={icon} 
        size={22} 
        color={isDark ? "#60a5fa" : "#3b82f6"} 
      />

      <Text 
        style={[
          styles.itemText, 
          { color: isDark ? "#fff" : "#000" }
        ]}
      >
        {label}
      </Text>

      <Ionicons 
        name="chevron-forward-outline" 
        size={20} 
        color={isDark ? "#777" : "#aaa"} 
        style={{ marginLeft: "auto" }} 
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 65,
    height: 65,
    borderRadius: 40,
    marginRight: 15,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
  },

  mail: {
    color: "#999",
    fontSize: 14,
  },

  section: {
    backgroundColor: "#f3f4f6",
    padding: 10,
    borderRadius: 12,
    marginBottom: 30,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },

  itemText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: "500",
  },

  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#ef4444",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  logoutText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "700",
  },
});
