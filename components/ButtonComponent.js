import { TouchableOpacity, Text } from 'react-native';
import { GlobalStyle } from '../styles/GlobalStyle';

// ButtonComponent er en genbrugelig knap.
// Skærmen sender title, type og onPress ind (props), og knappen bestemmer selv udseendet.
export default function ButtonComponent({ title, onPress, type }) {
  // title = teksten på knappen
  // onPress = hvad der skal ske, når man trykker (bestemmes af skærmen, fx navigation.navigate)
  // type = "primary" (orange knap) eller "secondary" (hvid knap)

  return (
    <TouchableOpacity
      // Vælger udseende ud fra type
      style={type === 'primary' ? GlobalStyle.button_1 : GlobalStyle.button2}
      onPress={onPress}
    >
      {/* Teksten i knappen, med tekststil der passer til typen */}
      <Text style={type === 'primary' ? GlobalStyle.button_1_Text : GlobalStyle.button2_Text}>{title}</Text>
    </TouchableOpacity>
  );
}