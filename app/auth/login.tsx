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

export default function Login() {
  const router = useRouter();
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.container}>

      {/* Logo */}
      <View style={styles.logoBox}>
        <Ionicons name="people" size={40} color="#fff" />
      </View>

      {/* Titres */}
      <Text style={styles.title}>WorkNLife</Text>
      <Text style={styles.subtitle}>Accédez à votre compte</Text>
      <Text style={styles.sectionTitle}>Connexion</Text>

      {/* Champ Email */}
      <Text style={styles.label}>Email ou nom d'utilisateur</Text>
      <TextInput
        style={styles.input}
        placeholder="exemple@email.com"
        placeholderTextColor="#aaa"
      />

      {/* Champ Mot de passe */}
      <Text style={styles.label}>Mot de passe</Text>
      <View style={styles.passwordBox}>
        <TextInput
          style={styles.passwordInput}
          secureTextEntry={secure}
          placeholder="Votre mot de passe"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Ionicons name={secure ? "eye-off" : "eye"} size={22} color="#555" />
        </TouchableOpacity>
      </View>

      {/* Remember me + mot de passe oublié */}
      <View style={styles.rowBetween}>
        <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
        <Text style={styles.remember}>Se souvenir de moi</Text>

        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={styles.forgot}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
      </View>

      {/* Bouton Connexion */}
      <TouchableOpacity 
        style={styles.loginBtn}
        onPress={() => router.replace("/(tabs)")}
      >
        <Text style={styles.loginText}>Connexion</Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.newText}>Nouveau sur WorkNlife ?</Text>

      {/* Bouton Créer un compte */}
      <TouchableOpacity 
        style={styles.signupBtn}
        onPress={() => router.push("/auth/signup")}
      >
        <Text style={styles.signupText}>Créer un compte</Text>
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

  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 5
  },

  subtitle: {
    color: "#666",
    marginBottom: 25
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 25
  },

  label: {
    width: "100%",
    marginBottom: 8,
    fontWeight: "500"
  },

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

  passwordInput: {
    flex: 1
  },

  rowBetween: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: 20
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#1043B1",
    borderRadius: 5,
    marginRight: 8
  },

  remember: {
    flex: 1
  },

  forgot: {
    color: "#1043B1"
  },

  loginBtn: {
    width: "100%",
    height: 50,
    backgroundColor: "#1043B1",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },

  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600"
  },

  newText: {
    marginBottom: 10,
    color: "#666"
  },

  signupBtn: {
    width: "100%",
    height: 50,
    backgroundColor: "#eee",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },

  signupText: {
    fontSize: 16,
    fontWeight: "600"
  }
});
