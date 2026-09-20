import { View, Text } from 'react-native';
import { GlobalStyle } from '../styles/GlobalStyle';
//picturecomponent viser altid komponenten da vi ikke burger rigtige billeder 
export default function PictureComponent({ size }) {
  return (
    <View style={[{ width: size, height: size, borderRadius: size / 2, alignItems: 'center', justifyContent: 'center' }, GlobalStyle.placeholderPicture]}> 
    {/* stiplet kant + baggrundsfarve fra GlobalStyle */}
      <Text style={{ color: 'gray', fontSize: size / 5 }}>foto</Text>
    </View>
  );
}