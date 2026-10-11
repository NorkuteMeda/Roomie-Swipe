import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { ref, get, update } from 'firebase/database';

import QuestionComponent from '../components/QuestionComponent';
import TextInputComponent from '../components/TextInputComponent';
import ButtonComponent from '../components/ButtonComponent';
import { ONBOARDING_QUESTIONS } from '../data/const';
import { GlobalStyle } from '../styles/GlobalStyle';
import { auth, rtdb } from '../database/firebase';

// Svarmulighederne til alle skala-spørgsmål
const SKALA = [1, 2, 3, 4, 5];

// Onboarding: brugeren svarer på spørgsmål om hverdagen som roomie.
// Svarene gemmes som faste værdier i Firebase, så de senere kan bruges til matching, filtre og AI-bio.
export default function OnboardingScreen({ navigation }) {
  // answers er ét objekt med alle svar, fx { ryger: 'Nej', renlighed: 4, interesser: ['Sport'] }
  const [answers, setAnswers] = useState({});
  // rolle ('Lejer' eller 'Udlejer') vælges på Min profil og bestemmer hvilke spørgsmål der vises
  const [rolle, setRolle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Henter hele brugeren: rollen fra profilen og tidligere svar fra onboarding
  useEffect(() => {
    const loadUser = async () => {
      try {
        const snapshot = await get(ref(rtdb, 'users/' + auth.currentUser.uid));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setRolle(data.rolle || null);
          setAnswers(data.onboarding || {});
        }
      } catch (e) {
        Alert.alert(e?.message || 'Kunne ikke hente dine svar.');
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Kun spørgsmål uden forRolle, eller med brugerens egen rolle, vises
  const visibleQuestions = ONBOARDING_QUESTIONS.filter((q) => !q.forRolle || q.forRolle === rolle);

  // Opdaterer ét svar og beholder resten (samme idé som ændrTekst i 05_firebase).
  // Ved flervalg tilføjes eller fjernes svaret i et array, ligesom interesserne gjorde på Min profil.
  const chooseAnswer = (q, value) => {
    if (q.type === 'flervalg') {
      const current = answers[q.key] || [];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      setAnswers((prev) => ({ ...prev, [q.key]: next }));
    } else {
      setAnswers((prev) => ({ ...prev, [q.key]: value }));
    }
  };

  const saveAnswers = async () => {
    // Simpel validering: alle viste spørgsmål skal være besvaret, undtagen dem der er markeret optional
    const missing = visibleQuestions.find((q) => !q.optional && answers[q.key] === undefined);
    if (missing) {
      Alert.alert('Du mangler at svare', missing.question);
      return;
    }

    // Gem kun svar på de spørgsmål, der vises nu. Så forsvinder gamle svar fx hvis man skifter rolle.
    const toSave = {};
    visibleQuestions.forEach((q) => {
      if (answers[q.key] !== undefined) toSave[q.key] = answers[q.key];
    });

    try {
      // update ændrer kun onboarding-feltet og lader navn, bio, billede osv. være i fred
      await update(ref(rtdb, 'users/' + auth.currentUser.uid), { onboarding: toSave });
      // reset rydder historikken, så man ikke kan gå "tilbage" ind i spørgsmålene fra Swipe
      navigation.reset({ index: 0, routes: [{ name: 'Swipe' }] });
    } catch (e) {
      Alert.alert(e?.message || 'Noget gik galt.');
    }
  };

  if (loading) {
    return (
      <View style={GlobalStyle.container}>
        <ActivityIndicator />
        <Text>Henter dine svar…</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={GlobalStyle.scrollContainer}>
      <Text style={GlobalStyle.onboardingIntro}>
        Svar på et par hurtige spørgsmål, så vi kan finde en roomie, der passer til din hverdag.
      </Text>

      {/* Tekst-spørgsmål bruger det eksisterende TextInputComponent, resten bruger QuestionComponent */}
      {visibleQuestions.map((q) =>
        q.type === 'tekst' ? (
          <TextInputComponent
            key={q.key}
            label={q.question}
            hint={q.hint}
            multiline={true}
            value={answers[q.key] || ''}
            onChangeText={(value) => chooseAnswer(q, value)}
          />
        ) : (
          <QuestionComponent
            key={q.key}
            question={q.question}
            options={q.type === 'skala' ? SKALA : q.options}
            selected={answers[q.key]}
            onSelect={(value) => chooseAnswer(q, value)}
            multi={q.type === 'flervalg'}
            low={q.low}
            high={q.high}
          />
        )
      )}

      <ButtonComponent title="Gem og fortsæt" type="primary" width="100%" onPress={saveAnswers} />

      <StatusBar style="auto" />
    </ScrollView>
  );
}