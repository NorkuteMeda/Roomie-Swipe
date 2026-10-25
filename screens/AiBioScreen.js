import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { ref, get, update } from 'firebase/database';

import ButtonComponent from '../components/ButtonComponent';
import SendMessage from '../services/Request';
import { ONBOARDING_QUESTIONS } from '../data/const';
import { GlobalStyle } from '../styles/GlobalStyle';
import { auth, rtdb } from '../database/firebase';

// AI'ens regler. Systembeskeden ses ikke af brugeren, men styrer hvordan AI'en svarer
const SYSTEM_PROMPT = `Du er profilhjælper i RoomieMatch, en app hvor unge finder en roomie. Det er ikke en dating-app.
Skriv en kort bio til brugerens profil ud fra brugerens svar.
Regler:
- Skriv på dansk i første person ("jeg"), venligt og uformelt.
- Max 400 tegn.
- Brug KUN oplysninger fra svarene. Opfind ikke hobbyer, job eller andet.
- Ingen romantik eller dating-sprog.
- Når brugeren beder om ændringer, svar KUN med den nye bio, uden forklaring.`;

// Laver brugerens profil og svar tekst til AI'en
const formatAnswers = (data) => {
  const lines = [];
  if (data.firstName) lines.push('Navn: ' + data.firstName);
  if (data.age) lines.push('Alder: ' + data.age);
  if (data.koen) lines.push('Køn: ' + data.koen);
  if (data.rolle) lines.push('Rolle: ' + data.rolle);

  const answers = data.onboarding || {};
  ONBOARDING_QUESTIONS.forEach((q) => {
    // Spring spørgsmål over, der hører til den anden rolle (lejer og udlejer deler nogle keys)
    if (q.forRolle && q.forRolle !== data.rolle) return;
    const value = answers[q.key];
    if (value === undefined || value === '') return;
    if (Array.isArray(value)) lines.push(q.question + ': ' + value.join(', '));
    else if (q.type === 'skala') lines.push(q.question + ': ' + value + ' ud af 5');
    else if (q.type === 'slider') lines.push(q.question + ': ' + value + ' ' + q.unit);
    else lines.push(q.question + ': ' + value);
  });

  return lines.join('\n');
};

// AI-profilhjælper: skriver et udkast til brugerens bio ud fra onboarding, og brugeren kan bede om rettelser.
export default function AiBioScreen({ navigation, route }) {
  // fraBio = true, når skærmen er åbnet fra "Min bio". Så går "Brug som min bio" tilbage dertil,
  // hvor brugeren selv kan rette teksten, i stedet for at fortsætte til appen.
  const fraBio = route.params?.fraBio === true;

  // messages er det, brugeren ser i chatten: { id, role: 'user' eller 'assistant', content }
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const listRef = useRef(null);

  // Samtalens "hukommelse", som sendes til OpenAI hver gang 
  // useRef i stedet for useState, fordi den ikke vises og ikke skal få skærmen til at tegne igen.
  const conversationHistory = useRef([{ role: 'system', content: SYSTEM_PROMPT }]);

  // Tilføjer en besked til chatten. id bruges som key i FlatList.
  const addMessage = (role, content) => {
    setMessages((prev) => [...prev, { id: String(Date.now() + Math.random()), role, content }]);
  };

  // Sender en besked til AI'en og viser svaret. showInChat = false bruges til den første besked med svarene.
  const askAI = async (userText, showInChat) => {
    conversationHistory.current.push({ role: 'user', content: userText });
    if (showInChat) addMessage('user', userText);
    setLoading(true);

    try {
      const answer = await SendMessage(conversationHistory.current);
      conversationHistory.current.push(answer);
      addMessage('assistant', answer.content);
    } catch (e) {
      Alert.alert('AI-fejl', e?.message || 'Noget gik galt.');
    } finally {
      setLoading(false);
    }
  };

  // Når skærmen åbner: hent profilen og bed AI'en om det første udkast
  useEffect(() => {
    const start = async () => {
      try {
        const snapshot = await get(ref(rtdb, 'users/' + auth.currentUser.uid));
        const data = snapshot.exists() ? snapshot.val() : {};
        // Har brugeren allerede en bio, får AI'en den med, så den kan bygge videre på den
        const nuvaerende = data.bio ? '\nMin nuværende bio: ' + data.bio : '';
        await askAI('Her er mine svar. Skriv et udkast til min bio:\n' + formatAnswers(data) + nuvaerende, false);
      } catch (e) {
        Alert.alert(e?.message || 'Kunne ikke hente din profil.');
        setLoading(false);
      }
    };
    start();
  }, []);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    askAI(text, true);
  };

  // Den nyeste AI-besked er den seneste version af bioen
  const latestBio = [...messages].reverse().find((m) => m.role === 'assistant')?.content;

  // Gemmer bioen med update, så resten af profilen bliver liggende 
  const saveBio = async () => {
    if (!latestBio || loading) return;
    try {
      await update(ref(rtdb, 'users/' + auth.currentUser.uid), { bio: latestBio });
      if (fraBio) {
        // Tilbage til "Min bio", som selv henter den nye tekst fra Firebase
        navigation.goBack();
      } else {
        // Første gang: ind i appen. reset rydder historikken, så man ikke kan gå tilbage til oprettelsen.
        navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
      }
    } catch (e) {
      Alert.alert(e?.message || 'Noget gik galt.');
    }
  };

  const skip = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <KeyboardAvoidingView
      style={GlobalStyle.chatContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <Text style={GlobalStyle.chatIntro}>
        AI'en har skrevet et udkast ud fra dine svar. Bed den om at rette det, fx "gør den kortere".
      </Text>

      {/* Chatten - brugerens beskeder til højre, AI'ens til venstre */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={GlobalStyle.chatList}
        onContentSizeChange={() => listRef.current?.scrollToEnd()}
        renderItem={({ item }) => (
          <View style={item.role === 'user' ? GlobalStyle.bubbleUser : GlobalStyle.bubbleAi}>
            <Text style={item.role === 'user' ? GlobalStyle.bubbleUserText : GlobalStyle.bubbleAiText}>{item.content}</Text>
          </View>
        )}
      />

      {/* Vises mens vi venter på AI'en */}
      {loading && (
        <View style={GlobalStyle.chatLoading}>
          <ActivityIndicator />
          <Text style={GlobalStyle.chatLoadingText}>AI'en skriver…</Text>
        </View>
      )}

      <View style={GlobalStyle.chatInputRow}>
        <TextInput
          style={GlobalStyle.chatInput}
          placeholder="Skriv en besked…"
          value={input}
          onChangeText={setInput}
          multiline={true}
        />
        <ButtonComponent title="Send" type="primary" width={80} onPress={sendMessage} />
      </View>

      <ButtonComponent title="Brug som min bio" type="primary" width="100%" onPress={saveBio} />
      {/* Spring over giver kun mening under oprettelsen - fra "Min bio" bruger man bare tilbage-pilen */}
      {!fraBio && <ButtonComponent title="Spring over" type="secondary" width="100%" onPress={skip} />}

      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}