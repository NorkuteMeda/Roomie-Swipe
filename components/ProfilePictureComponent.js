import { View, Image, Text, TouchableOpacity } from 'react-native';

// Rund profilbillede-komponent. Viser billedet, hvis der er et, ellers en tekst.
export default function ProfilePictureComponent({ size = 150, imageUri, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          overflow: 'hidden',
          backgroundColor: '#e5e5e5',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginBottom: 16,
        }}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} />
        ) : (
          <Text style={{ color: 'gray', textAlign: 'center' }}>Tilføj{'\n'}billede</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}