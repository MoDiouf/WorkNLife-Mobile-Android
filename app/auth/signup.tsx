import { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import TimelineBackground from "@/components/AnimatedBackground";

export default function Signup() {
  const router = useRouter();
  const [secure, setSecure] = useState(true);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleChange = (key: any, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignup = () => {
    console.log("Signup data :", form);

    // 👉 Ici tu ajouteras ta requête API
    // fetch("https://tonapi.com/signup", { ... })

    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <TimelineBackground />
      {/* Logo */}
      <View style={styles.logoBox}>
        <Ionicons name="people" size={40} color="#fff" />
      </View>

      <Text style={styles.title}>WorkNLife</Text>
      <Text style={styles.subtitle}>Créez votre compte</Text>
      <Text style={styles.sectionTitle}>Inscription</Text>

      {/* Nom complet */}
      <Text style={styles.label}>Nom complet</Text>
      <TextInput
        style={styles.input}
        placeholder="Votre nom complet"
        placeholderTextColor="#aaa"
        value={form.full_name}
        onChangeText={(v) => handleChange("full_name", v)}
      />

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="exemple@email.com"
        placeholderTextColor="#aaa"
        value={form.email}
        onChangeText={(v) => handleChange("email", v)}
      />

      {/* Téléphone */}
      <Text style={styles.label}>Téléphone</Text>
      <TextInput
        style={styles.input}
        placeholder="774060998"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={form.phone}
        onChangeText={(v) => handleChange("phone", v)}
      />

      {/* Mot de passe */}
      <Text style={styles.label}>Mot de passe</Text>
      <View style={styles.passwordBox}>
        <TextInput
          style={styles.passwordInput}
          secureTextEntry={secure}
          placeholder="Mot de passe"
          placeholderTextColor="#aaa"
          value={form.password}
          onChangeText={(v) => handleChange("password", v)}
        />

        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Ionicons name={secure ? "eye-off" : "eye"} size={22} color="#555" />
        </TouchableOpacity>
      </View>

      {/* Bouton créer compte */}
      <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
        <Text style={styles.signupText}>Créer un compte</Text>
      </TouchableOpacity>

      {/* Déjà un compte ? */}
      <Text style={styles.haveText}>Déjà membre ?</Text>

      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text style={styles.loginLink}>Se connecter</Text>
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
