const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// System instruction kept separate for clarity
const SYSTEM = `You are a product copywriter for handcrafted artisan goods.
Be factual, respectful, and culturally sensitive. Avoid unverifiable claims.`;

// Build a strict prompt that requests JSON only
function buildPrompt(p) {
  return `
Enhance this artisan product description for e-commerce.
Tone: ${p.tone || 'warm'} | Audience: ${p.audience || 'global'} | Length: ${p.length || 'medium'}

Rules:
- Do not invent materials, origins, or certifications; only use what's provided.
- Emphasize craftsmanship, genuine benefits, use cases; durability only if mentioned.
- Add care tips if present in the text.
- Provide 4–6 concise bullets.
- Include 5–8 relevant hashtags.
Return strictly JSON with exactly these keys:
{ "title": string, "bullets": string[], "paragraph": string, "hashtags": string[] }

Raw:
"""${p.text.trim()}"""
`;
}

// Minimal safety pass (optional, simple list)
function violatesSimpleSafety(obj) {
  const text = JSON.stringify(obj).toLowerCase();
  const banned = ['hate speech', 'slur1', 'slur2']; // extend for your needs
  return banned.some(w => text.includes(w));
}

async function enhanceWithGemini(p) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ role: 'user', parts: [{ text: buildPrompt(p) }] }],
    config: {
      systemInstruction: SYSTEM,
      temperature: 0.6,
      responseMimeType: 'application/json',
      // Optional speed-up
      thinkingConfig: { thinkingBudget: 0 },
      // Optional safety settings:
      // safetySettings: [{ category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }]
    }
  });

  // With responseMimeType JSON, .text should be valid JSON string
  let out;
  try {
    out = JSON.parse(response.text);
  } catch {
    // attempt a one-shot repair
    const repair = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{
        role: 'user',
        parts: [{ text: `Repair to valid JSON with keys title, bullets[], paragraph, hashtags[] ONLY:\n${response.text}` }]
      }],
      config: { systemInstruction: SYSTEM, responseMimeType: 'application/json', temperature: 0.2, thinkingConfig: { thinkingBudget: 0 } }
    });
    out = JSON.parse(repair.text);
  }

  // Shape validation (basic)
  if (
    !out ||
    typeof out.title !== 'string' ||
    !Array.isArray(out.bullets) ||
    typeof out.paragraph !== 'string' ||
    !Array.isArray(out.hashtags)
  ) {
    throw new Error('MODEL_BAD_OUTPUT');
  }

  if (violatesSimpleSafety(out)) {
    throw new Error('CONTENT_SAFETY_VIOLATION');
  }

  // Trim arrays to safe lengths
  out.bullets = out.bullets.slice(0, 6);
  out.hashtags = out.hashtags.slice(0, 8);

  return out;
}

module.exports = { enhanceWithGemini };
