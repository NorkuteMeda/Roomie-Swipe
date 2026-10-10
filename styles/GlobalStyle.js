import { StyleSheet } from "react-native";

export const GlobalStyle = StyleSheet.create({ // al styling et sted 
//Container - vores ydre indpakning AKA basis container for alle skærme 
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },

//LoginScreen styling 
    login: { fontSize: 28, fontWeight: 'bold', marginBottom: 40 },
    linkText: { color: 'gray', marginTop: 15 },

//ProfileSetupScreen styling 
    profilesetup: { alignSelf: 'flex-start', marginBottom: 4 },
    chipRow: { flexDirection: 'row', flexWrap: 'wrap', width: '100%', marginBottom: 12 },
    chip: { borderWidth: 1, borderRadius: 20, paddingVertical: 6, paddingHorizontal: 14, margin: 4 },
    chipSelected: { borderColor: '#D85A30' },
    chipDefault: { borderColor: 'gray' },

 //SwipeScreen
    card: { width: '90%', height: '70%', borderWidth: 1, borderColor: 'lightgray', borderRadius: 16, padding: 16, justifyContent: 'space-between', alignItems: 'center' },
    actionsRow: { flexDirection: 'row', marginTop: 20 },
    actionButton: { width: 55, height: 55, borderRadius: 30, borderWidth: 1, borderColor: 'gray', alignItems: 'center', justifyContent: 'center', marginRight: 30 },

//MatchesScreen en linje pr. match i listen (billede + navn) 
    liste: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'lightgray', width: '100%' },

//MapScreen kortet fylder hele skærmen (ingen padding som i container)
    mapContainer: { flex: 1 },
    map: { flex: 1, width: '100%' },

//ButtonComponent
    button_1: {
        pressedColor: '#993C1D', // pres knap fare 
        defaultColor: '#D85A30', // default farve 
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    button_1_Text: { color: '#fff', fontWeight: 'bold' },

    button2: { // opret profil knap 
        pressedColor: '#f0f0f0', // pres knap farve 
        defaultColor: '#fff', // default farve 
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        marginTop: 8,
    },
    button2: { color: '#333', fontWeight: 'bold' },

//TextInputComponent
    inpLabel: { alignSelf: 'flex-start', marginBottom: 4 },
    textInput: { height: 40, width: '100%', borderColor: 'gray', borderWidth: 1, borderRadius: 8, paddingLeft: 10, marginBottom: 12 },

//PictureComponent
    picture: { borderWidth: 1, borderColor: 'lightgray' },
    placeholderPicture: { borderWidth: 1, borderColor: 'gray', borderStyle: 'dashed', backgroundColor: '#fff' }, //stiplede kant, skal skiftes ud med rigtige billeder 


      // --- CameraScreen ---
  cameraContainer: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1, width: '100%' },
  cameraCenter: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  cameraPermissionText: { marginBottom: 16, textAlign: 'center' },
  cameraButtonRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 40,
  },
  cameraFlipBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 28,
    padding: 12,
  },
  cameraSnapBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraSnapText: { color: 'white', fontSize: 20 },
  cameraSpacer: { width: 56 },

  //Styling til yderste lag i TextInputComponent.js
  inputWrapper: { width: '100%' },

  //SwipeScreen.js
  swipeName: { fontSize: 18, fontWeight: 'bold' },
  swipeArea: { color: 'gray', marginBottom: 8 },
  actionIcon: { fontSize: 20 },
  actionButtonLast: { marginRight: 0 },

  //Til profilbillede i ProfilPictureComponent.js
  profilePictureImage: { width: '100%', height: '100%' },
  profilePicturePlaceholder: { color: 'gray', textAlign: 'center' },
});

// Profilbillede-cirklen afhænger af size, så den er en funktion i stedet for en fast style
export const profilePictureCircle = (size) => ({
  width: size,
  height: size,
  borderRadius: size / 2,
  overflow: 'hidden',
  backgroundColor: '#e5e5e5',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  marginBottom: 16,
});