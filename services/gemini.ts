import { GoogleGenAI } from "@google/genai";
import { Platform, PLATFORM_LABELS, ScriptDuration, GeneratedScript, ScriptOptions } from "../types";
import { HOOK_DATABASE } from "../data/hooks";

export const generateScript = async (
  apiKey: string,
  topic: string,
  duration: ScriptDuration,
  platform: Platform,
  options: ScriptOptions,
  imageBase64?: string,
  specificHook?: string
): Promise<GeneratedScript> => {
  
  if (!apiKey) {
    throw new Error("API Key belum disetting. Silakan masukkan API Key Anda.");
  }

  // Initialize client with user provided apiKey
  const ai = new GoogleGenAI({ apiKey: apiKey });
  const modelId = 'gemini-2.5-flash';

  const parts: any[] = [];

  if (imageBase64) {
    const base64Data = imageBase64.includes('base64,') 
      ? imageBase64.split('base64,')[1] 
      : imageBase64;
      
    parts.push({
      inlineData: {
        mimeType: 'image/jpeg', 
        data: base64Data
      }
    });
  }

  // Construct Custom Instructions based on Options
  let customInstructions = "";
  
  if (options.useCustomAudience) {
    customInstructions += `
    TARGET AUDIENCE: ${options.audience}
    TONE OF VOICE: ${options.tone}
    - Adjust the vocabulary and style to fit this specific audience and tone perfectly.
    `;
  }

  if (options.useCustomGoal) {
    customInstructions += `
    CONTENT GOAL: ${options.goal}
    - The Call to Action (CTA) and the ending of the script must be specifically designed to achieve this goal.
    `;
  }

  let magicHookInstruction = "";
  if (options.useMagicHook) {
    magicHookInstruction = `
    MAGIC HOOK VARIATION REQUESTED:
    - In addition to 'hookUsed', you MUST provide 'alternativeHooks'.
    - 'alternativeHooks' must contain exactly 3 OTHER strings from the HOOK DATABASE that also fit this topic.
    - Do not duplicate the 'hookUsed'.
    `;
  }

  let hookConstraint = `1. **DATABASE HOOK**: You MUST select ONE hook from the provided "HOOK DATABASE" below. Do not create a custom hook. Fill in the blanks (_______) relevant to the topic.`;
  
  if (specificHook) {
      hookConstraint = `1. **SPECIFIC HOOK**: You MUST use this specific hook template: "${specificHook}". Fill in the blanks (_______) relevant to the topic. Do NOT choose another hook.`;
  }

  const prompt = `
  TOPIC: ${topic}
  TARGET PLATFORM: ${PLATFORM_LABELS[platform]}
  DURATION: ${duration}
  ${customInstructions}
  
  Please generate a complete script with a Visual Storyboard breakdown.
  ${magicHookInstruction}
  `;
  parts.push({ text: prompt });

  const systemInstruction = `
  You are an expert Social Media Scriptwriter and Copywriter using the "MASTER FORMULA FASTERAPI".
  Your task is to generate a viral-worthy script based on the user's topic and selected platform, designed for high retention and engagement.
  
  MASTER FORMULA FASTERAPI RULES:

  1. **INTI IDE TUNGGAL (Single Focus)**: 
     - One script = One specific problem.
     - Do not wander to other topics.
     - Every sentence must point to this single issue.

  2. **GARIS PAS (Problem - Agitation - Solution) & AIDA**:
     - **P (Attention/Hook)**: You MUST use a Hook from the provided "HOOK DATABASE". It must be brutal, simple, and familiar.
     - **A (Interest/Agitation)**: Sharpen the problem. Make it hurt or relatable. Do NOT switch issues.
     - **S (Desire/Solution)**: 
       - Provide 1-4 CONCRETE steps/solutions. 
       - Must be actionable TODAY. 
       - Create an "Aha!" moment ("Oh... pantes selama ini salah").
       - IMPORTANT: Keep a part of the solution slightly hidden/teased (cliffhanger) to drive the Action.
     - **Action (CTA)**: Strong call to action matching the goal.

  3. **FILMIC FLOW + NEURO-CINEMA**:
     - Flow like a short film. One sentence must logically pull the next.
     - NO abstract, poetic, or ambiguous words.
     - Use visual, hypnotic, and simple language (easy enough for a child to understand).
     - Natural spoken Indonesian (Bahasa Indonesia).

  MANDATORY CONSTRAINTS:
  ${hookConstraint}
  2. **DURATION**: Adhere strictly to the ${duration} constraint. 
  3. **NO VISUAL CUES IN MAIN SCRIPT**: In the 'scriptContent' field, do NOT include any visual descriptions. ONLY the spoken words.
  4. **VISUAL STORYBOARD**: You MUST break down the script into a 'visualStoryboard' array. 
     - Each item is a scene of approx 4 seconds. 
     - Cycle through these colors for each scene: "blue", "green", "orange", "red", "purple", "black".
  5. **OUTPUT FORMAT**: You MUST return a JSON object.

  HOOK DATABASE:
  ${HOOK_DATABASE}

  JSON SCHEMA:
  {
    "coverTitle": "A short, punchy title for the video thumbnail/cover (Clickbait but honest)",
    "hookUsed": "The exact sentence from the database you selected, with blanks filled",
    "alternativeHooks": ["Alternative Hook 1 from DB", "Alternative Hook 2 from DB", "Alternative Hook 3 from DB"], 
    "scriptContent": "ONLY the spoken narration/dialogue combined. Smooth filmic flow. No visual instructions.",
    "visualStoryboard": [
      {
        "sceneNumber": 1,
        "color": "blue",
        "narration": "First ~4s of spoken text..."
      },
      {
        "sceneNumber": 2,
        "color": "green",
        "narration": "Next ~4s of spoken text..."
      }
      // Continue cycling colors: blue, green, orange, red, purple, black, blue...
    ],
    "caption": "A short, engaging caption for the post using the AIDA formula",
    "hashtags": ["tag1", "tag2", "tag3"]
  }
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: [{ role: 'user', parts: parts }],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json'
      }
    });

    if (!response.text) {
      throw new Error("No response generated from Gemini.");
    }

    const jsonResponse = JSON.parse(response.text) as GeneratedScript;
    return jsonResponse;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes('403') || error.message?.includes('API_KEY_INVALID')) {
        throw new Error("API Key tidak valid atau tidak memiliki izin akses.");
    }
    throw error;
  }
};