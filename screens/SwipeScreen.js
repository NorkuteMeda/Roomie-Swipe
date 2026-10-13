import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';


import PictureComponent from '../components/PictureComponent';

import ButtonComponent from '../components/ButtonComponent';
import { signOut } from 'firebase/auth';
import { auth } from '../database/firebase';

import { Profiler } from '../data/profiler';
import { GlobalStyle } from '../styles/GlobalStyle';



export default function SwipeScreen({ navigation }) {

  // index holder styr på hvilken profil i PROFILES-arrayet vi kigger på lige nu, starter ved 0
  const [index, setIndex] = useState(0);
  const current = Profiler[index];

  // Rykker til næste profil i arrayet. Hvis vi er nået til den sidste profil, 
  // navigerer vi i stedet videre til Matches-skærmen
  const nextProfile = () => {
    if (index < Profiler.length - 1) {
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

        <Text style={GlobalStyle.swipeName}>{current.FullName}, {current.Age}</Text>
        <Text style={GlobalStyle.swipeArea}>{current.Area} - {current.Furnished ? 'møbleret' : 'umøbleret'}</Text>
        <Text>{current.Bio}</Text>

        {/* Åbner kortet med en markør i centrum af profilens bydel (vi har ikke præcise adresser endnu) */}
        <ButtonComponent title="Se på kort" type="secondary" onPress={() => navigation.navigate('Map', { area: current.Area })} />
      </View>

      {/* X og hjerte-knapperne - begge gør reelt det samme lige nu (går videre til næste profil), 
          der skal tilføjes rigtig matching logik senere */}
      <View style={GlobalStyle.actionsRow}>
        <TouchableOpacity style={GlobalStyle.actionButton} onPress={nextProfile}>
          <Text style={GlobalStyle.actionIcon}>X</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[GlobalStyle.actionButton, GlobalStyle.actionButtonLast]} onPress={nextProfile}>
          <Text style={GlobalStyle.actionIcon}>♥</Text>
        </TouchableOpacity>
      </View>

      {/* NYT: knapper til profil og logud */}
      <ButtonComponent title="Min profil" type="secondary" onPress={() => navigation.navigate('ProfileSetup')} />
      

      <StatusBar style="auto" />
    </View>
  );
}