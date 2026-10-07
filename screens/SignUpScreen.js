import { useState } from "react";
import { Text, View, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { createUserWithEmailAndPassword } from "firebase/auth";

import TextInputComponent from "../components/TextInputComponent";
import ButtonComponent from "../components/ButtonComponent";
import { GlobalStyle } from "../styles/GlobalStyle";
import { auth } from "../database/firebase";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Fejl", "Kodeordene er ikke ens");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Brugeren bliver automatisk logget ind, og App.js skifter skærm
    } catch (error) {
      Alert.alert("Fejl", error.message);
    }
  };

  return (
    <View style={GlobalStyle.container}>
      <Text style={GlobalStyle.login}>Opret bruger</Text>

      <TextInputComponent label="Email" hint="email@student.cbs.dk" value={email} onChangeText={setEmail} />
      <TextInputComponent label="Adgangskode" hint="mindst 6 tegn" secureTextEntry={true} value={password} onChangeText={setPassword} />
      <TextInputComponent label="Gentag adgangskode" hint="adgangskode" secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword} />

      <ButtonComponent title="Opret bruger" type="primary" onPress={handleSignup} />
      <ButtonComponent title="Tilbage til log ind" type="secondary" onPress={() => navigation.navigate("Login")} />

      <StatusBar style="auto" />
    </View>
  );
}