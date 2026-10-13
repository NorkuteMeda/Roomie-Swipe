import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { OMRAADE_KOORDINATER } from '../data/const';
import { GlobalStyle } from '../styles/GlobalStyle';

// Kortet starter centreret over København, hvis vi ikke kender bydelen.
// latitudeDelta/longitudeDelta bestemmer hvor meget man er zoomet ind (mindre tal = tættere på)
const COPENHAGEN = {
  latitude: 55.6761,
  longitude: 12.5683,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

// Viser et kort der fylder hele skærmen, med en markør i centrum af profilens bydel.
// area sendes med fra SwipeScreen, fx navigation.navigate('Map', { area: 'Vesterbro' })
export default function MapScreen({ route }) {
  const area = route.params?.area;
  const koordinater = OMRAADE_KOORDINATER[area];

  // Kender vi bydelen, zoomer vi ind på den. Ellers vises hele København uden markør
  const startRegion = koordinater
    ? { ...koordinater, latitudeDelta: 0.04, longitudeDelta: 0.04 }
    : COPENHAGEN;

  return (
    <View style={GlobalStyle.mapContainer}>
      <MapView style={GlobalStyle.map} initialRegion={startRegion}>
        {koordinater && (
          <Marker coordinate={koordinater} title={area} description="Omtrentlig placering" />
        )}
      </MapView>

      <StatusBar style="auto" />
    </View>
  );
}
