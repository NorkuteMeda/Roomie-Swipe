import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import TextInputComponent from '../components/TextInputComponent';
import ButtonComponent from '../components/ButtonComponent';

import { GlobalStyle } from '../styles/GlobalStyle';

// interesser brugeren kan vælge mellem, hardcodet for nu
const INTERESTS = ['Sport', 'Gaming', 'Madlavning', 'Musik', 'Rejser'];

// Skærm til at oprette/udfylde profil. Navigation-props kommer automatisk fra Stack.Screen i App.js.
export default function ProfileSetupScreen({ navigation }) {

  // firstName/age/bio er ikke brugt lige nu 
  // og understøtter ikke længere value/onChangeText. 
  // const [firstName, setFirstName] = useState("");
  // const [age, setAge] = useState("");
  // const [bio, setBio] = useState("");

  // furnished holder styr på om "Ja" eller "Nej" er valgt (kun én værdi ad gangen, som en radio-knap)
  const [furnished, setFurnished] = useState(null);

  // selectedInterests er et array, da man kan vælge FLERE interesser samtidig
  const [selectedInterests, setSelectedInterests] = useState([]);

  // Tilføjer eller fjerner en interesse fra det valgte array, afhængig af om den allerede er valgt
  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest)); // fjern
    } else {
      setSelectedInterests([...selectedInterests, interest]); // tilføj
    }
  }
  return (
    <ScrollView contentContainerStyle={GlobalStyle.container}>

      {/* value/onChangeText udkommenteret, da TextInputComponent ikke længere understøtter dem */}
      <TextInputComponent label="Fornavn" hint="Fornavn" /* value={firstName} onChangeText={setFirstName} */ />
      <TextInputComponent label="Alder" hint="Alder" keyboardType="numeric" /* value={age} onChangeText={setAge} */ />
      <TextInputComponent label="Bio" hint="Skriv lidt om dig selv" multiline={true} /* value={bio} onChangeText={setBio} */ />

      {/* Interesse-chips - genererer en knap per element i INTERESTS med .map() */}
      <Text style={GlobalStyle.profilesetup}>Interesser</Text>
      <View style={GlobalStyle.chipRow}>
        {INTERESTS.map((interest, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleInterest(interest)}
            // Skifter farve (orange/grå) afhængig af om denne interesse er valgt
            style={[GlobalStyle.chip, selectedInterests.includes(interest) ? GlobalStyle.chipSelected : GlobalStyle.chipDefault]}
          >
            <Text>{interest}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Møbleret ja/nej - samme styling som interesser, men kun et valg muligt */}
      <Text style={GlobalStyle.profilesetup}>Møbleret værelse?</Text>
      <View style={GlobalStyle.chipRow}>
        {['Ja', 'Nej'].map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setFurnished(option)}
            style={[GlobalStyle.chip, furnished === option ? GlobalStyle.chipSelected : GlobalStyle.chipDefault]}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Navigerer videre til Swipe-skærmen når man trykker Næste */}
      <ButtonComponent title="Næste" type="primary" width="100%" onPress={() => navigation.navigate('Swipe')} />

      <StatusBar style="auto" />
    </ScrollView>
  );
}