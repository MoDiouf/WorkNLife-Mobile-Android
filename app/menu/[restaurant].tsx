import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

type MenuItem = {
  title: string;
  description: string;
  price: string;
  image?: any;
};

type Menus = {
  petitDej: MenuItem[];
  dejeuner: MenuItem[];
};

type RestaurantData = {
  name: string;
  description: string;
  rating: string;
  image: string;
  menus: Menus;
};

export default function RestaurantMenu() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  // 🔹 Récupération des paramètres passés depuis Repas.tsx
  const { restaurant, description, rating, menus, image } =
    useLocalSearchParams();

  if (!restaurant || !menus) {
    return (
      <View style={styles.center}>
        <Text>Erreur : aucun restaurant sélectionné.</Text>
      </View>
    );
  }

  // ✅ Gestion string | string[]
  const restaurantName = Array.isArray(restaurant) ? restaurant[0] : restaurant;
  const restaurantDesc = Array.isArray(description)
    ? description[0]
    : description;
  const restaurantRating = Array.isArray(rating) ? rating[0] : rating;
  const restaurantImage = Array.isArray(image) ? image[0] : image;
  const menusObj = Array.isArray(menus)
    ? JSON.parse(menus[0])
    : JSON.parse(menus);

  const [activeTab, setActiveTab] = useState<"petitDej" | "dejeuner">(
    "petitDej"
  );
  const menuList =
    activeTab === "petitDej" ? menusObj.petitDej : menusObj.dejeuner;

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0d0d0d" : "#ffffff" },
      ]}
    >
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => router.back()}
      >
        <Text style={styles.goBackText}>← Retour</Text>
      </TouchableOpacity>
      {/* Image */}
      <Image
        source={
          restaurantImage
            ? { uri: restaurantImage }
            : require("../../assets/images/default.webp")
        }
        style={styles.headerImage}
        resizeMode="cover"
      />

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
          {restaurantName}
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? "#ccc" : "#555" }]}>
          {restaurantDesc}
        </Text>
        <Text style={[styles.rating, { color: isDark ? "#fff" : "#111" }]}>
          ⭐ {restaurantRating} · 25-35 min
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {[
          { key: "petitDej", label: "Petit Déj" },
          { key: "dejeuner", label: "Déjeuner" },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              {
                backgroundColor:
                  activeTab === tab.key
                    ? "#1041b3"
                    : isDark
                    ? "#1f1f1f"
                    : "#eaeaea",
              },
            ]}
            onPress={() => setActiveTab(tab.key as "petitDej" | "dejeuner")}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === tab.key ? "#fff" : isDark ? "#fff" : "#000",
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      {menuList.length === 0 ? (
        <View
          style={[
            styles.menuCard,
            {
              backgroundColor: isDark ? "#1a1a1a" : "#f4f4f4",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text
            style={{ color: isDark ? "#fff" : "#000", fontStyle: "italic" }}
          >
            Aucun {activeTab === "petitDej" ? "petit déjeuner" : "déjeuner"}{" "}
            disponible
          </Text>
        </View>
      ) : (
        menuList.map((item: MenuItem, i: number) => (
          <View
            key={i}
            style={[
              styles.menuCard,
              { backgroundColor: isDark ? "#1a1a1a" : "#f4f4f4" },
            ]}
          >
            <Image
              source={
                item.image
                  ? { uri: item.image }
                  : require("../../assets/images/default.webp")
              }
              style={styles.itemImage}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text
                style={[styles.menuTitle, { color: isDark ? "#fff" : "#000" }]}
              >
                {item.title}
              </Text>
              <Text
                style={[styles.menuDesc, { color: isDark ? "#bbb" : "#666" }]}
              >
                {item.description}
              </Text>
              <Text style={styles.menuPrice}>{item.price}</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Ajouter</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: "100%",
    height: 200,
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  rating: {
    marginTop: 8,
    fontSize: 15,
    opacity: 0.8,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  tab: { paddingVertical: 8, paddingHorizontal: 18, borderRadius: 20 },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  menuCard: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 14,
    alignItems: "center",
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  menuDesc: {
    fontSize: 12,
    marginTop: 4,
  },
  menuPrice: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "700",
    color: "#1041b3",
  },
  addButton: {
    backgroundColor: "#1041b3",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  addButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  goBackButton: {
    position: "absolute",
    top: 40, // ajuste selon le padding de ton header
    left: 16,
    backgroundColor: "#ffffff80", // fond semi-transparent
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    zIndex: 10,
  },
  goBackText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
