// Hard coded data profiler: 
export const PROFILES = [
  { FullName: 'Anna', Age: 24, Area: 'Nørrebro', Furnished: false, Bio: 'Studerer psykologi, kan lide planter og stille morgener.' },
  { FullName: 'Mikkel', Age: 26, Area: 'Frederiksberg', Furnished: true, Bio: 'IT-studerende, spiller guitar' },
  { FullName: 'Amalie', Age: 23, Area: 'Vesterbro', Furnished: false, Bio: 'Elsker at lave mad, søger roomie til madklub.' },
  { FullName: 'Bo', Age: 22, Area: 'Østerbro', Furnished: true, Bio: 'Løber hver morgen, tidlig i seng.' },
];

// Interesser brugeren kan vælge mellem i onboarding (flyttet fra ProfileSetupScreen)
export const INTERESTS = ['Sport', 'Gaming', 'Madlavning', 'Musik', 'Rejser'];

// Bydele i København til område-spørgsmålene
export const OMRAADER = ['Nørrebro', 'Vesterbro', 'Østerbro', 'Frederiksberg', 'Amager', 'Indre By', 'Valby', 'Andet'];

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