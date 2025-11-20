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
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Convoiturage() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const [activeTab, setActiveTab] = useState("rechercher");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);

  const trips = [
    {
      from: "Paris",
      to: "Lyon",
      date: "Aujourd’hui",
      time: "14h30",
      duration: "4h30",
      price: "25€",
      driver: {
        name: "Marie L.",
        rating: 4.8,
        avatar: require("../../assets/images/profile_WNL.jpg"),
      },
      seats: "2 places",
      keyPlaces: ["Aéroport CDG", "Gare de Lyon", "Autoroute A6"],
    },
    {
      from: "Paris",
      to: "Marseille",
      date: "Demain",
      time: "08h00",
      duration: "7h15",
      price: "45€",
      driver: {
        name: "Pierre M.",
        rating: 4.9,
        avatar: require("../../assets/images/profile_WNL.jpg"),
      },
      seats: "1 place",
      keyPlaces: ["Périphérique Paris", "Lyon", "Autoroute A7"],
    },
    {
      from: "Lyon",
      to: "Nice",
      date: "23 Nov",
      time: "15h45",
      duration: "5h20",
      price: "35€",
      driver: {
        name: "Sophie R.",
        rating: 4.7,
        avatar: require("../../assets/images/profile_WNL.jpg"),
      },
      seats: "2 places",
      keyPlaces: ["Autoroute A8", "Aéroport Nice Côte d'Azur"],
    },
  ];

  const openModal = (trip: any) => {
    setSelectedTrip(trip);
    setModalVisible(true);
  };

  const colors = {
    bg: isDark ? "#121212" : "#f5f5f5",
    card: isDark ? "#1e1e1e" : "#ffffff",
    text: isDark ? "#ffffff" : "#000000",
    subText: isDark ? "#b5b5b5" : "#555555",
    green: "#4ade80",
    tagBg: isDark ? "rgba(74,222,128,0.15)" : "rgba(74,222,128,0.20)",
    divider: isDark ? "#2f2f2f" : "#e5e5e5",
  };
  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0d0d0d" : "#ffffff" },
      ]}
    >
      <View style={styles.header}>
              <Text style={[styles.title, { color: colors.text }]}>Covoiturage</Text>
              <Text style={[styles.subtitle, { color: colors.subText }]}>
                Pour une ville plus ecologique
              </Text>
              <Ionicons
                name="car-sport-outline"
                size={22}
                color={colors.text}
                style={{ position: "absolute", right: 0, top: 10 }}
              />
            </View>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            {
              backgroundColor:
                activeTab === "rechercher"
                  ? "#1041b3"
                  : isDark
                  ? "#1f1f1f"
                  : "#e6e6e6",
            },
          ]}
          onPress={() => setActiveTab("rechercher")}
        >
          <Ionicons
            name="search"
            size={16}
            color={
              activeTab === "rechercher" ? "#fff" : isDark ? "#fff" : "#000"
            }
          />
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === "rechercher"
                    ? "#fff"
                    : isDark
                    ? "#fff"
                    : "#000",
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
                  ? "#1041b3"
                  : isDark
                  ? "#1f1f1f"
                  : "#e6e6e6",
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
                  activeTab === "creer" ? "#fff" : isDark ? "#fff" : "#000",
              },
            ]}
          >
            Créer
          </Text>
        </TouchableOpacity>
      </View>

      {/* === CONTENU DES TABS === */}
      {activeTab === "rechercher" && (
        <>
          <View
            style={[
              styles.searchBox,
              { backgroundColor: isDark ? "#1a1a1a" : "#f2f2f2" },
            ]}
          >
            <Text
              style={[styles.subtitle, { color: isDark ? "#fff" : "#000" }]}
            >
              Où souhaitez-vous aller ?
            </Text>

            <TextInput
              placeholder="Départ"
              placeholderTextColor="#888"
              style={[
                styles.input,
                {
                  backgroundColor: isDark ? "#0f0f0f" : "#e6e6e6",
                  color: isDark ? "#fff" : "#000",
                },
              ]}
            />

            <TextInput
              placeholder="Arrivée"
              placeholderTextColor="#888"
              style={[
                styles.input,
                {
                  backgroundColor: isDark ? "#0f0f0f" : "#e6e6e6",
                  color: isDark ? "#fff" : "#000",
                },
              ]}
            />

            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search" size={16} color="#fff" />
              <Text style={styles.searchButtonText}>Rechercher</Text>
            </TouchableOpacity>
          </View>

          {/* Trajets disponibles */}
          {trips.map((item, index) => (
            <View
              key={index}
              style={[
                styles.tripCard,
                { backgroundColor: isDark ? "#1a1a1a" : "#f4f4f4" },
              ]}
            >
              <Text
                style={[styles.tripRoute, { color: isDark ? "#fff" : "#000" }]}
              >
                {item.from} → {item.to}
              </Text>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.tripInfo}>
                📅 {item.date} ⏰ {item.time} ⏱ {item.duration}
              </Text>

              <Text
                style={[
                  styles.subtitle,
                  { color: isDark ? "#fff" : "#000", marginTop: 6 },
                ]}
              >
                Points clés du trajet :
              </Text>
              {item.keyPlaces.map((place, idx) => (
                <Text key={idx} style={[styles.tripInfo, { marginLeft: 10 }]}>
                  • {place}
                </Text>
              ))}

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
                  <Text style={styles.driverRating}>
                    ⭐ {item.driver.rating}
                  </Text>
                </View>
                <View style={{ marginLeft: "auto", flexDirection: "row" }}>
                  <Text style={styles.seats}>{item.seats}</Text>

                  <TouchableOpacity
                    style={styles.reserveButton}
                    onPress={() => openModal(item)}
                  >
                    <Text style={styles.reserveButtonText}>Réserver</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          {/* Modal réservation */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View
                style={[
                  styles.modalContent,
                  { backgroundColor: isDark ? "#1a1a1a" : "#fff" },
                ]}
              >
                {selectedTrip && (
                  <>
                    <Text
                      style={[
                        styles.modalTitle,
                        { color: isDark ? "#fff" : "#000" },
                      ]}
                    >
                      Réserver : {selectedTrip.from} → {selectedTrip.to}
                    </Text>
                    <Text
                      style={[
                        styles.modalText,
                        { color: isDark ? "#ccc" : "#555" },
                      ]}
                    >
                      Date : {selectedTrip.date} | Heure : {selectedTrip.time}
                    </Text>
                    <Text
                      style={[
                        styles.modalText,
                        { color: isDark ? "#ccc" : "#555" },
                      ]}
                    >
                      Durée : {selectedTrip.duration}
                    </Text>
                    <Text
                      style={[
                        styles.modalText,
                        { color: isDark ? "#ccc" : "#555" },
                      ]}
                    >
                      Points clés : {selectedTrip.keyPlaces.join(", ")}
                    </Text>
                    <Text style={[styles.modalPrice, { color: "#1041b3" }]}>
                      Prix : {selectedTrip.price}
                    </Text>
                    <View style={styles.modalButtonContainer}>
                      <TouchableOpacity
                        style={[styles.modalButton, styles.confirmButton]}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text style={styles.modalButtonText}>Confirmer</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.modalButton, styles.closeButton]}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text style={styles.modalButtonText}>Fermer</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </View>
          </Modal>
        </>
      )}

      {/* Tab créer */}
      {activeTab === "creer" && (
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: isDark ? "#fff" : "#000",
              marginBottom: 16,
            }}
          >
            Proposer un trajet
          </Text>

          <TextInput
            placeholder="Départ"
            placeholderTextColor="#888"
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#1a1a1a" : "#e6e6e6",
                color: isDark ? "#fff" : "#000",
              },
            ]}
          />
          <TextInput
            placeholder="Arrivée"
            placeholderTextColor="#888"
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#1a1a1a" : "#e6e6e6",
                color: isDark ? "#fff" : "#000",
              },
            ]}
          />
          <TextInput
            placeholder="Points clés du trajet (séparés par ,)"
            placeholderTextColor="#888"
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#1a1a1a" : "#e6e6e6",
                color: isDark ? "#fff" : "#000",
              },
            ]}
          />
          <TextInput
            placeholder="Nombre de places disponibles"
            placeholderTextColor="#888"
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#1a1a1a" : "#e6e6e6",
                color: isDark ? "#fff" : "#000",
              },
            ]}
          />
          <TextInput
            placeholder="Prix (FCFA)"
            placeholderTextColor="#888"
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#1a1a1a" : "#e6e6e6",
                color: isDark ? "#fff" : "#000",
              },
            ]}
          />

          <TouchableOpacity
            style={{
              backgroundColor: "#1041b3",
              padding: 14,
              borderRadius: 14,
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>
              Publier le trajet
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 60 },
  
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  header: { marginTop: 0 },
  title: { fontSize: 26, fontWeight: "700" },
  subtitle: { fontSize: 15, marginTop: 4,marginBottom:10 },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    width: "100%",
    marginTop: 20,
  },

  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  confirmButton: {
    backgroundColor: "#3b82f6", // bleu moderne
  },

  closeButton: {
    backgroundColor: "#ef4444", // rouge moderne
  },

  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
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
  searchBox: { borderRadius: 16, padding: 16, marginBottom: 20 },
  //subtitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  input: { marginBottom: 12, padding: 12, borderRadius: 12, fontSize: 15 },
  searchButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1041b3",
    padding: 12,
    borderRadius: 12,
  },
  searchButtonText: { color: "#fff", fontWeight: "600", marginLeft: 6 },
  tripCard: { padding: 16, borderRadius: 14, marginBottom: 16 },
  tripRoute: { fontSize: 16, fontWeight: "700" },
  price: { fontSize: 18, color: "#1041b3", fontWeight: "700", marginBottom: 4 },
  tripInfo: { fontSize: 13, color: "#999", marginTop: 2 },
  driverRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  driverName: { fontSize: 15, fontWeight: "600" },
  driverRating: { fontSize: 13, color: "#999" },
  seats: { fontSize: 14, fontWeight: "600", color: "#999", marginRight: 8 },
  reserveButton: {
    backgroundColor: "#1041b3",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginLeft: 8,
  },
  reserveButtonText: { color: "#fff", fontWeight: "600" },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: { width: "85%", borderRadius: 16, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  modalText: { fontSize: 14, marginBottom: 6 },
  modalPrice: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 16,
  },
  modalCloseButton: {
    backgroundColor: "#1041b3",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
});
