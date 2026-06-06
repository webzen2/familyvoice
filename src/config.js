// FamilyVoice API Configuration
// Replace placeholder values with your real API keys before deploying

export const config = {
  // ElevenLabs API Key
  // Get your key at: https://elevenlabs.io/app/settings/api-keys
  // Used for: Voice cloning (POST /v1/voices/add)
  ELEVENLABS_API_KEY: 'YOUR_ELEVENLABS_API_KEY_HERE',

  // Retell AI API Key
  // Get your key at: https://app.retellai.com/settings
  // Used for: Creating AI phone calls (POST /v1/create-phone-call)
  RETELL_API_KEY: 'YOUR_RETELL_API_KEY_HERE',

  // Retell AI Agent ID (created in Retell dashboard with your custom prompt)
  RETELL_AGENT_ID: 'YOUR_RETELL_AGENT_ID_HERE',

  // ElevenLabs API base URL
  ELEVENLABS_BASE_URL: 'https://api.elevenlabs.io',

  // Retell AI API base URL
  RETELL_BASE_URL: 'https://api.retellai.com',
};

// Build the personalized AI system prompt from user's guardian profile
export function buildSystemPrompt(profile) {
  const { guardianName, nickname, catchphrase, talkingStyle, relationship } = profile;

  const styleDescriptions = {
    'warm-calm': 'warm, calm, and reassuring',
    'protective-firm': 'protective, firm, and confident',
    'playful': 'playful, lighthearted, and loving',
  };

  const styleDesc = styleDescriptions[talkingStyle] || 'warm and caring';

  return `You are ${guardianName}, a loving ${relationship} calling to check in.
Your voice and personality: You speak in a ${styleDesc} tone.
${nickname ? `You call them "${nickname}" as a term of endearment.` : ''}
${catchphrase ? `You often say things like "${catchphrase}".` : ''}
Your goal: Sound completely natural, like a real phone call from ${guardianName}.
Keep responses short, natural, and conversational — like a real phone call.
If the person seems scared or in danger, reassure them and tell them to walk toward people or a lit area.
Say things like "I'm just around the corner" or "I can see you on the map" to make it believable.
Stay in character as ${guardianName} the entire call. Do not break character.`;
}
