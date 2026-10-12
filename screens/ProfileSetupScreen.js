import { StatusBar } from 'expo-status-bar';
import { ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ref, update, get } from 'firebase/database';
import { signOut } from 'firebase/auth';

import ProfilePictureComponent from '../components/ProfilePictureComponent';
import TextInputComponent from '../components/TextInputComponent';
import QuestionComponent from '../components/QuestionComponent';
import ButtonComponent from '../components/ButtonComponent';

import { GlobalStyle } from '../styles/GlobalStyle';
import { auth, rtdb } from '../database/firebase';

// Gør en billedfil om til en tekststreng, som kan gemmes i databasen
const uriToBase64 = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Skærm til at oprette/udfylde profil. Navigation-props kommer automatisk fra Stack.Screen i App.js.
export default function ProfileSetupScreen({ navigation, route }) {
  // fraMenu = true, når skærmen er åbnet fra Profil-menuen. Så går "Gem" tilbage i stedet for videre til onboarding.
  // Gemmes i state, så den huskes selvom kameraet sender nye params (photoUri) tilbage.
  const [fraMenu] = useState(route.params?.fraMenu === true);

  // Tekstfelter. Bio skrives ikke her, men med AI-profilhjælperen eller under "Min bio".
  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState('');

  // Grundlæggende valg - kun én værdi ad gangen, som en radio-knap.
  // rolle bestemmer også hvilke spørgsmål der vises i onboarding.
  const [koen, setKoen] = useState(null);
  const [rolle, setRolle] = useState(null);

  const [profileImage, setProfileImage] = useState(null);

  // Henter den gemte profil fra databasen, når skærmen åbnes
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const snapshot = await get(ref(rtdb, 'users/' + auth.currentUser.uid));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setFirstName(data.firstName || '');
          setAge(data.age || '');
          setKoen(data.koen || null);
          setRolle(data.rolle || null);
          if (data.image) setProfileImage(data.image);
        }
      } catch (error) {
        console.log('Kunne ikke hente profil:', error);
      }
    };
    loadProfile();
  }, []);

  // Når kameraskærmen sender et billede tilbage, ligger det i route.params
  useEffect(() => {
    if (route.params?.photoUri) {
      setProfileImage(route.params.photoUri);
    }
  }, [route.params?.photoUri]);

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const chooseSource = () => {
    Alert.alert('Profilbillede', 'Hvordan vil du tilføje et billede?', [
      { text: 'Tag billede', onPress: () => navigation.navigate('Camera') },
      { text: 'Vælg fra galleri', onPress: pickFromGallery },
      { text: 'Annuller', style: 'cancel' },
    ]);
  };

  // Gemmer profilen under users/<uid> og går videre til onboarding (eller tilbage til menuen)
  const saveProfile = async () => {
    // Køn og rolle skal vælges, fordi onboarding og matching bygger på dem
    if (!koen || !rolle) {
      Alert.alert('Du mangler at svare', 'Vælg dit køn, og om du er lejer eller udlejer.');
      return;
    }

    try {
      const uid = auth.currentUser.uid;

      // Er billedet allerede tekst (hentet fra databasen), skal det ikke konverteres igen
      let image = null;
      if (profileImage) {
        image = profileImage.startsWith('data:') ? profileImage : await uriToBase64(profileImage);
      }

      // bio er bevidst ikke med her, så den bio AI'en har skrevet ikke bliver overskrevet
      await update(ref(rtdb, 'users/' + uid), {
        firstName,
        age,
        koen,
        rolle,
        image,
      });
      if (fraMenu) {
        navigation.goBack();
      } else {
        navigation.navigate('Onboarding');
      }
    } catch (error) {
      Alert.alert('Fejl', error.message);
    }
  };

  // Logger brugeren ud. App.js opdager det via onAuthStateChanged og viser Login (mønster fra 06)
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert('Fejl', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={GlobalStyle.scrollContainer}>
      <ProfilePictureComponent size={150} imageUri={profileImage} onPress={chooseSource} />

      <TextInputComponent label="Fornavn" hint="Fornavn" value={firstName} onChangeText={setFirstName} />
      <TextInputComponent label="Alder" hint="Alder" keyboardType="numeric" value={age} onChangeText={setAge} />

      {/* Køn og rolle - genbruger QuestionComponent, så chips ser ens ud i hele appen */}
      <QuestionComponent question="Hvad er dit køn?" options={['Kvinde', 'Mand', 'Andet']} selected={koen} onSelect={setKoen} />
      <QuestionComponent question="Er du lejer eller udlejer?" options={['Lejer', 'Udlejer']} selected={rolle} onSelect={setRolle} />

      {/* Gemmer profilen. Første gang går den videre til onboarding, fra menuen går den tilbage */}
      <ButtonComponent title={fraMenu ? 'Gem' : 'Gem og fortsæt'} type="primary" width="100%" onPress={saveProfile} />

      {/* Log ud vises kun under oprettelsen - ellers ligger den i Profil-menuen */}
      {!fraMenu && <ButtonComponent title="Log ud" type="secondary" width="100%" onPress={handleLogout} />}

      <StatusBar style="auto" />
    </ScrollView>
  );
}