import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ref, onValue } from 'firebase/database';
import { signOut } from 'firebase/auth';

import ProfilePictureComponent from '../components/ProfilePictureComponent';
import ButtonComponent from '../components/ButtonComponent';
import { GlobalStyle } from '../styles/GlobalStyle';
import { auth, rtdb } from '../database/firebase';

// Punkterne i menuen. fraMenu: true fortæller skærmen, at den skal gå tilbage hertil efter "Gem",
// i stedet for at fortsætte i oprettelses-flowet.
const MENU = [
  { title: 'Rediger profil', icon: 'person-outline', screen: 'ProfileSetup', params: { fraMenu: true } },
  { title: 'Rediger mine svar', icon: 'list-outline', screen: 'Onboarding', params: { fraMenu: true } },
  { title: 'Min bio', icon: 'create-outline', screen: 'Bio' },
];

// Profil-fanen: viser hvem man er og samler alt, man kan ændre ved sin profil
export default function ProfileMenuScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [rolle, setRolle] = useState('');
  const [image, setImage] = useState(null);

  // Lytter på brugeren, så navn og billede opdateres med det samme efter ændringer 
  useEffect(() => {
    const unsubscribe = onValue(ref(rtdb, 'users/' + auth.currentUser.uid), (snap) => {
      const data = snap.val() || {};
      setFirstName(data.firstName || '');
      setRolle(data.rolle || '');
      setImage(data.image || null);
    });
    return unsubscribe;
  }, []);

  // Logger brugeren ud. App.js opdager det via onAuthStateChanged og viser Login (
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert('Fejl', error.message);
    }
  };

  return (
    <View style={GlobalStyle.menuContainer}>
      <ProfilePictureComponent size={100} imageUri={image} onPress={() => navigation.navigate('ProfileSetup', { fraMenu: true })} />
      <Text style={GlobalStyle.menuName}>{firstName}</Text>
      <Text style={GlobalStyle.menuRole}>{rolle}</Text>

      {/* Ét menupunkt pr. element i MENU */}
      {MENU.map((item) => (
        <TouchableOpacity key={item.title} style={GlobalStyle.menuItem} onPress={() => navigation.navigate(item.screen, item.params)}>
          <View style={GlobalStyle.menuItemLeft}>
            <Ionicons name={item.icon} size={22} color="#333" />
            <Text style={GlobalStyle.menuItemText}>{item.title}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </TouchableOpacity>
      ))}

      <ButtonComponent title="Log ud" type="secondary" width="100%" onPress={handleLogout} />

      <StatusBar style="auto" />
    </View>
  );
}