import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";


export default function Repas() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const [allRestaurants, setAllRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true); // ✅ démarre le skeleton

        const token = await AsyncStorage.getItem("mobile_token");

        const response = await fetch(
          "http://192.168.1.23:3000/menus/allmenus",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        const formatted = formatRestaurantsFromBackend(data.menus);
        setAllRestaurants(formatted);
      } catch (error) {
        console.log("Erreur fetch menu:", error);
      } finally {
        setLoading(false); // ✅ stop le skeleton
      }
    };

    fetchMenus();
  }, []);

  const [showAll, setShowAll] = useState(false);

  const restaurantsToDisplay = showAll
    ? allRestaurants
    : allRestaurants.slice(0, 3);

  function RestaurantSkeleton({ isDark }: { isDark: boolean }) {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <View
          key={item}
          style={{
            flexDirection: "row",
            marginBottom: 16,
            padding: 16,
            borderRadius: 16,
            backgroundColor: isDark ? "#1a1a1a" : "#ededed",
          }}
        >
          {/* Image */}
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 12,
              backgroundColor: isDark ? "#333" : "#d1d1d1",
              marginRight: 12,
            }}
          />

          {/* Texte */}
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View
              style={{
                width: "60%",
                height: 16,
                borderRadius: 6,
                backgroundColor: isDark ? "#333" : "#d1d1d1",
              }}
            />

            <View
              style={{
                width: "90%",
                height: 12,
                borderRadius: 6,
                backgroundColor: isDark ? "#333" : "#d1d1d1",
              }}
            />

            <View
              style={{
                width: "40%",
                height: 14,
                borderRadius: 6,
                backgroundColor: isDark ? "#333" : "#d1d1d1",
              }}
            />
          </View>
        </View>
      ))}
    </>
  );
}

  type BackendPartnerType = {
    id_partner: number;
    partner_name?: string;
    description?: string;
  };

  type BackendMenu = {
    id_menu: number;
    name: string;
    description: string;
    price: number;
    meal_type: "breakfast" | "lunch";
    partner: BackendPartnerType;
  };

  type FrontendMenuItem = {
    title: string;
    description: string;
    price: string;
  };

  type FrontendRestaurant = {
    name: string;
    description: string;
    rating: number;
    image: any; // require(...)
    menus: {
      petitDej: FrontendMenuItem[];
      dejeuner: FrontendMenuItem[];
    };
  };

  function formatRestaurantsFromBackend(
    apiMenus: BackendMenu[]
  ): FrontendRestaurant[] {
    const partnersMap: Record<number, FrontendRestaurant> = {};

    apiMenus.forEach((menu: BackendMenu) => {
      const p = menu.partner;

      if (!partnersMap[p.id_partner]) {
        partnersMap[p.id_partner] = {
          name: p.partner_name || "Nom indisponible",
          description: p.description || "Aucune description",
          rating: 4.5,
          image: require("../../assets/images/commande.jpeg"),
          menus: {
            petitDej: [],
            dejeuner: [],
          },
        };
      }

      if (menu.meal_type === "breakfast") {
        partnersMap[p.id_partner].menus.petitDej.push({
          title: menu.name,
          description: menu.description,
          price: `${menu.price} CFA`,
        });
      }

      if (menu.meal_type === "lunch") {
        partnersMap[p.id_partner].menus.dejeuner.push({
          title: menu.name,
          description: menu.description,
          price: `${menu.price} CFA`,
        });
      }
    });

    return Object.values(partnersMap);
  }

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0d0d0d" : "#fff" },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#000" }]}>
          Commande de Repas
        </Text>

        <TouchableOpacity>
          <Ionicons
            name="cart-outline"
            size={28}
            color={isDark ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View
        style={[styles.banner, { backgroundColor: isDark ? "#333" : "#ccc" }]}
      >
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>Offre Spéciale</Text>
          <Text style={styles.bannerSubtitle}>
            Découvrez nos meilleurs restaurants
          </Text>
        </View>
      </View>

      {/* Featured header */}
      <View style={styles.sectionHeader}>
        <Text
          style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}
        >
          Restaurant en vedette
        </Text>
        <TouchableOpacity onPress={() => setShowAll(!showAll)}>
          <Text style={[styles.link, { color: "#1E40AF" }]}>
            {showAll ? "Voir moins" : "Voir tout"}
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <RestaurantSkeleton isDark={isDark} />
      ) : (
        restaurantsToDisplay.map((resto, index) => (
          <RestaurantCard key={index} {...resto} isDark={isDark} />
        ))
      )}

      {/* Bottom buttons */}
      <View style={[styles.bottomButtons]}>
        <TouchableOpacity style={[styles.bottomButton, { marginRight: 8 }]}>
          <Ionicons name="time-outline" size={24} />
          <Text style={styles.bottomButtonLabel}>Historique</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.bottomButton, { marginLeft: 8 }]}>
          <Ionicons name="grid-outline" size={24} />
          <Text style={styles.bottomButtonLabel}>Catégories</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Catégories</Text>
    </ScrollView>
  );
}
type MenuItem = {
  title: string;
  description: string;
  price: string;
};
type Restaurant = {
  name: string;
  description: string;
  rating: number;
  image: any;
  menus: { petitDej: MenuItem[]; dejeuner: MenuItem[] };
};

function RestaurantCard({
  name,
  description,
  rating,
  image,
  menus,
  isDark,
}: Restaurant & { isDark: boolean }) {
  return (
    <View
      style={[styles.card, { backgroundColor: isDark ? "#1a1a1a" : "#fff" }]}
    >
      <Image source={image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: isDark ? "#fff" : "#000" }]}>
          {name}
        </Text>
        <Text
          style={[styles.cardSubtitle, { color: isDark ? "#ccc" : "#6B7280" }]}
        >
          {description}
        </Text>

        <View style={styles.cardFooter}>
          <Text style={{ color: isDark ? "#fff" : "#000" }}>⭐ {rating}</Text>

          <TouchableOpacity
            style={[
              styles.addButton,
              { backgroundColor: isDark ? "#2563EB" : "#2563EB" },
            ]}
            onPress={() =>
              router.push({
                pathname: "/menu/[restaurant]",
                params: {
                  restaurant: name,
                  description: description,
                  rating: rating.toString(),
                  menus: JSON.stringify(menus),
                },
              })
            }
          >
            <Ionicons name="arrow-forward" size={18} color="#fff" />
            <Text style={styles.addButtonText}>Voir menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 30,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: "600",
  },

  // Banner
  banner: {
    width: "100%",
    height: 160,
    backgroundColor: "#ccc",
    borderRadius: 16,
    marginBottom: 24,
    overflow: "hidden",
    justifyContent: "flex-start",
  },
  bannerTextContainer: {
    position: "absolute",
    top: 16,
    left: 16,
  },
  bannerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  bannerSubtitle: {
    color: "white",
    fontSize: 14,
  },

  // Sections
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  link: {
    color: "#1E40AF",
    fontWeight: "500",
  },

  // Cards
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: 16,
  },
  cardSubtitle: {
    color: "#6B7280",
    fontSize: 13,
    marginVertical: 4,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
  },

  // Add button
  addButton: {
    flexDirection: "row",
    backgroundColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    marginLeft: 4,
    fontWeight: "500",
  },

  // Bottom buttons
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  bottomButton: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  bottomButtonLabel: {
    marginTop: 8,
    fontSize: 14,
  },
});
