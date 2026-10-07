import 'react-native-gesture-handler'; // officel standart. hjælper mod crashe  og navigation i PROD
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';

// hent mine skærme
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import SwipeScreen from './screens/SwipeScreen';
import MatchesScreen from './screens/MatchesScreen';
import CameraScreen from './screens/CameraScreen';

// Importerer auth fra firebase-filen (erstatter den gamle import "./database/firebase")
import { auth } from './database/firebase';

// Stack.Navigator holder styr på hvilken skærm brugeren er på og navigations-historikken.
// Hvilke skærme der findes afhænger af, om brugeren er logget ind (se user nedenfor).
// Den første skærm i hver gruppe vises først.
const Stack = createStackNavigator();

export default function App() {
  // user er null, når ingen er logget ind
  const [user, setUser] = useState(null);

  // Lytter på login-status. Kører hver gang nogen logger ind eller ud.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Swipe" component={SwipeScreen} options={{ title: 'Find en roomie' }} />
            <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} options={{ title: 'Opret profil' }} />
            <Stack.Screen name="Matches" component={MatchesScreen} options={{ title: 'Dine matches' }} />
            <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Tag billede' }} />
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

