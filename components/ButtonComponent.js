import { Pressable, Text } from 'react-native';
import { GlobalStyle } from '../styles/GlobalStyle';

// ButtonComponent er en genbrugelig knap (mønster fra 02_navigation og 04_Styling).
// Skærmen sender title, type, onPress og evt. width ind (props), og knappen bestemmer selv udseendet.
export default function ButtonComponent({ title, onPress, type, width = 200 }) {
  // title = teksten på knappen
  // onPress = hvad der skal ske, når man trykker (bestemmes af skærmen, fx navigation.navigate)
  // type = "primary" (lilla knap) eller "secondary" (hvid knap)
  // width = bredden, fx "100%" på formularer. Uden width bliver knappen 200 bred.
  const style = type === 'primary' ? GlobalStyle.button_1 : GlobalStyle.button2;

  return (
    <Pressable
      // Pressable ved, om den bliver trykket ned lige nu (pressed), så farven kan skifte imens
      style={({ pressed }) => [
        style,
        { backgroundColor: pressed ? style.pressedColor : style.defaultColor, width: width },
      ]}
      onPress={onPress}
    >
      {/* Teksten i knappen, med tekststil der passer til typen */}
      <Text style={type === 'primary' ? GlobalStyle.button_1_Text : GlobalStyle.button2_Text}>{title}</Text>
    </Pressable>
  );
}