import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import WorkNLifeLogo from "@/assets/images/WorkNLife-OG.svg";
import WorkNLifeLogoWhite from "@/assets/images/WorkNLife-OG-white.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const router = useRouter();
  const [secure, setSecure] = useState(true);
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!userEmail || !password) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.23:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Identifiants incorrects");
        return;
      }
      console.log("Reopnse log", data);

      await AsyncStorage.setItem("isLogged", "true");
      await AsyncStorage.setItem("mobile_token", data.mobile_token);
      await AsyncStorage.setItem("userData", JSON.stringify(data.user));
      console.log(data.user);
      
      router.replace("/(tabs)");
    } catch (error) {
      console.log(error);
      alert("Erreur réseau");
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: isDark ? "#000" : "#fff" }]}
    >
      <View style={{ marginBottom: 0 }}>
        {isDark ? (
          <WorkNLifeLogoWhite width={280} height={150} />
        ) : (
          <WorkNLifeLogo width={280} height={150} />
        )}
      </View>

      <Text style={[styles.subtitle, { color: isDark ? "#fff" : "#666" }]}>
        Accédez à votre compte
      </Text>
      <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>
        Connexion
      </Text>

      <Text style={[styles.label, { color: isDark ? "#fff" : "#000" }]}>
        Email ou nom d'utilisateur
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#111" : "#fff",
            color: isDark ? "#fff" : "#000",
            borderColor: isDark ? "#444" : "#ddd",
          },
        ]}
        placeholder="exemple@email.com"
        placeholderTextColor={isDark ? "#888" : "#aaa"}
        value={userEmail}
        onChangeText={setEmail}
      />

      <Text style={[styles.label, { color: isDark ? "#fff" : "#000" }]}>
        Mot de passe
      </Text>
      <View
        style={[
          styles.passwordBox,
          {
            borderColor: isDark ? "#444" : "#ddd",
            backgroundColor: isDark ? "#111" : "#fff",
          },
        ]}
      >
        <TextInput
          style={[styles.passwordInput, { color: isDark ? "#fff" : "#000" }]}
          secureTextEntry={secure}
          placeholder="Votre mot de passe"
          placeholderTextColor={isDark ? "#888" : "#aaa"}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Ionicons
            name={secure ? "eye-off" : "eye"}
            size={22}
            color={isDark ? "#ccc" : "#555"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.rowBetween}>
        <TouchableOpacity
          style={[
            styles.checkbox,
            { borderColor: isDark ? "#fff" : "#1043B1" },
          ]}
        ></TouchableOpacity>
        <Text style={[styles.remember, { color: isDark ? "#fff" : "#000" }]}>
          Se souvenir de moi
        </Text>

        <TouchableOpacity onPress={() => router.push("/")}>
          <Text
            style={[styles.forgot, { color: isDark ? "#4EA3FF" : "#1043B1" }]}
          >
            Mot de passe oublié ?
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.loginBtn, { backgroundColor: "#1043B1" }]}
        onPress={handleLogin}
      >
        <Text style={styles.loginText}>Connexion</Text>
      </TouchableOpacity>

      <Text style={[styles.newText, { color: isDark ? "#aaa" : "#666" }]}>
        Nouveau sur WorkNlife ?
      </Text>

      <TouchableOpacity
        style={[
          styles.signupBtn,
          { backgroundColor: isDark ? "#222" : "#eee" },
        ]}
        onPress={() => router.push("/auth/signup")}
      >
        <Text style={[styles.signupText, { color: isDark ? "#fff" : "#000" }]}>
          Créer un compte
        </Text>
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
    backgroundColor: "#fff",
  },

  logoBox: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: "#1043B1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 5,
  },

  subtitle: {
    color: "#666",
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 25,
  },

  label: {
    width: "100%",
    marginBottom: 8,
    fontWeight: "500",
  },

  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
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
    marginBottom: 15,
  },

  passwordInput: {
    flex: 1,
  },

  rowBetween: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#1043B1",
    borderRadius: 5,
    marginRight: 8,
  },

  remember: {
    flex: 1,
  },

  forgot: {
    color: "#1043B1",
  },

  loginBtn: {
    width: "100%",
    height: 50,
    backgroundColor: "#1043B1",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  newText: {
    marginBottom: 10,
    color: "#666",
  },

  signupBtn: {
    width: "100%",
    height: 50,
    backgroundColor: "#eee",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  signupText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
