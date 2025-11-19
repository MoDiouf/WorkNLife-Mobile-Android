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
import { router, usePathname } from "expo-router";

export default function Repas() {
  const allRestaurants = [
    {
      name: "Chez Mamadou",
      description: "Poulet braisé, thiebou dieune, spécialités sénégalaises…",
      rating: 4.8,
      image: require("../../assets/images/commande.jpeg"),
      menus: {
        petitDej: [
          {
            title: "Café Touba",
            description: "Café sénégalais épicé servi chaud.",
            price: "1.000 CFA",
          },
          {
            title: "Beignet + Jus",
            description: "Beignets croustillants accompagnés de jus naturel.",
            price: "1.500 CFA",
          },
        ],
        dejeuner: [
          {
            title: "Thiebou Dieune",
            description: "Riz au poisson sénégalais, légumes mijotés.",
            price: "2.500 CFA",
          },
          {
            title: "Poulet Braisé",
            description: "Poulet grillé au charbon avec épices locales.",
            price: "3.500 CFA",
          },
        ],
      },
    },

    {
      name: "La Terrasse",
      description: "Pizza, pâtes fraîches, grillades…",
      rating: 4.6,
      image: require("../../assets/images/commande.jpeg"),
      menus: {
        petitDej: [
          {
            title: "Cappuccino",
            description: "Café onctueux avec mousse de lait.",
            price: "2.000 CFA",
          },
          {
            title: "Croissant Beurre",
            description: "Croissant français croustillant.",
            price: "1.000 CFA",
          },
        ],
        dejeuner: [
          {
            title: "Pizza Margherita",
            description: "Tomate fraîche, mozzarella, basilic.",
            price: "4.000 CFA",
          },
          {
            title: "Pâtes Carbonara",
            description: "Crème, lardons, parmesan, poivre noir.",
            price: "4.500 CFA",
          },
        ],
      },
    },

    {
      name: "Le Jardin",
      description: "Cuisine française raffinée, plats végétariens…",
      rating: 4.7,
      image: require("../../assets/images/commande.jpeg"),
      menus: {
        petitDej: [
          {
            title: "Thé Vert + Biscuit",
            description: "Thé chaud accompagné de biscuits au beurre.",
            price: "1.200 CFA",
          },
          {
            title: "Omelette Fromage",
            description: "Oeufs battus avec fromage fondant.",
            price: "2.000 CFA",
          },
        ],
        dejeuner: [
          {
            title: "Salade César",
            description: "Laitue, poulet grillé, parmesan, croûtons.",
            price: "3.000 CFA",
          },
          {
            title: "Gratin Dauphinois",
            description: "Pommes de terre, crème et fromage gratiné.",
            price: "3.800 CFA",
          },
        ],
      },
    },

    {
      name: "Sunset Café",
      description: "Café, smoothies, brunch…",
      rating: 4.5,
      image: require("../../assets/images/commande.jpeg"),
      menus: {
        petitDej: [
          {
            title: "Smoothie Mangue",
            description: "Smoothie frais à la mangue naturelle.",
            price: "2.000 CFA",
          },
          {
            title: "Toast Avocat",
            description: "Avocat crémeux sur pain grillé.",
            price: "2.500 CFA",
          },
        ],
        dejeuner: [
          {
            title: "Salade Fraîcheur",
            description: "Mélange de légumes frais et vinaigrette légère.",
            price: "3.000 CFA",
          },
          {
            title: "Wrap Poulet",
            description: "Poulet grillé, crudités et sauce blanche.",
            price: "3.200 CFA",
          },
        ],
      },
    },

    {
      name: "Bistro Dakar",
      description: "Grillades, plats locaux, ambiance chaleureuse…",
      rating: 4.6,
      image: require("../../assets/images/commande.jpeg"),
      menus: {
        petitDej: [
          {
            title: "Café Lait",
            description: "Café doux avec lait chaud.",
            price: "1.000 CFA",
          },
          {
            title: "Omelette complète",
            description: "Oeufs, légumes, fromage et jambon.",
            price: "1.800 CFA",
          },
        ],
        dejeuner: [
          {
            title: "Mafé",
            description: "Sauce d’arachide avec viande et riz.",
            price: "2.500 CFA",
          },
          {
            title: "Brochettes + Frites",
            description: "Brochettes de viande grillée avec frites.",
            price: "3.500 CFA",
          },
        ],
      },
    },
  ];

  const [showAll, setShowAll] = useState(false);
  const restaurantsToDisplay = showAll
    ? allRestaurants
    : allRestaurants.slice(0, 3);

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
          <Text style={styles.link}>
            {showAll ? "Voir moins" : "Voir tout"}
          </Text>
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

function RestaurantCard({ name, description, rating, image, menus }: Restaurant) {
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
