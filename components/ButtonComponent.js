// Hvad filen gør: ButtonComponent er egentlig bare en skabelon vi har lavet.
// Det er en skabelon til alle de knapper vi bruger rundt omkring i appen
// Når vi skal bruge en knap kan vi bare kalde ButtonComponent og vil få den samme slags knap (alt efter typen)

// Vi importerer Pressable fra React Native, samt GlobalStyle for at kunne bruge dem senere
import { Pressable, Text } from 'react-native';
import { GlobalStyle } from '../styles/GlobalStyle';

// Her laver vi vores genbrugelige knap, og sender den med, hvis nogle kalder den
// Når en ny knap bliver lavet, så kalder man bare "ButtonComponent" sammen med følgende:
// Den title (tekst) man gerne vil have på knappen
// "onPress" hvad der skal ske når en bruger trykker på knappen
// type, som vi forklarer længere nede
// width (valgfri), fx "100%" på formularer. Uden width bliver knappen 200 bred
export default function ButtonComponent({ title, onPress, type, width = 200 }) {
  // Vi opretter 2 variable, som bruges i if/else sætningen nedenunder
  let buttonStyle;
  let textStyle;

  // Her har vi lavet en if/else statement, som giver os mulighed for at lave 2 forskellige knapper, alt efter den type ButtonComponent bliver kaldt med
  // Her står der altså: Hvis typen er "primary", så brug GlobalStyle.button_1 (en lilla knap)
  // Og hvis den ikke er, så brug GlobalStyle.button2 (en hvid knap)
  if (type === 'primary') {
    buttonStyle = GlobalStyle.button_1;
    textStyle = GlobalStyle.button_1_Text;
  } else {
    buttonStyle = GlobalStyle.button2;
    textStyle = GlobalStyle.button2_Text;
  }

  // Efter if/else statementen returnerer vi knappen med den rigtige "knap-style" og "tekst-style"
  //- sammen med den tekst brugeren gerne vil have på knappen
  //- og det de gerne vil have til at ske når man trykker på den
  return (
    // Pressable er en React Native komponent, man kan trykke på. Den ved om den bliver trykket ned lige nu (pressed),
    // så baggrundsfarven kan skifte imens (mønster fra 04_Styling)
    <Pressable
      style={({ pressed }) => [
        buttonStyle,
        { backgroundColor: pressed ? buttonStyle.pressedColor : buttonStyle.defaultColor, width: width },
      ]}
      onPress={onPress}
    >
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
}
