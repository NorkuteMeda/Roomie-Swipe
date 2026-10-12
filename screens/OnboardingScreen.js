import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { ref, get, update } from 'firebase/database';

import QuestionComponent from '../components/QuestionComponent';
import SliderQuestionComponent from '../components/SliderQuestionComponent';
import TextInputComponent from '../components/TextInputComponent';
import ButtonComponent from '../components/ButtonComponent';
import { ONBOARDING_QUESTIONS } from '../data/const';
import { GlobalStyle } from '../styles/GlobalStyle';
import { auth, rtdb } from '../database/firebase';

// Svarmulighederne til alle skala-spørgsmål
const SKALA = [1, 2, 3, 4, 5];

// Onboarding: brugeren svarer på spørgsmål om hverdagen som roomie.
// Svarene gemmes som faste værdier i Firebase, så de senere kan bruges til matching, filtre og AI-bio.
export default function OnboardingScreen({ navigation, route }) {
  // fraMenu = true, når skærmen er åbnet fra Profil-menuen. Så går "Gem" tilbage i stedet for videre til AI-bio.
  const fraMenu = route.params?.fraMenu === true;

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
          const savedAnswers = data.onboarding || {};

          // Sliders starter på deres default-værdi, så brugeren ikke skal trække i dem for at komme videre
          const defaults = {};
          ONBOARDING_QUESTIONS.forEach((q) => {
            const forMig = !q.forRolle || q.forRolle === data.rolle;
            if (q.type === 'slider' && forMig && savedAnswers[q.key] === undefined) {
              defaults[q.key] = q.default;
            }
          });

          setRolle(data.rolle || null);
          setAnswers({ ...defaults, ...savedAnswers });
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
    // Simpel validering: alle viste spørgsmål skal være besvaret, undtagen dem der er markeret optional.
    // Et tomt flervalg (ingen chips valgt) tæller også som ubesvaret.
    const isMissing = (value) => value === undefined || (Array.isArray(value) && value.length === 0);
    const missing = visibleQuestions.find((q) => !q.optional && isMissing(answers[q.key]));
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
      if (fraMenu) {
        navigation.goBack();
      } else {
        // Første gang: videre til AI-profilhjælperen, som skriver en bio ud fra svarene
        navigation.navigate('AiBio');
      }
    } catch (e) {
      Alert.alert(e?.message || 'Noget gik galt.');
    }
  };

  // Vælger den rigtige komponent til spørgsmålet ud fra type
  const renderQuestion = (q) => {
    if (q.type === 'tekst') {
      return (
        <TextInputComponent
          key={q.key}
          label={q.question}
          hint={q.hint}
          multiline={true}
          value={answers[q.key] || ''}
          onChangeText={(value) => chooseAnswer(q, value)}
        />
      );
    }

    if (q.type === 'slider') {
      return (
        <SliderQuestionComponent
          key={q.key}
          question={q.question}
          value={answers[q.key] ?? q.default}
          onChange={(value) => chooseAnswer(q, value)}
          min={q.min}
          max={q.max}
          step={q.step}
          unit={q.unit}
          maxLabel={q.maxLabel}
        />
      );
    }

    return (
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
    );
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

      {/* Hvert spørgsmål vises med den komponent, der passer til typen (se renderQuestion ovenfor) */}
      {visibleQuestions.map(renderQuestion)}

      <ButtonComponent title={fraMenu ? 'Gem' : 'Gem og fortsæt'} type="primary" width="100%" onPress={saveAnswers} />

      <StatusBar style="auto" />
    </ScrollView>
  );
}