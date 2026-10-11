// services/Request.js
// Sender samtalen til OpenAI og returnerer AI'ens svar 
// bruger fetch i stedet for openai-pakken (kunne ikke få den til at virke?), og nøglen kommer fra .env filen
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

export default async function SendMessage(messageArray) {
  const response = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: 'gpt-5-mini', // model type -> simpel model for nu
      messages: messageArray,
    }),
  });

  const data = await response.json();

  // Svarer OpenAI med en fejl (fx forkert nøgle eller ingen penge på kontoen),
  // kastes den videre, så skærmen kan vise den i en Alert 
  if (!response.ok) {
    throw new Error(data?.error?.message || 'AI-tjenesten svarede ikke.');
  }

  // Udtræk AI'ens svar og returnér det i samme format som resten af samtalen
  const result = data.choices?.[0]?.message?.content || '';
  return { role: 'assistant', content: result };
}