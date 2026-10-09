import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import MapView from 'react-native-maps';

import { GlobalStyle } from '../styles/GlobalStyle';

// Kortet starter centreret over København.
// latitudeDelta/longitudeDelta bestemmer hvor meget man er zoomet ind (mindre tal = tættere på)
const COPENHAGEN = {
  latitude: 55.6761,
  longitude: 12.5683,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

// Viser et kort der fylder hele skærmen. Senere skal det vise hvor værelset ligger
export default function MapScreen() {
  return (
    <View style={GlobalStyle.mapContainer}>
      <MapView style={GlobalStyle.map} initialRegion={COPENHAGEN} />

      <StatusBar style="auto" />
    </View>
  );
}
