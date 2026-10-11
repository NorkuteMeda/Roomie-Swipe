import { Text, View, TouchableOpacity } from 'react-native';
import { GlobalStyle } from '../styles/GlobalStyle';

// Ét onboarding-spørgsmål med svarmulighederne som chips (samme look som interesser i ProfileSetupScreen).
// Bruges til både valg-spørgsmål og skala-spørgsmål, det er kun options der er forskellige.
export default function QuestionComponent({ question, options, selected, onSelect, low, high, multi }) {
      // Tjekker om en chip skal vises som valgt. Ved multi er selected et array med flere svar.
  const isSelected = (option) => (multi ? (selected || []).includes(option) : selected === option);
  return (
    <View style={GlobalStyle.questionBlock}>
      <Text style={GlobalStyle.questionText}>{question}</Text>

      <View style={GlobalStyle.chipRow}>
        {options.map((option) => (
          <TouchableOpacity
            key={String(option)}
            onPress={() => onSelect(option)}
                        style={[GlobalStyle.chip, isSelected(option) ? GlobalStyle.chipSelected : GlobalStyle.chipDefault]}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Forklarer hvad 1 og 5 betyder - vises kun ved skala-spørgsmål, fordi kun de har low */}
      {low && (
        <View style={GlobalStyle.scaleLabels}>
          <Text style={GlobalStyle.scaleLabelText}>1 = {low}</Text>
          <Text style={GlobalStyle.scaleLabelText}>5 = {high}</Text>
        </View>
      )}
    </View>
  );
}