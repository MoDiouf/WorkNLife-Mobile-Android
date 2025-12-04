import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";

export default function Convoiturage() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const [activeTab, setActiveTab] = useState("rechercher");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [checkingPermission, setCheckingPermission] = useState(false);
  const [hasCreatePermission, setHasCreatePermission] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  useEffect(() => {
    const fetchCovoiturage = async () => {
      try {
        const token = await AsyncStorage.getItem("mobile_token");

        const response = await fetch("http://192.168.1.18:3000/carpools", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
        }
      } catch (error) {
        console.log("Erreur fetch carpool:", error);
      } finally {
      }
    };

    fetchCovoiturage();
  }, []);

  const checkCreatePermission = async () => {
    try {
      setCheckingPermission(true);

      const token = await AsyncStorage.getItem("mobile_token");

      const response = await fetch(
        "http://192.168.1.18:3000/carpools/check-permission",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Accès refusé");
      }

      const data = await response.json();
      console.log("Retour: ", data);

      // ✅ Supposons que le backend renvoie { allowed: true }
      if (data.allowed === true) {
        setHasCreatePermission(true);
        setActiveTab("creer"); // ✅ autorisé
      } else {
        setShowVerifyModal(true);
      }
    } catch (error) {
      console.log("Erreur permission:", error);
      alert("❌ Accès refusé. Contactez l’administrateur.");
    } finally {
      setCheckingPermission(false);
    }
  };

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
      showsVerticalScrollIndicator={false}
    >
      <Modal
  animationType="slide"
  transparent={true}
  visible={showVerifyModal}
  onRequestClose={() => setShowVerifyModal(false)}
>
  <View style={styles.modalOverlay}>
    <View style={[
      styles.modalContentt,
      { backgroundColor: isDark ? "#1a1a1a" : "#fff" }
    ]}>
      {/* En-tête */}
      <View style={styles.modalHeader}>
        <Text style={[
          styles.modalTitlee,
          { color: isDark ? "#fff" : "#000" }
        ]}>
          Vérification du profil
        </Text>
        <Text style={[
          styles.modalSubtitle,
          { color: isDark ? "#ccc" : "#666" }
        ]}>
          Pour créer des trajets, vous devez vérifier votre identité
        </Text>
      </View>

      {/* Documents requis */}
      <View style={styles.documentsSection}>
        <Text style={[
          styles.sectionTitle,
          { color: isDark ? "#fff" : "#000" }
        ]}>
          Documents traités :
        </Text>
        
        <View style={styles.documentItem}>
          <View style={styles.documentIconContainer}>
            <Ionicons name="card" size={20} color="#1041b3" />
          </View>
          <View style={styles.documentInfo}>
            <Text style={[
              styles.documentTitle,
              { color: isDark ? "#fff" : "#000" }
            ]}>
              Carte Nationale d'Identité (CNI)
            </Text>
            <Text style={[
              styles.documentDesc,
              { color: isDark ? "#aaa" : "#666" }
            ]}>
              Recto et verso bien visibles
            </Text>
          </View>
          <View style={[
            styles.documentStatus,
            { backgroundColor: selectedDoc?.type === 'cni' ? '#4ade80' : '#e5e5e5' }
          ]}>
            <Text style={styles.documentStatusText}>
              {selectedDoc?.type === 'cni' ? '✓' : '1'}
            </Text>
          </View>
        </View>

        <View style={styles.documentItem}>
          <View style={styles.documentIconContainer}>
            <Ionicons name="car" size={20} color="#1041b3" />
          </View>
          <View style={styles.documentInfo}>
            <Text style={[
              styles.documentTitle,
              { color: isDark ? "#fff" : "#000" }
            ]}>
              Permis de conduire
            </Text>
            <Text style={[
              styles.documentDesc,
              { color: isDark ? "#aaa" : "#666" }
            ]}>
              Recto et verso bien visibles
            </Text>
          </View>
          <View style={[
            styles.documentStatus,
            { backgroundColor: selectedDoc?.type === 'permis' ? '#4ade80' : '#e5e5e5' }
          ]}>
            <Text style={styles.documentStatusText}>
              {selectedDoc?.type === 'permis' ? '✓' : '2'}
            </Text>
          </View>
        </View>
      </View>

      {/* Sélection du document */}
      <View style={styles.selectionSection}>
        <Text style={[
          styles.sectionTitle,
          { color: isDark ? "#fff" : "#000", marginBottom: 12 }
        ]}>
          Choisir un document à envoyer :
        </Text>

        <View style={styles.documentButtons}>
          <TouchableOpacity
            style={[
              styles.documentButton,
              { 
                backgroundColor: selectedDoc?.type === 'cni' 
                  ? 'rgba(16, 65, 179, 0.2)' 
                  : isDark ? "#2a2a2a" : "#f5f5f5",
                borderColor: selectedDoc?.type === 'cni' ? '#1041b3' : 'transparent'
              }
            ]}
            onPress={async () => {
              try {
                const result = await DocumentPicker.getDocumentAsync({
                  type: ["application/pdf"],
                  copyToCacheDirectory: true,
                });

                if (!result.canceled && result.assets.length > 0) {
                  const file = result.assets[0];
                  setSelectedDoc({
                    ...file,
                    type: 'cni',
                    label: 'Carte CNI'
                  });
                }
              } catch (err) {
                console.log("Erreur:", err);
              }
            }}
          >
            <View style={[
              styles.documentButtonIcon,
              { backgroundColor: isDark ? '#1a1a1a' : '#fff' }
            ]}>
              <Ionicons name="card" size={24} color="#1041b3" />
            </View>
            <Text style={[
              styles.documentButtonText,
              { color: isDark ? "#fff" : "#000" }
            ]}>
              Carte CNI
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.documentButton,
              { 
                backgroundColor: selectedDoc?.type === 'permis' 
                  ? 'rgba(16, 65, 179, 0.2)' 
                  : isDark ? "#2a2a2a" : "#f5f5f5",
                borderColor: selectedDoc?.type === 'permis' ? '#1041b3' : 'transparent'
              }
            ]}
            onPress={async () => {
              try {
                const result = await DocumentPicker.getDocumentAsync({
                  type: ["application/pdf"],
                  copyToCacheDirectory: true,
                });

                if (!result.canceled && result.assets.length > 0) {
                  const file = result.assets[0];
                  setSelectedDoc({
                    ...file,
                    type: 'permis',
                    label: 'Permis de conduire'
                  });
                }
              } catch (err) {
                console.log("Erreur:", err);
              }
            }}
          >
            <View style={[
              styles.documentButtonIcon,
              { backgroundColor: isDark ? '#1a1a1a' : '#fff' }
            ]}>
              <Ionicons name="car" size={24} color="#1041b3" />
            </View>
            <Text style={[
              styles.documentButtonText,
              { color: isDark ? "#fff" : "#000" }
            ]}>
              Permis
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Liste des documents sélectionnés */}
      {selectedDoc && (
        <View style={styles.selectedDocumentsSection}>
          <Text style={[
            styles.sectionTitle,
            { color: isDark ? "#fff" : "#000", marginBottom: 10 }
          ]}>
            Document sélectionné :
          </Text>
          
          <View style={[
            styles.documentCard,
            { backgroundColor: isDark ? "#2a2a2a" : "#f8f8f8" }
          ]}>
            <View style={styles.documentCardHeader}>
              <View style={styles.documentCardIcon}>
                <Ionicons 
                  name={selectedDoc.type === 'cni' ? 'card' : 'car'} 
                  size={24} 
                  color="#1041b3" 
                />
              </View>
              <View style={styles.documentCardInfo}>
                <View>
                  <Text style={[
                    styles.documentCardTitle,
                    { color: isDark ? "#fff" : "#000" }
                  ]}>
                    {selectedDoc.label}
                  </Text>
                  <Text style={[
                    styles.documentCardName,
                    { color: isDark ? "#aaa" : "#666" }
                  ]} numberOfLines={1}>
                    {selectedDoc.name}
                  </Text>
                </View>
                <Text style={[
                  styles.documentCardSize,
                  { color: isDark ? "#888" : "#888" }
                ]}>
                  {(selectedDoc.size / 1024).toFixed(1)} KB
                </Text>
              </View>
              <TouchableOpacity 
                onPress={() => setSelectedDoc(null)}
                style={styles.removeButton}
              >
                <Ionicons name="close-circle" size={24} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Gestion de plusieurs documents (optionnel) */}
      <View style={styles.documentsList}>
        <Text style={[
          styles.sectionTitle,
          { color: isDark ? "#fff" : "#000", marginBottom: 10 }
        ]}>
          Documents à envoyer :
        </Text>
        
        <View style={styles.documentsStatus}>
          <View style={styles.statusItem}>
            <View style={[
              styles.statusIndicator,
              { backgroundColor: selectedDoc?.type === 'cni' ? '#4ade80' : '#e5e5e5' }
            ]}>
              <Text style={styles.statusText}>
                {selectedDoc?.type === 'cni' ? '✓' : '1'}
              </Text>
            </View>
            <Text style={[
              styles.statusLabel,
              { color: isDark ? "#fff" : "#000" }
            ]}>
              CNI {selectedDoc?.type === 'cni' ? '(Sélectionné)' : '(Manquant)'}
            </Text>
          </View>
          
          <View style={styles.statusItem}>
            <View style={[
              styles.statusIndicator,
              { backgroundColor: selectedDoc?.type === 'permis' ? '#4ade80' : '#e5e5e5' }
            ]}>
              <Text style={styles.statusText}>
                {selectedDoc?.type === 'permis' ? '✓' : '2'}
              </Text>
            </View>
            <Text style={[
              styles.statusLabel,
              { color: isDark ? "#fff" : "#000" }
            ]}>
              Permis {selectedDoc?.type === 'permis' ? '(Sélectionné)' : '(Manquant)'}
            </Text>
          </View>
        </View>
      </View>

      {/* Boutons d'action */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.primaryButton,
            { opacity: !selectedDoc ? 0.6 : 1 }
          ]}
          onPress={async () => {
            if (!selectedDoc) {
              alert("Veuillez sélectionner un document");
              return;
            }

            try {
              const token = await AsyncStorage.getItem("mobile_token");
              const formData = new FormData();
              
              // Ajouter le type de document au FormData
              formData.append('document_type', selectedDoc.type);
              formData.append('file', {
                uri: selectedDoc.uri,
                type: selectedDoc.mimeType || 'image/jpeg',
                name: selectedDoc.name,
              }as any);

              const response = await fetch(
                "http://192.168.1.18:3000/carpools/upload-verification",
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  body: formData,
                }
              );

              if (response.ok) {
                alert(`✅ ${selectedDoc.label} envoyé avec succès !\nNous vérifierons votre document sous 24h.`);
                setShowVerifyModal(false);
                setSelectedDoc(null);
              } else {
                alert("❌ Erreur lors de l'envoi du document");
              }
            } catch (err) {
              console.log(err);
              alert("❌ Erreur réseau");
            }
          }}
          disabled={!selectedDoc}
        >
          <Ionicons name="cloud-upload" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.primaryButtonText}>
            Envoyer {selectedDoc?.type === 'cni' ? 'la CNI' : 'le permis'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.secondaryButton,
            { backgroundColor: isDark ? "#2a2a2a" : "#f5f5f5" }
          ]}
          onPress={() => {
            setShowVerifyModal(false);
            setSelectedDoc(null);
          }}
        >
          <Text style={[
            styles.secondaryButtonText,
            { color: isDark ? "#fff" : "#000" }
          ]}>
            Fermer
          </Text>
        </TouchableOpacity>
      </View>

      {/* Note d'information */}
      <View style={styles.infoNote}>
        <Ionicons name="information-circle" size={16} color="#888" />
        <View style={{ flex: 1 }}>
          <Text style={[
            styles.infoText,
            { color: isDark ? "#aaa" : "#666" }
          ]}>
            <Text style={{ fontWeight: '600' }}>Important :</Text>  Assurez-vous que les photos sont nettes et bien lisibles.
          </Text>
        </View>
      </View>
    </View>
  </View>
</Modal>

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
          onPress={checkCreatePermission}
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
      {activeTab === "creer" && hasCreatePermission && (
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
  title: { fontSize: 23, fontWeight: "700" },
  subtitle: { fontSize: 15, marginTop: 4, marginBottom: 10 },
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContentt: {
    width: '90%',
    maxHeight: '100%',
    borderRadius: 16,
    padding: 20,
  },
  modalHeader: {
    marginBottom: 20,
  },
  modalTitlee: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  documentsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  documentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(16, 65, 179, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  documentDesc: {
    fontSize: 13,
  },
  documentStatus: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentStatusText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  selectionSection: {
    marginBottom: 20,
  },
  documentButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  documentButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  documentButtonIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  documentButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectedDocumentsSection: {
    marginBottom: 20,
  },
  documentCard: {
    borderRadius: 12,
    padding: 15,
  },
  documentCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentCardIcon: {
    marginRight: 12,
  },
  documentCardInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  documentCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  documentCardName: {
    fontSize: 13,
    maxWidth: 200,
  },
  documentCardSize: {
    fontSize: 12,
    marginLeft: 10,
  },
  removeButton: {
    padding: 5,
    marginLeft: 10,
  },
  documentsList: {
    marginBottom: 20,
  },
  documentsStatus: {
    gap: 10,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statusText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  statusLabel: {
    fontSize: 14,
  },
  actionButtons: {
    gap: 10,
    marginBottom: 10,
  },
  actionButton: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#1041b3',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#f5f5f5',
  },
  secondaryButtonText: {
    fontWeight: '600',
  },
  infoNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(136, 136, 136, 0.1)',
    gap: 8,
    height:'8%'
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
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
