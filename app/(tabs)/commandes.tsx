import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Repas() {
  const allRestaurants = [
    {
      name: "Chez Mamadou",
      description: "Poulet braisé, thiebou dieune, spécialités sénégalaises…",
      rating: 4.8,
      image: require("../../assets/images/commande.jpeg"),
    },
    {
      name: "La Terrasse",
      description: "Pizza, pâtes fraîches, grillades…",
      rating: 4.6,
      image: require("../../assets/images/commande.jpeg"),
    },
    {
      name: "Le Jardin",
      description: "Cuisine française raffinée, plats végétariens…",
      rating: 4.7,
      image: require("../../assets/images/commande.jpeg"),
    },
    {
      name: "Sunset Café",
      description: "Café, smoothies, brunch…",
      rating: 4.5,
      image: require("../../assets/images/commande.jpeg"),
    },
    {
      name: "Bistro Dakar",
      description: "Grillades, plats locaux, ambiance chaleureuse…",
      rating: 4.6,
      image: require("../../assets/images/commande.jpeg"),
    },
  ];

  const [showAll, setShowAll] = useState(false);
  const restaurantsToDisplay = showAll ? allRestaurants : allRestaurants.slice(0, 3);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/settings")}>
          <Ionicons name="person-circle-outline" size={32} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Commande de Repas</Text>

        <TouchableOpacity>
          <Ionicons name="cart-outline" size={28} />
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>Offre Spéciale</Text>
          <Text style={styles.bannerSubtitle}>
            Découvrez nos meilleurs restaurants
          </Text>
        </View>
      </View>

      {/* Featured header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Restaurant en vedette</Text>
        <TouchableOpacity onPress={() => setShowAll(!showAll)}>
          <Text style={styles.link}>{showAll ? "Voir moins" : "Voir tout"}</Text>
        </TouchableOpacity>
      </View>

      {restaurantsToDisplay.map((resto, index) => (
        <RestaurantCard key={index} {...resto} />
      ))}

      {/* Bottom buttons */}
      <View style={styles.bottomButtons}>
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

type Restaurant = {
  name: string;
  description: string;
  rating: number;
  image: any;
};

function RestaurantCard({ name, description, rating, image }: Restaurant) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.cardImage} />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardSubtitle}>{description}</Text>

        <View style={styles.cardFooter}>
          <Text>⭐ {rating}</Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push(`../menu/${encodeURIComponent(name)}`)}
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
    paddingTop: 16,
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
    fontSize: 18,
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
