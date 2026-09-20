import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import PictureComponent from '../components/PictureComponent';
import { PROFILES } from '../data/const';
import { GlobalStyle } from '../styles/GlobalStyle';

export default function SwipeScreen({ navigation }) {

  // index holder styr på hvilken profil i PROFILES-arrayet vi kigger på lige nu, starter ved 0
  const [index, setIndex] = useState(0);
  const current = PROFILES[index];

  // Rykker til næste profil i arrayet. Hvis vi er nået til den sidste profil, 
  // navigerer vi i stedet videre til Matches-skærmen
  const nextProfile = () => {
    if (index < PROFILES.length - 1) {
      setIndex(index + 1);
    } else {
      navigation.navigate('Matches');
    }
  }

  return (
    <View style={GlobalStyle.container}>
      {/* Selve profil-kortet med billede og info om den aktuelle profil */}
      <View style={GlobalStyle.card}>
        <PictureComponent size={180} />

        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{current.FullName}, {current.Age}</Text>
        <Text style={{ color: 'gray', marginBottom: 8 }}>{current.Area} - {current.Furnished ? 'møbleret' : 'umøbleret'}</Text>
        <Text>{current.Bio}</Text>
      </View>

      {/* X og hjerte-knapperne - begge gør reelt det samme lige nu (går videre til næste profil), 
          der skal tilføjes rigtig matching logik senere */}
      <View style={GlobalStyle.actionsRow}>
        <TouchableOpacity style={GlobalStyle.actionButton} onPress={nextProfile}>
          <Text style={{ fontSize: 20 }}>X</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[GlobalStyle.actionButton, { marginRight: 0 }]} onPress={nextProfile}>
          <Text style={{ fontSize:20}}>♥</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}