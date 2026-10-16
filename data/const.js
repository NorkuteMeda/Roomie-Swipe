
// Interesser brugeren kan vælge mellem i onboarding (flyttet fra ProfileSetupScreen)
export const INTERESTS = ['Sport', 'Gaming', 'Madlavning', 'Musik', 'Rejser'];

// Bydele i København til område-spørgsmålene
export const OMRAADER = ['Nørrebro', 'Vesterbro', 'Østerbro', 'Frederiksberg', 'Amager', 'Indre By', 'Valby', 'Andet'];

// Omtrentligt centrum af hver bydel, så kortet kan vise hvor værelset ligger (vi har ikke præcise adresser endnu).
// Navnene skal være de samme som i OMRAADER. 'Andet' har ingen koordinater, så kortet viser bare København.
export const OMRAADE_KOORDINATER = {
  'Nørrebro': { latitude: 55.6950, longitude: 12.5450 },
  'Vesterbro': { latitude: 55.6670, longitude: 12.5480 },
  'Østerbro': { latitude: 55.7080, longitude: 12.5770 },
  'Frederiksberg': { latitude: 55.6790, longitude: 12.5320 },
  'Amager': { latitude: 55.6550, longitude: 12.6000 },
  'Indre By': { latitude: 55.6800, longitude: 12.5800 },
  'Valby': { latitude: 55.6620, longitude: 12.5160 },
};

// Onboarding-spørgsmål. Vises i OnboardingScreen med .map(), så et nyt spørgsmål kun skal tilføjes her.
// type: 'valg' = vælg én, 'flervalg' = vælg flere, 'skala' = 1-5, 'tekst' = fritekst, 'slider' = træk mellem min og max
// slider: default er startværdien, unit vises efter tallet, maxLabel vises i stedet for tallet ved max (fx '24+ mdr.')
// forRolle: spørgsmålet vises kun for 'Lejer' eller 'Udlejer' (rollen vælges på Min profil). Uden forRolle vises det for alle.
// key er navnet svaret gemmes under i Firebase, derfor uden æ/ø/å og mellemrum.
export const ONBOARDING_QUESTIONS = [
  // Bolig - lejer
  { key: 'maxHusleje', question: 'Hvad må huslejen max være pr. måned?', type: 'slider', min: 2000, max: 15000, step: 250, default: 6000, unit: 'kr.', forRolle: 'Lejer' },
  { key: 'lejeperiode', question: 'Hvor mange måneder vil du leje?', type: 'slider', min: 1, max: 24, step: 1, default: 12, unit: 'mdr.', maxLabel: '24+ mdr. (langvarigt)', forRolle: 'Lejer' },
  { key: 'oenskerOmraade', question: 'Hvor vil du gerne bo? (vælg gerne flere)', type: 'flervalg', options: OMRAADER, forRolle: 'Lejer' },

  // Bolig - udlejer
  { key: 'husleje', question: 'Hvad er huslejen pr. måned?', type: 'slider', min: 2000, max: 15000, step: 250, default: 6000, unit: 'kr.', forRolle: 'Udlejer' },
  { key: 'lejeperiode', question: 'Hvor mange måneder kan værelset lejes ud?', type: 'slider', min: 1, max: 24, step: 1, default: 12, unit: 'mdr.', maxLabel: '24+ mdr. (langvarigt)', forRolle: 'Udlejer' },
  { key: 'omraade', question: 'Hvor ligger værelset?', type: 'valg', options: OMRAADER, forRolle: 'Udlejer' },
  { key: 'stoerrelse', question: 'Hvor stort er værelset?', type: 'slider', min: 6, max: 40, step: 1, default: 14, unit: 'm²', forRolle: 'Udlejer' },
  { key: 'ledigFra', question: 'Hvornår er værelset ledigt?', type: 'valg', options: ['Med det samme', 'Om 1 måned', 'Om 2-3 måneder', 'Senere'], forRolle: 'Udlejer' },

  // Møbleret (forskelligt spørgsmål for lejer og udlejer) og hvem man vil bo med
  { key: 'oenskerMoebleret', question: 'Ønsker du et møbleret værelse?', type: 'valg', options: ['Ja', 'Nej', 'Ligeglad'], forRolle: 'Lejer' },
  { key: 'moebleret', question: 'Er værelset møbleret?', type: 'valg', options: ['Ja', 'Nej'], forRolle: 'Udlejer' },
  { key: 'oenskerKoen', question: 'Hvem vil du helst bo med?', type: 'valg', options: ['Kvinder', 'Mænd', 'Ligeglad'] },

  // Livsstil
  { key: 'ryger', question: 'Ryger du?', type: 'valg', options: ['Ja', 'Nej'] },
  { key: 'alkohol', question: 'Drikker du alkohol?', type: 'valg', options: ['Slet ikke', 'Nogle gange', 'Ofte'] },
  { key: 'fest', question: 'Hvor ofte fester du derhjemme?', type: 'valg', options: ['Aldrig', 'Sjældent', 'Nogle gange', 'Ofte'] },
  { key: 'gaester', question: 'Hvor ofte har du gæster?', type: 'skala', low: 'Sjældent', high: 'Tit' },
  { key: 'doegnrytme', question: 'Er du A- eller B-menneske?', type: 'valg', options: ['A-menneske', 'B-menneske'] },
  { key: 'husdyr', question: 'Har du husdyr?', type: 'valg', options: ['Ja', 'Nej'] },

  // Hjemmet
  { key: 'renlighed', question: 'Hvor vigtigt er rengøring for dig?', type: 'skala', low: 'Afslappet', high: 'Meget vigtigt' },
  { key: 'rengoeringsplan', question: 'Vil du have en fælles rengøringsplan?', type: 'valg', options: ['Ja', 'Nej', 'Ligeglad'] },
  { key: 'madlavning', question: 'Vil du dele madlavning?', type: 'valg', options: ['Ja, gerne', 'Nogle gange', 'Nej'] },

  // Valgfrit - brugeren bestemmer selv, hvad de vil dele
  { key: 'interesser', question: 'Hvad er dine interesser? (vælg gerne flere)', type: 'flervalg', options: INTERESTS, optional: true },
  { key: 'hverdag', question: 'Er der noget i din hverdag, din roomie bør vide? (valgfrit)', type: 'tekst', optional: true, hint: 'Fx kost, højtider eller natarbejde' },
];