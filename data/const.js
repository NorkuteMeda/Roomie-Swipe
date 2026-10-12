
// Interesser brugeren kan vælge mellem i onboarding (flyttet fra ProfileSetupScreen)
export const INTERESTS = ['Sport', 'Gaming', 'Madlavning', 'Musik', 'Rejser'];

// Onboarding-spørgsmål. Vises i OnboardingScreen med .map(), så et nyt spørgsmål kun skal tilføjes her.
// type: 'valg' = vælg én, 'flervalg' = vælg flere, 'skala' = 1-5, 'tekst' = fritekst
// forRolle: spørgsmålet vises kun for 'Lejer' eller 'Udlejer' (rollen vælges på Min profil). Uden forRolle vises det for alle.
// key er navnet svaret gemmes under i Firebase, derfor uden æ/ø/å og mellemrum.
export const ONBOARDING_QUESTIONS = [
  // Bolig
  { key: 'lejeperiode', question: 'Hvilken lejeperiode passer dig?', type: 'valg', options: ['Langvarig', 'Kort (6-12 mdr.)'] },
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