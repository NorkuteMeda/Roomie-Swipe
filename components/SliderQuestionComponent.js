import { Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { GlobalStyle, Farver } from '../styles/GlobalStyle';

// Laver 6500 om til "6.500", så store tal er lette at læse
const formatNumber = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// Ét spørgsmål med en slider, fx husleje eller lejeperiode.
// Den valgte værdi vises over slideren, så brugeren kan se præcis hvad de har valgt.
export default function SliderQuestionComponent({ question, value, onChange, min, max, step, unit, maxLabel }) {
  // Ved max vises maxLabel, hvis spørgsmålet har en (fx "24+ mdr. (langvarigt)")
  const label = value === max && maxLabel ? maxLabel : formatNumber(value) + ' ' + unit;

  return (
    <View style={GlobalStyle.questionBlock}>
      <Text style={GlobalStyle.questionText}>{question}</Text>
      <Text style={GlobalStyle.sliderValue}>{label}</Text>

      <Slider
        style={GlobalStyle.slider}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor={Farver.primær}
        maximumTrackTintColor="#ccc"
        thumbTintColor={Farver.primær}
      />
    </View>
  );
}