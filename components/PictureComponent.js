import { View, Text } from 'react-native';
import { pictureCircle, pictureText } from '../styles/GlobalStyle';

// PictureComponent viser altid en placeholder-cirkel med teksten "foto", da vi ikke bruger rigtige billeder her.
// size = diameteren på cirklen (sendes ind fra skærmen)
export default function PictureComponent({ size }) {
  return (
    // pictureCircle(size) giver størrelse, form, stiplet kant og baggrundsfarve
    <View style={pictureCircle(size)}>
      <Text style={pictureText(size)}>foto</Text>
    </View>
  );
}
