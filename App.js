import 'react-native-gesture-handler'; // officel standart. hjælper mod crashe  og navigation i PROD
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';

// hent mine skærme
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import SwipeScreen from './screens/SwipeScreen';
import MatchesScreen from './screens/MatchesScreen';
import CameraScreen from './screens/CameraScreen';
import MapScreen from './screens/MapScreen';
import OnboardingScreen from './screens/OnboardingScreen';

// Importerer auth og database fra firebase-filen
import { auth, rtdb } from './database/firebase';
import { GlobalStyle } from './styles/GlobalStyle';

// Stack.Navigator holder styr på hvilken skærm brugeren er på og navigations-historikken.
// Hvilke skærme der findes afhænger af, om brugeren er logget ind (se user nedenfor).
const Stack = createStackNavigator();

export default function App() {
  // user er null, når ingen er logget ind
  const [user, setUser] = useState(null);
  // profileDone: null = vi tjekker stadig, true = onboarding er udfyldt, false = ny bruger
  const [profileDone, setProfileDone] = useState(null);

  // Lytter på login-status. Kører hver gang nogen logger ind eller ud.
  // Ved login tjekkes om brugeren har udfyldt onboarding, så nye brugere starter på profilen.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setProfileDone(null);

      if (currentUser) {
        try {
          const snapshot = await get(ref(rtdb, 'users/' + currentUser.uid + '/onboarding'));
          setProfileDone(snapshot.exists());
        } catch (e) {
          // Kan vi ikke tjekke, sender vi brugeren til profilen for en sikkerheds skyld
          setProfileDone(false);
        }
      }
    });
    return unsubscribe;
  }, []);

  // Vis en loading-cirkel, mens vi tjekker profilen (mønster fra 05_firebase)
  if (user && profileDone === null) {
    return (
      <View style={GlobalStyle.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* initialRouteName bestemmer startskærmen: ny bruger -> profil, eksisterende -> swipe */}
      <Stack.Navigator initialRouteName={user ? (profileDone ? 'Swipe' : 'ProfileSetup') : 'Login'}>
        {user ? (
          <>
            <Stack.Screen name="Swipe" component={SwipeScreen} options={{ title: 'Find en roomie' }} />
            <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} options={{ title: 'Min profil' }} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ title: 'Om dig som roomie' }} />
            <Stack.Screen name="Matches" component={MatchesScreen} options={{ title: 'Dine matches' }} />
            <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Tag billede' }} />
            <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Kort' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}