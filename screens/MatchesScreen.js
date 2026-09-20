import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList } from 'react-native';

import PictureComponent from '../components/PictureComponent';
import { PROFILES } from '../data/const';
import { GlobalStyle } from '../styles/GlobalStyle';

// Viser en liste over alle profiler som "matches" ved hjælp af FlatList
export default function MatchesScreen() {
  return (
    <View style={GlobalStyle.container}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Dine matches</Text>

      <FlatList
        style={{ width: '100%' }}
        data={PROFILES}              // arrayet der skal vises, ét kort pr. element
        keyExtractor={(item, index) => index.toString()} // unikt ID til hver linje som React bruger internt ( vi ved hvad bruger vi er nået til)
        renderItem={({ item }) => {  // kaldes én gang per profil i PROFILES
          return (
            <View style={GlobalStyle.liste}>
              <PictureComponent size={40} />
              <Text style={{ marginLeft: 12 }}>{item.FullName}, {item.Age}</Text>
            </View>
          );
        }}
      />

      <StatusBar style="auto" />
    </View>
  );
}