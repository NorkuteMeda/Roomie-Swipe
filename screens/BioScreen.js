import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, ScrollView, Alert, ActivityIndicator, View } from 'react-native';
import { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';

import ButtonComponent from '../components/ButtonComponent';
import { GlobalStyle } from '../styles/GlobalStyle';
import { auth, rtdb } from '../database/firebase';

// Samme længde som AI'en får besked om at holde sig under
const MAX_LAENGDE = 400;

// Min bio: brugeren retter selv sin bio. AI-hjælpen er valgfri og åbnes kun, hvis man trykker på den.
export default function BioScreen({ navigation }) {
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);

  // Lytter på bioen i Firebase 
  // Når AI-skærmen gemmer en ny bio, kommer den automatisk ind i tekstfeltet her.
  useEffect(() => {
    const unsubscribe = onValue(ref(rtdb, 'users/' + auth.currentUser.uid + '/bio'), (snap) => {
      setBio(snap.val() || '');
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Gemmer kun bio-feltet med update, så resten af profilen bliver liggende
  const saveBio = async () => {
    try {
      await update(ref(rtdb, 'users/' + auth.currentUser.uid), { bio: bio.trim() });
      navigation.goBack();
    } catch (e) {
      Alert.alert(e?.message || 'Noget gik galt.');
    }
  };

  if (loading) {
    return (
      <View style={GlobalStyle.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={GlobalStyle.scrollContainer}>
      <Text style={GlobalStyle.onboardingIntro}>
        Det her ser andre, når de swiper forbi dig. Ret i teksten, eller få hjælp af AI til et nyt udkast.
      </Text>

      <TextInput
        style={GlobalStyle.bioInput}
        value={bio}
        onChangeText={setBio}
        multiline={true}
        maxLength={MAX_LAENGDE}
        placeholder="Skriv lidt om dig selv…"
      />
      {/* Tæller, så man kan se hvor meget plads der er tilbage */}
      <Text style={GlobalStyle.bioCounter}>{bio.length}/{MAX_LAENGDE}</Text>

      <ButtonComponent title="Gem" type="primary" width="100%" onPress={saveBio} />
      <ButtonComponent title="Få hjælp af AI" type="secondary" width="100%" onPress={() => navigation.navigate('AiBio', { fraBio: true })} />

      <StatusBar style="auto" />
    </ScrollView>
  );
}