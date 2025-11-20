import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
  ScrollView,
  useColorScheme,
} from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "@/components/themed-text";
import { HelloWave } from "@/components/hello-wave";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FeaturedCarousel } from "@/components/ui/FeaturedCarousel";

interface ServiceCardProps {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  description: string;
  isDark: boolean;
}

export default function HomeScreen() {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const backgroundColor = isDark ? "#000" : "#fff";
  const textColor = isDark ? "#fff" : "#000";
  const subtitleColor = isDark ? "#AAA" : "#555";

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor }}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={[styles.header, { backgroundColor }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ThemedText type="title" style={{ fontSize: 32, color: textColor }}>
            Bonjour !
          </ThemedText>
          <HelloWave />
        </View>
        <ThemedText style={[styles.subtitle, { color: subtitleColor }]}>
          Que souhaitez-vous faire aujourd’hui ?
        </ThemedText>

        {/* Location Badge */}
        <View
          style={[
            styles.locationBadge,
            { backgroundColor: isDark ? "#333" : "#000" },
          ]}
        >
          <Ionicons name="location" size={16} color="#fff" />
          <ThemedText style={{ color: "#fff" }}>Paris, France</ThemedText>
        </View>
      </View>

      {/* SERVICES */}
      <View style={styles.section}>
        <ThemedText
          type="subtitle"
          style={[styles.sectionTitle, { color: textColor }]}
        >
          Nos Services
        </ThemedText>

        <View style={styles.grid}>
          <ServiceCard
            image={require("./../../assets/images/convoiturage.jpeg")}
            title="Covoiturage"
            subtitle="Partagez vos trajets"
            icon="car"
            color="#3ABEFF"
            description="Économique et écologique"
            isDark={isDark}
          />
          <ServiceCard
            image={require("@/assets/images/commande.jpeg")}
            title="Commandes"
            subtitle="Livraison de repas"
            icon="fast-food"
            color="#FFB800"
            description="Délicieux à votre porte"
            isDark={isDark}
          />
          <ServiceCard
            image={require("@/assets/images/commade.jpeg")}
            title="Healthy"
            subtitle="Bien-être & santé"
            icon="heart"
            color="#00E18C"
            description="Prenez soin de vous"
            isDark={isDark}
          />
          <ServiceCard
            image={require("@/assets/images/loisir.webp")}
            title="Loisirs"
            subtitle="Divertissement"
            icon="game-controller"
            color="#B07CFF"
            description="Détendez-vous et amusez-vous"
            isDark={isDark}
          />
        </View>
      </View>

      {/* Featured */}
      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <ThemedText
            type="subtitle"
            style={[styles.sectionTitle, { color: textColor }]}
          >
            À la une
          </ThemedText>
          <Link href="/">
            <ThemedText style={styles.link}>Voir tout →</ThemedText>
          </Link>
        </View>
        <FeaturedCarousel />
      </View>
    </ScrollView>
  );
}

function ServiceCard({
  image,
  title,
  subtitle,
  icon,
  color,
  description,
  isDark,
}: ServiceCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: isDark ? "#222" : "#f8f8f8" },
      ]}
    >
      <Image source={image} style={styles.cardImage} contentFit="cover" />
      <View style={[styles.iconBadge, { backgroundColor: color }]}>
        <Ionicons name={icon} size={18} color="#fff" />
      </View>
      <View style={styles.cardFooter}>
        <ThemedText
          style={[styles.cardTitle, { color: isDark ? "#fff" : "#000" }]}
        >
          {title}
        </ThemedText>
        <ThemedText
          style={[styles.cardSubtitle, { color: isDark ? "#AAA" : "#555" }]}
        >
          {subtitle}
        </ThemedText>
        <ThemedText
          style={{ color: isDark ? "#666868" : "#999", fontSize: 10 }}
        >
          {description}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  subtitle: {
    fontSize: 14,
  },
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: 130,
    borderRadius: 20,
    marginTop: 6,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    width: "47%",
    height: 210,
    borderRadius: 18,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "65%",
  },
  iconBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 6,
    borderRadius: 20,
  },
  cardFooter: {
    height: "30%",
    paddingHorizontal: 10,
    paddingVertical: 3,
    gap: 0,
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: 15,
  },
  cardSubtitle: {
    fontSize: 12,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    color: "#1043b1",
  },
});
