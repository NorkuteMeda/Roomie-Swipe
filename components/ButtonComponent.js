// Hvad filen gør: ButtonComponent er egentlig bare en skabelon vi har lavet.
// Det er en skabelon til alle de knapper vi bruger rundt omkring i appen
// Når vi skal bruge en knap kan vi bare kalde ButtonComponent og vil få den samme slags knap (alt efter typen)

// Vi importere TouchableOpacity fra React Native, samt GlobalStyle for at kunne bruge dem senere
import { TouchableOpacity, Text } from 'react-native';
import { GlobalStyle } from '../styles/GlobalStyle';

// Her laver vi vores genbrugelig knap, og sender den med, hvis nogle kalder den
// Når en ny knap bliver lavet, så kalder man bare "ButtonComponent" sammen med følgende:
// Den title (tekst) man gerne vil have på knappen
// "onPress" hvad der skal se når en bruger trykker på knappen
// Samt type, som vi forklarer længere nede
export default function ButtonComponent({ title, onPress, type }) {
  // Vi opretter 2 variable, som bruges i if/else sætningen nedenunder
  let buttonStyle;
  let textStyle;

  // Her har vi lavet en if/else statment, som giver os mulighed for at lave 2 forskellige knapper, alt efter den type ButtonComponent bliver kaldt med
  // Her står der altså: Hvis typen er "primary", så brug GlobalStyle.button_1 (En orange knap)
  // Og hvis den ikke er, så brug GlobalStyle.button2 (En hvid knap)
  if (type === 'primary') {
    buttonStyle = GlobalStyle.button_1;
    textStyle = GlobalStyle.button_1_Text;
  } else {
    buttonStyle = GlobalStyle.button2;
    textStyle = GlobalStyle.button2_Text;
  }

  // Efter if/else statmenten, så returnere vi vores to variable, som indeholder en bestemt "knap-style" og "tekst-style"
  //- sammen med den tekst brugeren gerne vil have på knappen
  //- og det de gerne vil have til at ske når man trykker på den
  return (
    //I returen bruger vi "TouchableOpacity", det er bare en React Native komponent, som gør det muligt at lave noget som kan trykkes på
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}