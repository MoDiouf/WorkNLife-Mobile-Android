import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

const RestaurantMenuScreen = ({ menusData }: { menusData: any }) => {
  const [selectedDay, setSelectedDay] = useState(menusData.menus[0].day);
  const [selectedCategory, setSelectedCategory] = useState("breakfast");

  const days = menusData.menus.map((m : any) => m.day);

  const currentDayMenus = menusData.menus.find((m : any) => m.day === selectedDay);

  const categories = [
    { key: "breakfast", label: "Petit-déjeuner" },
    { key: "lunch", label: "Déjeuner" },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* IMAGE */}
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1551218808-94e220e084d2" }}
        style={{ width: "100%", height: 180 }}
      />

      {/* RESTAURANT INFO */}
      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>
          Restaurant partenaire {menusData.partner_id}
        </Text>

        <Text style={{ color: "#bbb", marginTop: 4 }}>
          Menus du jour proposés par votre partenaire
        </Text>
      </View>

      {/* DAYS TABS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: "row", paddingHorizontal: 15, marginBottom: 10 }}>
        {days.map((d: any) => (
          <TouchableOpacity
            key={d}
            onPress={() => setSelectedDay(d)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 18,
              borderRadius: 20,
              marginRight: 10,
              backgroundColor: selectedDay === d ? "#00c85d" : "#222",
            }}>
            <Text
              style={{ color: selectedDay === d ? "#000" : "#fff", fontWeight: "600" }}>
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* CATEGORY TABS */}
      <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 15 }}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            onPress={() => setSelectedCategory(cat.key)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 20,
              borderRadius: 20,
              marginHorizontal: 5,
              backgroundColor: selectedCategory === cat.key ? "#00c85d" : "#222",
            }}>
            <Text
              style={{ color: selectedCategory === cat.key ? "#000" : "#fff", fontWeight: "600" }}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* DISH LIST */}
      <View style={{ paddingHorizontal: 15 }}>
        {currentDayMenus[selectedCategory].map((item: any) => (
          <View
            key={item.id_menu}
            style={{
              backgroundColor: "#1a1a1a",
              padding: 12,
              borderRadius: 15,
              marginBottom: 12,
              flexDirection: "row",
              alignItems: "center",
            }}>
            
            {/* IMAGE (placeholder ici) */}
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_960_720.jpg",
              }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 10,
                marginRight: 12,
              }}
            />

            {/* TEXT */}
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                {item.name}
              </Text>
              <Text style={{ color: "#aaa", marginTop: 3 }}>{item.description}</Text>
            </View>

            {/* PRICE + BUTTON */}
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ color: "#00c85d", fontSize: 16, fontWeight: "bold" }}>
                {item.price}€
              </Text>

              <TouchableOpacity
                style={{
                  backgroundColor: "#00c85d",
                  marginTop: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 20,
                }}>
                <Text style={{ fontWeight: "bold", color: "#000" }}>Ajouter</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default RestaurantMenuScreen;
