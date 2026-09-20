import { Text, View, TextInput } from 'react-native';
import { GlobalStyle } from '../styles/GlobalStyle';

// Genbrugelig komponent til et tekstfelt med en label ovenover
export default function TextInputComponent({ label, hint, secureTextEntry, keyboardType, multiline }) {
  return (
    <View style={{ width: '100%' }}>
      <Text style={GlobalStyle.inpLabel}>{label}</Text>
      <TextInput
        style={GlobalStyle.textInput}
        placeholder={hint}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </View>
  );
}