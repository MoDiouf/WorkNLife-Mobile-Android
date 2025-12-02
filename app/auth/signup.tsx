import { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  useColorScheme
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import TimelineBackground from "@/components/AnimatedBackground";
import WorkNLifeLogo from "@/assets/images/WorkNLife-OG.svg";
import WorkNLifeLogoWhite from "@/assets/images/WorkNLife-OG-white.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup() {
  const router = useRouter();
  const [secure, setSecure] = useState(true);
  const theme = useColorScheme(); // "dark" ou "light"
const isDark = theme === "dark";

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleChange = (key: any, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignup = async () => {
  console.log("Signup data :", form);

  try {
    const response = await fetch("http://192.168.1.18:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        phone: form.phone
      }),
    });

    if (!response.ok) {
      console.log("Erreur backend :", await response.text());
      return;
    }
    console.log("Reponse" ,response);
    
    AsyncStorage.setItem('user', await response.json());

    router.replace("/auth/login");
  } catch (err) {
    console.error("Erreur réseau :", err);
  }
};


  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#000" : "#fff" }]}>
  {/* Logo */}
  <View style={{ marginBottom: 0 }}>
        {isDark ? <WorkNLifeLogoWhite width={280} height={150} />  : <WorkNLifeLogo width={280} height={150} />}
        
      </View>

  {/* Titres */}
  <Text style={[styles.subtitle, { color: isDark ? "#aaa" : "#666" }]}>Créez votre compte</Text>
  <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Inscription</Text>

  {/* Nom complet */}
  <Text style={[styles.label, { color: isDark ? "#fff" : "#000" }]}>Nom complet</Text>
  <TextInput
    style={[styles.input, { backgroundColor: isDark ? "#111" : "#fff", color: isDark ? "#fff" : "#000", borderColor: isDark ? "#444" : "#ddd" }]}
    placeholder="Votre nom complet"
    placeholderTextColor={isDark ? "#888" : "#aaa"}
    value={form.full_name}
    onChangeText={(v) => handleChange("full_name", v)}
  />

  {/* Email */}
  <Text style={[styles.label, { color: isDark ? "#fff" : "#000" }]}>Email</Text>
  <TextInput
    style={[styles.input, { backgroundColor: isDark ? "#111" : "#fff", color: isDark ? "#fff" : "#000", borderColor: isDark ? "#444" : "#ddd" }]}
    placeholder="exemple@email.com"
    placeholderTextColor={isDark ? "#888" : "#aaa"}
    value={form.email}
    onChangeText={(v) => handleChange("email", v)}
  />

  {/* Téléphone */}
  <Text style={[styles.label, { color: isDark ? "#fff" : "#000" }]}>Téléphone</Text>
  <TextInput
    style={[styles.input, { backgroundColor: isDark ? "#111" : "#fff", color: isDark ? "#fff" : "#000", borderColor: isDark ? "#444" : "#ddd" }]}
    placeholder="774060998"
    placeholderTextColor={isDark ? "#888" : "#aaa"}
    keyboardType="numeric"
    value={form.phone}
    onChangeText={(v) => handleChange("phone", v)}
  />

  {/* Mot de passe */}
  <Text style={[styles.label, { color: isDark ? "#fff" : "#000" }]}>Mot de passe</Text>
  <View style={[styles.passwordBox, { backgroundColor: isDark ? "#111" : "#fff", borderColor: isDark ? "#444" : "#ddd" }]}>
    <TextInput
      style={[styles.passwordInput, { color: isDark ? "#fff" : "#000" }]}
      secureTextEntry={secure}
      placeholder="Mot de passe"
      placeholderTextColor={isDark ? "#888" : "#aaa"}
      value={form.password}
      onChangeText={(v) => handleChange("password", v)}
    />
    <TouchableOpacity onPress={() => setSecure(!secure)}>
      <Ionicons name={secure ? "eye-off" : "eye"} size={22} color={isDark ? "#ccc" : "#555"} />
    </TouchableOpacity>
  </View>

  {/* Bouton créer compte */}
  <TouchableOpacity style={[styles.signupBtn, { backgroundColor: "#1043B1" }]} onPress={handleSignup}>
    <Text style={styles.signupText}>Créer un compte</Text>
  </TouchableOpacity>

  {/* Déjà un compte ? */}
  <Text style={[styles.haveText, { color: isDark ? "#aaa" : "#666" }]}>Déjà membre ?</Text>
  <TouchableOpacity onPress={() => router.push("/auth/login")}>
    <Text style={[styles.loginLink, { color: isDark ? "#4EA3FF" : "#1043B1" }]}>Se connecter</Text>
  </TouchableOpacity>
</View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 90,
    backgroundColor: "#fff"
  },

  logoBox: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: "#1043B1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25
  },

  title: { fontSize: 30, fontWeight: "700", marginBottom: 5},
  subtitle: { color: "#666", marginBottom: 25 },
  sectionTitle: { fontSize: 22, fontWeight: "600", marginBottom: 25 },

  label: { width: "100%", marginBottom: 8, fontWeight: "500" },

  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15
  },

  passwordBox: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15
  },

  passwordInput: { flex: 1 },

  signupBtn: {
    width: "100%",
    height: 50,
    backgroundColor: "#1043B1",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },

  signupText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600"
  },

  haveText: { marginTop: 15, color: "#666" },
  loginLink: { color: "#1043B1", marginTop: 4, fontWeight: "600" }
});
