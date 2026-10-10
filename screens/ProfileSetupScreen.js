import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ref, set, get } from 'firebase/database';

import ProfilePictureComponent from '../components/ProfilePictureComponent';
import TextInputComponent from '../components/TextInputComponent';
import ButtonComponent from '../components/ButtonComponent';

import { GlobalStyle } from '../styles/GlobalStyle';
import { auth, rtdb } from '../database/firebase';

// interesser brugeren kan vælge mellem, hardcodet for nu
const INTERESTS = ['Sport', 'Gaming', 'Madlavning', 'Musik', 'Rejser'];

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

  // Tekstfelter
  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');

  // furnished holder styr på om "Ja" eller "Nej" er valgt (kun én værdi ad gangen, som en radio-knap)
  const [furnished, setFurnished] = useState(null);

  // selectedInterests er et array, da man kan vælge FLERE interesser samtidig
  const [selectedInterests, setSelectedInterests] = useState([]);

  const [profileImage, setProfileImage] = useState(null);

  // Tilføjer eller fjerner en interesse fra det valgte array, afhængig af om den allerede er valgt
  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest)); // fjern
    } else {
      setSelectedInterests([...selectedInterests, interest]); // tilføj
    }
  };

  // Henter den gemte profil fra databasen, når skærmen åbnes
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const snapshot = await get(ref(rtdb, 'users/' + auth.currentUser.uid));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setFirstName(data.firstName || '');
          setAge(data.age || '');
          setBio(data.bio || '');
          setFurnished(data.furnished || null);
          setSelectedInterests(data.interests || []); // Firebase gemmer ikke tomme arrays
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

  // Gemmer profilen under users/<uid> og går videre til Swipe
  const saveProfile = async () => {
    try {
      const uid = auth.currentUser.uid;

      // Er billedet allerede tekst (hentet fra databasen), skal det ikke konverteres igen
      let image = null;
      if (profileImage) {
        image = profileImage.startsWith('data:') ? profileImage : await uriToBase64(profileImage);
      }

      await set(ref(rtdb, 'users/' + uid), {
        firstName,
        age,
        bio,
        furnished,
        interests: selectedInterests,
        image,
      });
      navigation.navigate('Swipe');
    } catch (error) {
      Alert.alert('Fejl', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={GlobalStyle.container}>
      <ProfilePictureComponent size={150} imageUri={profileImage} onPress={chooseSource} />

      <TextInputComponent label="Fornavn" hint="Fornavn" value={firstName} onChangeText={setFirstName} />
      <TextInputComponent label="Alder" hint="Alder" keyboardType="numeric" value={age} onChangeText={setAge} />
      <TextInputComponent label="Bio" hint="Skriv lidt om dig selv" multiline={true} value={bio} onChangeText={setBio} />

      {/* Interesse-chips - genererer en knap per element i INTERESTS med .map() */}
      <Text style={GlobalStyle.profilesetup}>Interesser</Text>
      <View style={GlobalStyle.chipRow}>
        {INTERESTS.map((interest, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleInterest(interest)}
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

      {/* Gemmer profilen og navigerer videre til Swipe-skærmen */}
      <ButtonComponent title="Gem og fortsæt" type="primary" width="100%" onPress={saveProfile} />

      <StatusBar style="auto" />
    </ScrollView>
  );
}