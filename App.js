import 'react-native-gesture-handler'; // officel standart. hjælper mod crashe  og navigation i PROD
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// hent mine skærme (Ole er sej)
import LoginScreen from './screens/LoginScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import SwipeScreen from './screens/SwipeScreen';
import MatchesScreen from './screens/MatchesScreen';

// Stack.Navigator holder styr på hvilken skærm brugeren er på og navigations-historikken.
// initialRouteName="Login" betyder appen altid starter på login-skærmen.
// Man kan navigere fremad med navigation.navigate(), og tilbage enten med en tilbage-pil 
// (automatisk fra React Navigation) eller ved at swipe fra venstre kant på iOS.
const Stack =  createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"> 
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />  

        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} options={{ title: 'Opret profil' }} />
        <Stack.Screen name="Swipe" component={SwipeScreen} options={{ title: 'Find en roomie' }} />
        <Stack.Screen name="Matches" component={MatchesScreen} options={{ title: 'Dine matches' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}