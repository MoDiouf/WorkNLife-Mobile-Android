import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function convoiturage() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const [activeTab, setActiveTab] = useState("rechercher");

  const trips = [
    {
      from: "Paris",
      to: "Lyon",
      date: "Aujourd’hui",
      time: "14h30",
      duration: "4h30",
      price: "25€",
      driver: { name: "Marie L.", rating: 4.8, avatar: require("../../assets/images/profile_WNL.jpg") },
      seats: "2 places",
    },
    {
      from: "Paris",
      to: "Marseille",
      date: "Demain",
      time: "08h00",
      duration: "7h15",
      price: "45€",
      driver: { name: "Pierre M.", rating: 4.9, avatar: require("../../assets/images/profile_WNL.jpg") },
      seats: "1 place",
    },
    {
      from: "Lyon",
      to: "Nice",
      date: "23 Nov",
      time: "15h45",
      duration: "5h20",
      price: "35€",
      driver: { name: "Sophie R.", rating: 4.7, avatar: require("../../assets/images/profile_WNL.jpg") },
      seats: "2 places",
    },
  ];

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0d0d0d" : "#ffffff" },
      ]}
    >
      <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
        Covoiturage
      </Text>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            {
              backgroundColor:
                activeTab === "rechercher"
                  ? "#1041b3"
                  : isDark ? "#1f1f1f" : "#e6e6e6",
            },
          ]}
          onPress={() => setActiveTab("rechercher")}
        >
          <Ionicons
            name="search"
            size={16}
            color={activeTab === "rechercher" ? "#fff" : isDark ? "#fff" : "#000"}
          />
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === "rechercher"
                    ? "#fff"
                    : isDark ? "#fff" : "#000",
              },
            ]}
          >
            Rechercher
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            {
              backgroundColor:
                activeTab === "creer"
                  ? "#16A34A"
                  : isDark ? "#1f1f1f" : "#e6e6e6",
            },
          ]}
          onPress={() => setActiveTab("creer")}
        >
          <Ionicons
            name="add"
            size={16}
            color={activeTab === "creer" ? "#fff" : isDark ? "#fff" : "#000"}
          />
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === "creer"
                    ? "#fff"
                    : isDark ? "#fff" : "#000",
              },
            ]}
          >
            Créer
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search box */}
      <View
        style={[
          styles.searchBox,
          { backgroundColor: isDark ? "#1a1a1a" : "#f2f2f2" },
        ]}
      >
        <Text
          style={[
            styles.subtitle,
            { color: isDark ? "#fff" : "#000" },
          ]}
        >
          Où souhaitez-vous aller ?
        </Text>

        {/* Départ */}
        <View
          style={[
            styles.inputRow,
            { backgroundColor: isDark ? "#0f0f0f" : "#e6e6e6" },
          ]}
        >
          <Ionicons name="location" size={18} color="#1041b3" />
          <TextInput
            placeholder="Départ"
            placeholderTextColor="#888"
            style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
          />
        </View>

        {/* Arrivée */}
        <View
          style={[
            styles.inputRow,
            { backgroundColor: isDark ? "#0f0f0f" : "#e6e6e6" },
          ]}
        >
          <Ionicons name="flag" size={18} color="#DC2626" />
          <TextInput
            placeholder="Arrivée"
            placeholderTextColor="#888"
            style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
          />
        </View>

        {/* Boutons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: isDark ? "#0f0f0f" : "#dedede" },
            ]}
          >
            <Ionicons name="options" size={16} color="#000" />
            <Text style={styles.filterText}>Filtres</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={16} color="#fff" />
            <Text style={styles.searchButtonText}>Rechercher</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Trajets */}
      <Text
        style={[
          styles.sectionTitle,
          { color: isDark ? "#fff" : "#000" },
        ]}
      >
        Trajets disponibles
      </Text>

      {trips.map((item, index) => (
        <View
          key={index}
          style={[
            styles.tripCard,
            { backgroundColor: isDark ? "#1a1a1a" : "#f4f4f4" },
          ]}
        >
          <View style={styles.rowBetween}>
            <Text
              style={[
                styles.tripRoute,
                { color: isDark ? "#fff" : "#000" },
              ]}
            >
              {item.from} → {item.to}
            </Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.tripInfo}>
              📅 {item.date}   ⏰ {item.time}
            </Text>
            <Text style={styles.tripInfo}>{item.duration}</Text>
          </View>

          <View style={styles.driverRow}>
            <Image source={item.driver.avatar} style={styles.avatar} />
            <View>
              <Text
                style={[
                  styles.driverName,
                  { color: isDark ? "#fff" : "#000" },
                ]}
              >
                {item.driver.name}
              </Text>
              <Text style={styles.driverRating}>⭐ {item.driver.rating}</Text>
            </View>

            <View style={{ marginLeft: "auto" }}>
              <Text style={styles.seats}>{item.seats}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },

  title: { fontSize: 26, fontWeight: "700", marginBottom: 12 },

  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    backgroundColor: '#ecececff',
    borderRadius: 12,
    paddingVertical: 4,
  },

  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 6,
  },
  tabText: { fontSize: 15, fontWeight: "600", marginLeft: 6 },

  searchBox: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  subtitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  input: {
    marginLeft: 10,
    fontSize: 15,
    flex: 1,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  filterButton: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 12,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  filterText: { marginLeft: 6, fontWeight: "600" },

  searchButton: {
    backgroundColor: "#1041b3",
    padding: 10,
    borderRadius: 12,
    width: "55%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 6,
  },

  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },

  tripCard: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  tripRoute: { fontSize: 16, fontWeight: "700" },
  price: { fontSize: 18, color: "#1041b3", fontWeight: "700" },

  tripInfo: { marginTop: 4, color: "#aaa", fontSize: 13 },

  driverRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },

  driverName: { fontSize: 15, fontWeight: "600" },
  driverRating: { fontSize: 13, color: "#999" },

  seats: { fontSize: 14, fontWeight: "600", color: "#999" },
});
