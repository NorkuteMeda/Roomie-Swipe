import { useState } from "react";
import { Text, View, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { signInWithEmailAndPassword } from "firebase/auth";

import TextInputComponent from "../components/TextInputComponent";
import ButtonComponent from "../components/ButtonComponent";
import { GlobalStyle } from "../styles/GlobalStyle";
import { auth } from "../database/firebase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // App.js skifter selv skærm, når login lykkes
    } catch (error) {
      Alert.alert("Fejl", error.message);
    }
  };

  return (
    <View style={GlobalStyle.container}>
      <Text style={GlobalStyle.login}>roomie</Text>

      <TextInputComponent label="Email" hint="email@student.cbs.dk" value={email} onChangeText={setEmail} />
      <TextInputComponent label="Adgangskode" hint="adgangskode" secureTextEntry={true} value={password} onChangeText={setPassword} />

      <ButtonComponent title="Log ind" type="primary" onPress={handleLogin} />
      <ButtonComponent title="Opret profil" type="secondary" onPress={() => navigation.navigate("SignUp")} />

      <StatusBar style="auto" />
    </View>
  );
}