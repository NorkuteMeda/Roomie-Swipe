import { useState, useRef } from 'react';
import { Button, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CameraScreen({ navigation }) {
  const [facing, setFacing] = useState('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);

  // Tilladelsen hentes stadig
  if (!permission) return <View />;

  // Brugeren har ikke givet tilladelse endnu
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>Vi har brug for adgang til dit kamera</Text>
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
      const result = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      // Sender billedet tilbage til ProfileSetup og lukker kameraet
      navigation.navigate('ProfileSetup', { photoUri: result.uri });
    } catch (err) {
      console.log('Snap error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btn} onPress={toggleFacing}>
            <Ionicons name="camera-reverse-outline" size={32} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.snapBtn} onPress={snap}>
            <Text style={styles.snapText}>{loading ? '...' : ''}</Text>
          </TouchableOpacity>

          {/* Tom plads, så knapperne er centreret */}
          <View style={{ width: 56 }} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1, width: '100%', justifyContent: 'flex-end' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  permissionText: { marginBottom: 16, textAlign: 'center' },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 24,
  },
  btn: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 28,
    padding: 12,
  },
  snapBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  snapText: { color: 'white', fontSize: 20 },
});