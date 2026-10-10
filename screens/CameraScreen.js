import { useState, useRef } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Ionicons from '@expo/vector-icons/Ionicons';

import { GlobalStyle } from '../styles/GlobalStyle';

export default function CameraScreen({ navigation }) {
  const [facing, setFacing] = useState('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={GlobalStyle.cameraCenter}>
        <Text style={GlobalStyle.cameraPermissionText}>Vi har brug for adgang til dit kamera</Text>
        <Button onPress={requestPermission} title="Giv tilladelse" />
      </View>
    );
  }

  const toggleFacing = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  const snap = async () => {
    if (!cameraRef.current || loading) return;
    try {
      setLoading(true);
      const result = await cameraRef.current.takePictureAsync({ quality: 0.2 });
      navigation.navigate('ProfileSetup', { photoUri: result.uri });
    } catch (err) {
      console.log('Snap error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={GlobalStyle.cameraContainer}>
      <CameraView ref={cameraRef} style={GlobalStyle.camera} facing={facing} />

      <View style={GlobalStyle.cameraButtonRow}>
        <TouchableOpacity style={GlobalStyle.cameraFlipBtn} onPress={toggleFacing}>
          <Ionicons name="camera-reverse-outline" size={32} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={GlobalStyle.cameraSnapBtn} onPress={snap}>
          <Text style={GlobalStyle.cameraSnapText}>{loading ? '...' : ''}</Text>
        </TouchableOpacity>

        <View style={GlobalStyle.cameraSpacer} />
      </View>
    </View>
  );
}