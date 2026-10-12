import 'react-native-gesture-handler'; // officel standart. hjælper mod crashe  og navigation i PROD
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
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
import AiBioScreen from './screens/AiBioScreen';
import ProfileMenuScreen from './screens/ProfileMenuScreen';
import BioScreen from './screens/BioScreen';

// Importerer auth og database fra firebase-filen
import { auth, rtdb } from './database/firebase';
import { GlobalStyle, Farver } from './styles/GlobalStyle';

// Stack.Navigator holder styr på skærme, man går ind og ud af (profil, onboarding, kamera osv.).
// Tab.Navigator er menuen i bunden af appen (mønster fra 02_navigation og 04_Styling).
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Menuen i bunden: Find roomie, Matches og Profil.
// Ligger uden for App, så den ikke bliver lavet forfra hver gang App tegnes igen.
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Farver.primær,
        tabBarInactiveTintColor: 'gray',
        // Fyldt ikon når fanen er valgt, omrids når den ikke er (som i 04_Styling)
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Swipe') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Matches') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Swipe" component={SwipeScreen} options={{ title: 'Find roomie' }} />
      <Tab.Screen name="Matches" component={MatchesScreen} options={{ title: 'Matches' }} />
      <Tab.Screen name="Profil" component={ProfileMenuScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
}

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
      {/* initialRouteName bestemmer startskærmen: ny bruger -> profil, eksisterende -> menuen med Find roomie */}
      <Stack.Navigator initialRouteName={user ? (profileDone ? 'Main' : 'ProfileSetup') : 'Login'}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} options={{ title: 'Min profil' }} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ title: 'Om dig som roomie' }} />
            <Stack.Screen name="AiBio" component={AiBioScreen} options={{ title: 'Skriv bio med AI' }} />
            <Stack.Screen name="Bio" component={BioScreen} options={{ title: 'Min bio' }} />
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