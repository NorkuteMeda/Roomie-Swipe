import { StyleSheet } from "react-native";

//**********Farver**********//
// Det her er farverne vi har besluttet os for at siden skal have
// Det er de samme farver som vores logo
// Disse er indtil nu ikke inkorporeret på hele siden, men vil gradvist blive det
export const Farver = {
  primær: '#6B3FA0',     // RoomieMatch-lilla
  primærLys: '#F1EAF9',  // lys lilla baggrund,
  primærMørk: '#4F2D78', // når en lilla knap trykkes ned
};
//**********Farver**********//

//Her opretter vi vores GlobalStyle, således at vi har alt vores styling samlet ét sted
export const GlobalStyle = StyleSheet.create({
    //Container
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
    chipSelected: { borderColor: Farver.primær, backgroundColor: Farver.primærLys },
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

    //***************ButtonComponent********************//
    //Her opretter vi de to forskellige typer knapper
    //- som bliver brugt i ButtonComponent
    //pressedColor/defaultColor læses af ButtonComponent, så knappen skifter farve, når den trykkes (mønster fra 04_Styling)
    //Bredden sættes i ButtonComponent (width-prop), så den kan være fx "100%" på formularer
    //Type 1: bliver brugt hvis knappen kaldes med typen "primary"
    button_1: {
        pressedColor: Farver.primærMørk, // farve når knappen trykkes
        defaultColor: Farver.primær,     // normal farve
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    //Type 1 tekst
    button_1_Text: { color: '#fff', fontWeight: 'bold' },

    //Type 2: bliver brugt hvis knappen kaldes med typen "secondary"
    button2: {
        pressedColor: '#f0f0f0', // farve når knappen trykkes
        defaultColor: '#fff',    // normal farve
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        marginTop: 8,
    },
    //Type 2 tekst
    button2_Text: { color: '#333', fontWeight: 'bold' },

    //***************ButtonComponent********************//


    //TextInputComponent
    inpLabel: { alignSelf: 'flex-start', marginBottom: 4 },
    textInput: { height: 40, width: '100%', borderColor: 'gray', borderWidth: 1, borderRadius: 8, paddingLeft: 10, marginBottom: 12 },


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

    //ScrollView-skærme (ProfileSetup, Onboarding) - flexGrow i stedet for flex: 1, ellers kan man ikke scrolle
    scrollContainer: { flexGrow: 1, backgroundColor: '#fff', alignItems: 'center', padding: 20 },
    onboardingIntro: { fontSize: 16, marginBottom: 20, textAlign: 'center' },

  //QuestionComponent
  questionBlock: { width: '100%', marginBottom: 8 },
  questionText: { fontWeight: '600', marginBottom: 6 },
  scaleLabels: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: -6, marginBottom: 8 },
  scaleLabelText: { color: 'gray', fontSize: 12 },
  
  //AiBioScreen -> chat med AI-profilhjælperen
  chatContainer: { flex: 1, backgroundColor: '#fff', padding: 16 },
  chatIntro: { color: 'gray', marginBottom: 8, textAlign: 'center' },
  chatList: { paddingVertical: 8 },
  bubbleAi: { alignSelf: 'flex-start', backgroundColor: Farver.primærLys, borderRadius: 16, padding: 12, marginBottom: 8, maxWidth: '85%' },
  bubbleAiText: { color: '#333' },
  bubbleUser: { alignSelf: 'flex-end', backgroundColor: Farver.primær, borderRadius: 16, padding: 12, marginBottom: 8, maxWidth: '85%' },
  bubbleUserText: { color: '#fff' },
  chatLoading: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  chatLoadingText: { color: 'gray', marginLeft: 8 },
  chatInputRow: { flexDirection: 'row', alignItems: 'center' },
  chatInput: { flex: 1, borderWidth: 1, borderColor: 'gray', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, marginRight: 8, marginTop: 8, maxHeight: 100 },

  //SliderQuestionComponent
  sliderValue: { fontSize: 16, fontWeight: 'bold', color: Farver.primær, marginBottom: 4 },
  slider: { width: '100%', height: 40, marginBottom: 8 },

  //BioScreen - stort tekstfelt til bioen
  bioInput: { width: '100%', minHeight: 160, borderWidth: 1, borderColor: 'gray', borderRadius: 8, padding: 10, textAlignVertical: 'top', fontSize: 15 },
  bioCounter: { alignSelf: 'flex-end', color: 'gray', fontSize: 12, marginTop: 4, marginBottom: 8 },

  //ProfileMenuScreen - Profil-fanen
  menuContainer: { flex: 1, backgroundColor: '#fff', alignItems: 'center', padding: 20 },
  menuName: { fontSize: 20, fontWeight: 'bold' },
  menuRole: { color: 'gray', marginBottom: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuItemText: { fontSize: 16, marginLeft: 12 },
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

// Hele cirklen i PictureComponent: størrelse, form, stiplet kant og baggrund.
// Størrelsen afhænger af size, så det er en funktion
export const pictureCircle = (size) => ({
  width: size,
  height: size,
  borderRadius: size / 2,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderStyle: 'dashed',
  borderColor: 'gray',
  backgroundColor: '#fff',
});

// Teksten "foto" i cirklen. Skriftstørrelsen afhænger af size
export const pictureText = (size) => ({
  color: 'gray',
  fontSize: size / 5,
});