import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Loisirs() {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const colors = {
    bg: isDark ? "#121212" : "#f5f5f5",
    card: isDark ? "#1e1e1e" : "#ffffff",
    text: isDark ? "#ffffff" : "#000000",
    subText: isDark ? "#b5b5b5" : "#555555",
    green: "#4ade80",
    tagBg: isDark ? "rgba(74,222,128,0.15)" : "rgba(74,222,128,0.20)",
    divider: isDark ? "#2f2f2f" : "#e5e5e5",
  };

  const activities = [
  {
    id: 1,
    tag: "Cinéma",
    tagColor: "#1043b1",
    image: require("../../assets/images/cinema.jpeg"),
    title: "Cinéma Paradis",
    location: "Paris 9ème",
    rating: 4.8,
    description:
      "Profitez des dernières sorties cinéma dans une ambiance confortable avec son Dolby Atmos.",
    activitiesCount: 12,
  },
  {
    id: 2,
    tag: "Bowling",
    tagColor: "#1043b1",
    image: require("../../assets/images/bowling.jpeg"),
    title: "Bowling Central",
    location: "Lyon 3ème",
    rating: 4.6,
    activitiesCount: 8,
  },
];

const renderActivityCard = (item: any, colors: any) => (
  <View
    key={item.id}
    style={[styles.card, { backgroundColor: colors.card }]}
  >
    <View style={[styles.tag, { backgroundColor: colors.tagBg }]}>
      <Text style={{ color: item.tagColor, fontWeight: "600" }}>
        {item.tag}
      </Text>
    </View>

    <Image source={item.image} style={styles.cardImage} />

    <View style={styles.cardContent}>
      <Text style={[styles.cardTitle, { color: colors.text }]}>
        {item.title}
      </Text>

      <View style={styles.row}>
        <Ionicons name="location-outline" size={14} color={colors.subText} />
        <Text style={[styles.location, { color: colors.subText }]}>
          {item.location}
        </Text>

        <Ionicons
          name="star"
          size={15}
          color="#facc15"
          style={{ marginLeft: "auto" }}
        />
        <Text style={[styles.rating, { color: colors.text }]}>
          {item.rating}
        </Text>
      </View>

      {item.description && (
        <Text style={[styles.description, { color: colors.subText }]}>
          {item.description}
        </Text>
      )}

      <View style={styles.row}>
        <Ionicons name="calendar-outline" size={15} color={"#1043b1"} />
        <Text style={[styles.available, { color: "#1043b1" }]}>
          {item.activitiesCount} activités disponibles
        </Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Voir les activités</Text>
        <Ionicons name="chevron-forward" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
);

  return (
    <ScrollView 
    style={[styles.container, { backgroundColor: colors.bg }]}
    showsVerticalScrollIndicator={false}
    >
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Loisirs</Text>
        <Text style={[styles.subtitle, { color: colors.subText }]}>
          Découvrez nos partenaires
        </Text>
        <Ionicons
          name="game-controller-outline"
          size={22}
          color={colors.text}
          style={{ position: "absolute", right: 0, top: 10 }}
        />
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <StatsItem label="Partenaires" value="8" />
        <StatsItem label="Activités" value="58" />
        <StatsItem label="Note moyenne" value="4.7" />
      </View>

      {activities.map((item) => renderActivityCard(item, colors))}
    </ScrollView>
  );
}

/* ----------- COMPONENT STATS ----------- */
function StatsItem({ value, label }: any) {
  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <Text style={{ color: "#1043b1", fontWeight: "bold", fontSize: 20 }}>
        {value}
      </Text>
      <Text style={{ color: "#9ca3af", fontSize: 13 }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },

  header: { marginTop: 40 },
  title: { fontSize: 23, fontWeight: "700" },
  subtitle: { fontSize: 15, marginTop: 4,marginBottom:10 },

  statsRow: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#1e1e1e",
    borderRadius: 14,
    marginBottom: 20,
  },

  card: {
    borderRadius: 18,
    padding: 12,
    marginBottom: 22,
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { height: 3, width: 0 },
  },

  tag: {
    backgroundColor: "rgba(74,222,128,0.18)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },

  cardImage: {
    width: "100%",
    height: 160,
    borderRadius: 14,
    marginBottom: 12,
  },

  cardContent: {},
  cardTitle: { fontSize: 18, fontWeight: "700" },
  description: { marginTop: 8, fontSize: 14, lineHeight: 20 },

  row: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  location: { fontSize: 13, marginLeft: 4 },
  rating: { marginLeft: 4, fontWeight: "600" },
  available: { marginLeft: 6, fontSize: 13, fontWeight: "500" },

  button: {
    backgroundColor: "#1043b1",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 14,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    marginRight: 6,
  },
});
