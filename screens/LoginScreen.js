import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import TextInputComponent from '../components/TextInputComponent';
import ButtonComponent from '../components/ButtonComponent';

import { GlobalStyle } from '../styles/GlobalStyle';

export default function LoginScreen({ navigation }) {

// Simpel login, første skærm brugeren ser (se initialRouteName i App.js).
// knapper navigerer bare videre til ProfileSetup.
  return (
    <View style={GlobalStyle.container}>
      <Text style={GlobalStyle.login}>roomie</Text>

      <TextInputComponent label="Email" hint="email@student.cbs.dk" />
      <TextInputComponent label="Adgangskode" hint="adgangskode" secureTextEntry={true} />

      <ButtonComponent title="Log ind" type="primary" onPress={() => navigation.navigate('ProfileSetup')} />
      <ButtonComponent title="Opret profil" type="secondary" onPress={() => navigation.navigate('ProfileSetup')} />

      <StatusBar style="auto" />
    </View>
  );
}