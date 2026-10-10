import { View, Image, Text, TouchableOpacity } from 'react-native';
import { GlobalStyle, profilePictureCircle } from '../styles/GlobalStyle';

// Rund profilbillede-komponent. Viser billedet, hvis der er et, ellers en tekst.
export default function ProfilePictureComponent({ size = 150, imageUri, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={profilePictureCircle(size)}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={GlobalStyle.profilePictureImage} />
        ) : (
          <Text style={GlobalStyle.profilePicturePlaceholder}>Tilføj{'\n'}billede</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}