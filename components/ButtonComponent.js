import { Pressable, Text } from 'react-native';
import { GlobalStyle } from '../styles/GlobalStyle';

// ButtonComponent er en genbrugelig knap. 
// Man sender info ind til den (props), og den bestemmer selv hvordan den skal se ud og opføre sig.
export default function ButtonComponent({ title, onPress, type, width = 200 }) {
  // title = teksten på knappen
  // onPress = hvad der skal ske, når man trykker (sendes ind udefra, fx navigation.navigate)
  // type = "primary" eller "secondary" bestemmer om det er den orange eller hvide knap
  

  return (
    <Pressable
      // Pressable den "ved" om den bliver trykket ned lige nu (pressed)
      style={({ pressed }) => [
        // 1.udseende (padding, kant, runde hjørner) ud fra type
        type === 'primary' ? GlobalStyle.button_1 : GlobalStyle.button2,
        {
          // 2. Vælg baggrundsfarve: tjek BÅDE type og om den er trykket ned lige nu
          backgroundColor: type === 'primary'
            ? pressed ? GlobalStyle.button_1.pressedColor : GlobalStyle.button_1.defaultColor
            : pressed ? GlobalStyle.button2.pressedColor : GlobalStyle.button2.defaultColor,
          width: width,
        },
      ]}
      onPress={onPress} // køres når brugeren spiller ikke er på knappen mere 
    >
      {/* Selve teksten inde i knappen, styling afhænger også af type */}
      <Text style={type === 'primary' ? GlobalStyle.button_1_Text : GlobalStyle.button2}>{title}</Text>
    </Pressable>
  );
}